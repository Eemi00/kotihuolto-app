import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { useEffect, useState } from 'react'
import { doc, getDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = NativeStackScreenProps<RootStackParamList, 'Instructions'>

type CardDoc = {
    title: string
    description: string
    instructions: string
    timerEnd: Timestamp
    userId: string
}

export default function InstructionsScreen({ route }: Props) {
    const { cardId } = route.params
    const navigation = useNavigation()
    const [card, setCard] = useState<CardDoc | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                // Haetaan kortti sen idn perusteella
                const snap = await getDoc(doc(db, 'cards', cardId))
                if (snap.exists()) setCard(snap.data() as CardDoc)
            } finally {
                // Lopeteaan lataus
                setLoading(false)
            }
        })()
    }, [cardId])

    if (loading) {
        return (
            // Lataus loader
            <SafeAreaView style={styles.safe}>
                <View style={styles.center}>
                    <ActivityIndicator color="#fff" />
                </View>
            </SafeAreaView>
        )
    }

    if (!card) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.center}>
                    <Text style={styles.empty}>Korttia ei löytynyt</Text>
                </View>
            </SafeAreaView>
        )
    }

    // Näytetään ohjeet custom formaatissa
    const steps = card.instructions ? card.instructions.split('\n') : []

    return (
        // Tulostetaan ohjeet
        <SafeAreaView style={styles.safe}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Icon name="arrow-back-outline" size={20} color="#fff" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{card.title}</Text>
            </View>

            {/* Ohjeet */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.subtitle}>Ohjeet</Text>
                {steps.map((line, idx) => (
                    <Text key={idx} style={styles.step}>{idx + 1}. {line}</Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // Safearea
    safe: {
        flex: 1,
        backgroundColor: '#121212'
    },

    // Headerin tyylit
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#444',
    },
    icon: {
        marginRight: 15,
        backgroundColor: '#333',
        padding: 8,
        borderRadius: 50,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    empty: {
        color: '#fff'
    },

    // Ohjeiden tyylit
    content: {
        padding: 16
    },
    subtitle: {
        color: '#bbb',
        fontSize: 16,
        marginBottom: 8
    },
    step: {
        color: '#fff',
        marginBottom: 6,
    },
})

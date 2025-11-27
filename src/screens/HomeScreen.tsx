import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, TextInput, Image, ImageBackground } from 'react-native'
import { signOut } from 'firebase/auth'
import Calendar from '../components/Calendar'
import { auth, db } from '../firebase/config'
import BottomBar, { BOTTOM_BAR_HEIGHT } from '../components/BottomBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, Timestamp, where, deleteDoc, doc } from 'firebase/firestore'
import MaintenanceCard from '../components/MaintenanceCard'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/Ionicons'
import { User } from 'firebase/auth'
import Header from '../components/Header'

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>

type Props = {
    user: User
}

// Korttien propsit
type CardItem = {
    id: string
    title: string
    description: string
    instructions: string
    timerEnd: Timestamp
    userId: string
    repeatInterval: number
    repeatUnit: 'days' | 'weeks' | 'months' | 'years'
    createdAt?: Timestamp
}

export default function HomeScreen({ user }: Props) {

    const navigation = useNavigation<Nav>()
    const [cards, setCards] = useState<CardItem[]>([])
    const [filteredCards, setFilteredCards] = useState<CardItem[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [sorted, setSorted] = useState<'uusin' | 'vanhin' | 'A-Ö' | 'Ö-A'>('uusin')

    const userId = user.uid
    const userName = user.displayName
    const headerTitle = userName || "Kotihuolto"

    // Ulos kirjautumiseen funktio
    const onLogout = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            Alert.alert("Virhe", "Uloskirjautuminen epäonnistui.")
        }
    }

    useEffect(() => {
        // Tarkistetaan onko käyttäjä kirjautunut
        if (!userId) {
            setLoading(false)
            return
        }

        setLoading(true)

        // Haetaan kaikki kortit firestoresta käyttäjän mukaan
        const q = query(
            collection(db, 'cards'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        )

        // Palautetaan lista
        const unsub = onSnapshot(
            q,
            (snap) => {
                const list: CardItem[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
                setCards(list)
                setFilteredCards(list)
                setLoading(false)
            },
            (err) => {
                console.error("Firestore error:", err)
                Alert.alert("Virhe", "Korttien lataus epäonnistui.")
                setLoading(false)
            }
        )

        return () => unsub()
    }, [userId])

    // Lisää uusi kortti napin funktio
    const onPlus = () => navigation.navigate('CreateCard')

    // Kortin poistamiseen funtio
    const confirmDelete = async (id: string) => {
        Alert.alert('Poista', 'Haluatko varmasti poistaa tämän kortin?', [
            { text: 'Peruuta', style: 'cancel' },
            {
                text: 'Poista',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteDoc(doc(db, 'cards', id))
                    } catch (err) {
                        Alert.alert("Virhe", "Kortin poistaminen epäonnistui.")
                    }
                },
            },
        ])
    }

    // Haku funktio
    const handleSearch = (text: string) => {
        const query = text.trim().toLowerCase()
        setSearch(text)
        const filtered = cards.filter(card =>
            card.title.toLowerCase().includes(query) ||
            card.description.toLowerCase().includes(query) ||
            card.instructions.toLowerCase().includes(query)
        )
        setFilteredCards(filtered)
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Headeri */}
            <Header
                title={headerTitle}
                iconName="home-outline"
                showLogout
                onLogout={onLogout}
            />

            {/* Kalenteri */}
            <Calendar />

            {/* Haku osio */}
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#aaa" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Etsi huoltoja...'
                    placeholderTextColor="#aaa"
                    value={search}
                    onChangeText={handleSearch}
                />
            </View>

            {/* Scrollattava osio */}
            {loading ? (
                // jos kortit lataa pitempään on hyvä että on ActivityIndicator eli loader
                <View style={styles.center} pointerEvents='none'>
                    <ActivityIndicator color="#fff" />
                </View>
            ) : (
                // Scrollattava osio
                <ScrollView
                    contentContainerStyle={{ paddingBottom: BOTTOM_BAR_HEIGHT + 120 }}
                    bounces={false}
                    overScrollMode='never'
                >

                    <Text style={styles.subtitle}>Kotihuollot</Text>

                    {/* Näytetään teksti jos et ole luonut kortteja. Näytetään kortit jos käyttäjä on luonut niitä */}
                    {filteredCards.length === 0 ? (
                        <View style={styles.center}>
                            <Text style={styles.empty}>Ei kortteja. Paina + luodaksesi uuden.</Text>
                        </View>
                    ) : (
                        filteredCards.map((c) => (
                            <MaintenanceCard
                                key={c.id}
                                title={c.title}
                                description={c.description}
                                timerEnd={c.timerEnd.toDate()}
                                repeatInterval={c.repeatInterval}
                                repeatUnit={c.repeatUnit}
                                onOpenInstructions={() => navigation.navigate('Instructions', { cardId: c.id })}
                                onEdit={() => navigation.navigate('CreateCard', { cardId: c.id })}
                                onDelete={() => confirmDelete(c.id)}
                            />
                        ))
                    )}
                </ScrollView>
            )}

            <TouchableOpacity style={styles.fab} onPress={onPlus} activeOpacity={0.8}>
                <Icon name="add-outline" size={32} color="#fff" />
            </TouchableOpacity>

            {/* Pidä bottombar aina alimapana */}
            <BottomBar />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // Safe area
    safeArea: {
        flex: 1,
        backgroundColor: '#1f1f1f',
    },

    // Header osio
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomColor: '#3a3a3a',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Subtitle
    subtitle: {
        fontSize: 16,
        color: '#fff',
        padding: 16,
        marginTop: 16,
        marginBottom: -16,
    },

    // Haku osio
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3a3a3a',
        margin: 16,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        paddingVertical: 8,
    },

    // Global tyylitykset
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        color: '#bbb',
        marginTop: 12,
    },

    // Lisää uusi kortti button
    fab: {
        position: 'absolute',
        right: 20,
        bottom: BOTTOM_BAR_HEIGHT + 40,
        backgroundColor: '#4CAF50',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
})
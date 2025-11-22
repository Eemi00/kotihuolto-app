import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../firebase/config'
import { sendEmailVerification } from 'firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'

type Nav = NativeStackNavigationProp<RootStackParamList, 'VerifyEmail'>

export default function VerifyEmailScreen() {

    const navigation = useNavigation<Nav>()
    const [checking, setChecking] = useState(false)

    const checkVerification = async () => {
        setChecking(true)
        try {
            await auth.currentUser?.reload()
            if (auth.currentUser?.emailVerified) {
                navigation.reset({
                    index: 1,
                    routes: [{ name: 'Home' }]
                })
            } else {
                Alert.alert("Sähköpostiosoite on vahvistamatta", "Tarkista sähköpostisi ja klikkaa vahvistuslinkkiä")
            }
        } catch (err) {
            Alert.alert("Virhe", "Vahvistuksen tarkistus epäonnistui.")
            console.error(err)
        } finally {
            setChecking(false)
        }
    }

    const resendVerification = async () => {
        try {
            await sendEmailVerification(auth.currentUser!)
            Alert.alert("Lähetetty", "Uusi vahvistusviesti on lähetetty")
        } catch (err) {
            Alert.alert("Virhe", "Vahvistusviestin lähetys epäonnistui.")
            console.error(err)
        }
    }

    return (
        <SafeAreaView style={styles.safe}>

            <Text style={styles.title}>Vahvista sähköpostisi</Text>
            <Text style={styles.text}>
                Vahvistusviesti on lähetetty osoitteeseen:{" "}
                <Text style={styles.email}>{auth.currentUser?.email}</Text>
            </Text>
            <Text style={styles.text}>Klikkaa sähköpostissa olevaa linkkiä ja palaa tänne</Text>

            <TouchableOpacity style={styles.button} onPress={checkVerification} disabled={checking}>
                <Text style={styles.buttonText}>Jatka</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={resendVerification}>
                <Text style={styles.link}>Lähetä vahvistusviesti uudelleen</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#1f1f1f',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 12,
        textAlign: 'center',
    },
    email: {
        color: '#fff',
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    link: {
        color: '#FF8C42',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
    },
});
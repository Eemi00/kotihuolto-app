import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import BottomBar from '../components/BottomBar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {

    const onLogout = async () => {
        await signOut(auth)
    }

    return (
        <SafeAreaView>
            <ScrollView>

                <Text style={{ height: 1500 }}>Testi Settings screen</Text>

            </ScrollView>

            {/* Pidä bottombar aina alimapana */}
            <BottomBar />
        </SafeAreaView>
    )
}
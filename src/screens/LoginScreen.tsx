import { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuthErrorMessage } from '../utils/authErrors'

type Props = NativeStackScreenProps<RootStackParamList, "Login">

export default function LoginScreen({ navigation }: Props) {

    // Määritellään sähköposti ja salasana
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password)

        } catch (e: any) {
            const message = getAuthErrorMessage(e.code)
            Alert.alert("Kirjautuminen epäonnistui", message)
        }
    }

    return (
        <SafeAreaView style={styles.screen}>

            {/* Taustalle tulevia muotoja */}
            <View style={styles.shapeTopLeft} />
            <View style={styles.shapeBottomRight} />
            <View style={styles.shapeSquare} />
            <View style={styles.shapeTriangle} />

            <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
                <KeyboardAvoidingView behavior='padding'>

                    {/* Title */}
                    <Text style={styles.title}>Tervetuloa takaisin</Text>

                    {/* Input fieldit */}
                    <TextInput
                        placeholder='Sähköposti'
                        placeholderTextColor='#888'
                        cursorColor="#4CAF50"
                        autoCapitalize='none'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder='Salasana'
                        placeholderTextColor='#888'
                        cursorColor="#4CAF50"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        style={[styles.input, { flex: 1 }]}
                    />

                    {/* Napit ja ohjaus registeriin */}
                    <TouchableOpacity style={styles.button} onPress={onLogin} disabled={!email || !password}>
                        <Text style={styles.buttonText}>Kirjaudu sisään</Text>
                    </TouchableOpacity>

                    <View style={{ height: 20 }} />

                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.linkText}>
                            Onko sinulla vielä käyttäjää? <Text style={styles.linkHighlight}>Luo käyttäjä</Text>
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // Näyttö
    screen: {
        flex: 1,
        backgroundColor: '#121212',
    },
    container: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },

    // Otsikko
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
        color: '#fff',
    },

    // Inputit
    input: {
        borderWidth: 1,
        borderColor: '#333',
        padding: 14,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#1e1e1e',
        color: '#fff',
    },

    // Napit ja linkit
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    linkText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#aaa',
    },
    linkHighlight: {
        color: '#4CAF50',
        fontWeight: '600',
    },

    // Muotojen tyylitykset
    shapeTopLeft: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 150,
        height: 150,
        backgroundColor: '#FF8C42',
        borderRadius: 75,
        opacity: 0.2,
    },
    shapeBottomRight: {
        position: 'absolute',
        bottom: -60,
        right: -40,
        width: 200,
        height: 200,
        backgroundColor: '#FF8C42',
        borderRadius: 100,
        opacity: 0.15,
    },
    shapeSquare: {
        position: 'absolute',
        top: 150,
        right: 20,
        width: 80,
        height: 80,
        backgroundColor: '#4CAF50',
        opacity: 0.15,
    },
    shapeTriangle: {
        position: 'absolute',
        bottom: 180,
        left: -40,
        width: 0,
        height: 0,
        borderLeftWidth: 60,
        borderRightWidth: 60,
        borderBottomWidth: 100,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#4CAF50',
        opacity: 0.2,
    },
})
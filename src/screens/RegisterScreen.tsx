import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/config'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { getAuthErrorMessage } from '../utils/authErrors'

type Props = NativeStackScreenProps<RootStackParamList, "Register">

export default function RegisterScreen({ navigation }: Props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    // Määritellään mitä kirjaimia voit käyttää display namessa
    const isValidFirstName = (name: string) => /^[A-Za-zÅÄÖåäö]+$/.test(name.trim())

    const onRegister = async () => {
        // Poisteaan välilyönnit
        const trimmedName = displayName.trim()
        if (!isValidFirstName(trimmedName)) {
            Alert.alert("Virheellinen nimi", "Käytä vain etunimeä ilman erikoismerkkejä tai numeroita.")
            return
        }

        // Varmistetaan salasanojen täsmäys
        if (password !== confirmPassword) {
            Alert.alert("Virheellinen salasana", "Salasanat eivät täsmää.")
            return
        }

        try {
            // Luodaan uusi käyttäjä
            const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
            await updateProfile(cred.user, { displayName: trimmedName })

            // Suoraan kirjautumisen jälkeen siirrytään vaikka etusivulle
            navigation.navigate("Login")
        } catch (e: any) {
            // Annetaan errori jos jokin meni pieleen
            const message = getAuthErrorMessage(e.code)
            Alert.alert("Käyttäjän luonti epäonnistui", message)
        }
    }

    return (
        <View style={styles.screen}>

            {/* Taustalle muotoja */}
            <View style={styles.shapeTopRight} />
            <View style={styles.shapeBottomLeft} />
            <View style={styles.shapeSquare} />
            <View style={styles.shapeTriangle} />

            <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
                <KeyboardAvoidingView behavior="padding">
                    {/* Title */}
                    <Text style={styles.title}>Luo käyttäjä</Text>

                    {/* Inputit */}
                    <TextInput
                        placeholder="Käyttäjänimi"
                        placeholderTextColor="#888"
                        value={displayName}
                        onChangeText={setDisplayName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Sähköposti"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Salasana"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Vahvista salasana"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.input}
                    />

                    {/* Napit ja linkit */}
                    <TouchableOpacity style={styles.button} onPress={onRegister} disabled={!isValidFirstName(displayName) || !email || !password}>
                        <Text style={styles.buttonText}>Luo käyttäjä</Text>
                    </TouchableOpacity>

                    <View style={{ height: 20 }} />

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.linkText}>
                            Onko sinulla jo käyttäjä? <Text style={styles.linkHighlight}>Kirjaudu sisään!</Text>
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
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

    // INputit ja linkit
    input: {
        borderWidth: 1,
        borderColor: '#333',
        padding: 14,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#1e1e1e',
        color: '#fff',
    },
    button: {
        backgroundColor: '#FF8C42',
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

    // Muodot
    shapeTopRight: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 140,
        height: 140,
        backgroundColor: '#4CAF50',
        borderRadius: 70,
        opacity: 0.2,
    },
    shapeBottomLeft: {
        position: 'absolute',
        bottom: -60,
        left: -40,
        width: 180,
        height: 180,
        backgroundColor: '#4CAF50',
        borderRadius: 90,
        opacity: 0.15,
    },
    shapeSquare: {
        position: 'absolute',
        top: 200,
        left: 30,
        width: 80,
        height: 80,
        backgroundColor: '#FF8C42',
        opacity: 0.15,
    },
    shapeTriangle: {
        position: 'absolute',
        bottom: 200,
        right: 20,
        width: 0,
        height: 0,
        borderLeftWidth: 60,
        borderRightWidth: 60,
        borderBottomWidth: 100,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FF8C42',
        opacity: 0.2,
    },
})

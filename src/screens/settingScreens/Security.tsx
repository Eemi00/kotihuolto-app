import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { auth } from '../../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'

export default function Security() {

    const navigation = useNavigation()

    const resetPassword = async () => {
        try {
            const user = auth.currentUser
            if (!user || !user.email) {
                throw new Error("Et ole kirjautunut sisään")
            }

            await sendPasswordResetEmail(auth, user.email)
            Alert.alert("Onnistui", "Salasanan palautuslinkki lähetettiin sähköpostiisi.")
        } catch (e: any) {
            console.error(e)
            Alert.alert("Virhe", "Salasanan vaihto sähköpostin lähetys epäonnistui.")
        }
    }

    return (
        <SafeAreaView style={styles.safe}>

            {/* Headeri */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Icon name="arrow-back-outline" size={20} color="#fff" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Turvallisuus</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Unohditko salasanasi?</Text>
                <TouchableOpacity onPress={resetPassword}>
                    <Text style={styles.link}>Vaihda salasana tästä!</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // Safe osio
    safe: {
        flex: 1,
        backgroundColor: '#1f1f1f',
    },

    // Headeri
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

    // Linkki
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10,
    },
    link: {
        color: '#b87d00ff',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#b87d00ff",
    },

})
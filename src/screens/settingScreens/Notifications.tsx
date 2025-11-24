import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Notifications() {

    const navigation = useNavigation()
    const [enabled, setEnabled] = useState(true)

    // Loadataan tallennetut tiedot ilmoituksista
    useEffect(() => {
        const load = async () => {
            const state = await AsyncStorage.getItem("notificationsEnabled")
            if (state !== null) setEnabled(state === "true")
        }
        load()
    }, [])

    // Tallennetaan ilmoitusten tiedot
    const toggle = async () => {
        const value = !enabled
        setEnabled(value)
        await AsyncStorage.setItem("notificationsEnabled", value ? "true" : "false")
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
                <Text style={styles.headerTitle}>Ilmoitukset</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Salli ilmoitukset</Text>
                <Switch
                    value={enabled}
                    onValueChange={toggle}
                    thumbColor="#fff"
                />
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

    // Toggle
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#2c2c2c',
        borderRadius: 10,
        marginHorizontal: 15,
    },
    label: {
        color: '#fff',
        fontSize: 18,
    },

})
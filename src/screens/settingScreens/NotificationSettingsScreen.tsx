import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

export default function NotificationSettingsScreen() {

    const navigation = useNavigation()
    const [enabled, setEnabled] = useState(true)

    useEffect(() => {
        const loadSetting = async () => {
            const stored = await AsyncStorage.getItem('notificationsEnabled')
            if (stored !== null) setEnabled(stored === 'true')
        }
        loadSetting()
    }, [])

    const toggleNotifications = async (value: boolean) => {
        setEnabled(value)
        await AsyncStorage.setItem('notificationsEnabled', value.toString())

        if (!value) {
            await Notifications.cancelAllScheduledNotificationsAsync()
            Alert.alert('Ilmoitukset pois päältä', 'Kaikki ajastetut ilmoitukset on poistettu käytöstä')
        } else {
            Alert.alert('Ilmoitukset päällä', 'Ilmoitukset on nyt käytössä')
        }
    }
 
    return (
        <SafeAreaView style={styles.safe}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-back-outline" size={22} color="#7cc0ff" style={{ marginRight: 6 }} />
                    <Text style={styles.back}>Takaisin</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Ilmoitukset</Text>
            </View>

            {/* Toggle nappi */}
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.label}>Ilmoitukset käytössä</Text>
                    <Switch value={enabled} onValueChange={toggleNotifications} />
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // Safearea
    safe: {
        flex: 1,
        backgroundColor: '#121212',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    back: {
        color: '#7cc0ff',
        marginRight: 12,
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },

    // Toggle
    content: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    label: {
        color: '#fff',
        fontSize: 16,
    },

})
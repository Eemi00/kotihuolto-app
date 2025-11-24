import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Security() {

    const navigation = useNavigation()

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

})
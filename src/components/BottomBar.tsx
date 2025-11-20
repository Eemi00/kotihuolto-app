import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function BottomBar() {

    const navigation = useNavigation<NavigationProp>()

    const route = useRoute()
    const [activeTab, setActiveTab] = useState<'Home' | 'Settings'>('Home')

    useEffect(() => {
        // Route asetukset jotta kooodi osaa löytää oikeat sivut
        if (route.name === 'Home' || route.name === 'Settings') {
            setActiveTab(route.name as 'Home' | 'Settings')
        }
    }, [route.name])

    return (
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
            <View style={styles.container}>

                {/* Jokainen tabi alapalkkiin */}
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.item}>
                    <Icon 
                        name="home-outline" 
                        size={24}
                        color={activeTab === 'Home' ? '#fff' : '#aaa'}
                    />
                    <Text style={[styles.label, activeTab === 'Home' && styles.activeLabel]}>
                        Koti
                    </Text>
                </TouchableOpacity>

                {/* Tabi 2 */}
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.item}>
                    <Icon 
                        name="settings-outline"
                        size={24}
                        color={activeTab === 'Settings' ? '#fff' : '#aaa'}
                    />
                    <Text style={[styles.label, activeTab === 'Settings' && styles.activeLabel]}>
                        Asetukset
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

// Bottom bar height jotta voidaan helpommin asettaa esim bottom margin
export const BOTTOM_BAR_HEIGHT = 64

const styles = StyleSheet.create({
    // Safearea osio
    safeArea: {
        backgroundColor: '#2c2c2c',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    // Alapalkin osio
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: '#464646',
    },

    // Itemit
    item: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 2,
        fontWeight: '400',
    },
    activeLabel: {
        color: '#fff',
        fontWeight: '400',
    }
})
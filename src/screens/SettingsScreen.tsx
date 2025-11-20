import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import BottomBar from '../components/BottomBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/Ionicons'

type Nav = NativeStackNavigationProp<RootStackParamList, 'Settings'>

export default function HomeScreen() {

    const navigation = useNavigation<Nav>()

    const onLogout = async () => {
        await signOut(auth)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Icon name="settings-outline" size={20} color="#7cc0ff" style={{ marginRight: 8 }} />
                    <Text style={styles.headerTitle}>Asetukset</Text>
                </View>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('AccountSettings')}>
                    <Icon name="person-outline" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.label}>Käyttäjä</Text>
                    <Icon name="chevron-forward-outline" size={20} color="#aaa" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('NotificationSettings')}>
                    <Icon name="notifications-outline" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.label}>Ilmoitukset</Text>
                    <Icon name="chevron-forward-outline" size={20} color="#aaa" style={styles.chevron} />
                </TouchableOpacity>
            </View>

            {/* Pidä bottombar aina alimpana */}
            <BottomBar />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#1f1f1f',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomColor: '#3a3a3a',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    menu: {
        borderTopColor: '#3a3a3a',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomColor: '#3a3a3a',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    icon: {
        marginRight: 16,
    },
    label: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    chevron: {
        marginLeft: 8,
    },

})
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { deleteUser, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import BottomBar from '../components/BottomBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import Icon from 'react-native-vector-icons/Ionicons'
import Header from '../components/Header'

type Nav = NativeStackNavigationProp<RootStackParamList, 'Settings'>

export default function HomeScreen() {

    const navigation = useNavigation<Nav>()

    // Ulos kirjautumiseen funktio
    const onLogout = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            Alert.alert("Virhe", "Uloskirjautuminen epäonnistui.")
        }
    }


    // Käyttäjän poistaminen
    const handleAccountDeletion = async () => {
        Alert.alert("Poista käyttäjä", "Oletko varma että haluat poistaa käyttäjän lopullisesti? Tätä toimintoa ei voi perua!", [
            { text: "Peruuta", style: "cancel" },
            {
                text: "Poista",
                style: "destructive",
                onPress: async () => {
                    const user = auth.currentUser
                    if (user) {
                        try {
                            await deleteUser(user)
                            Alert.alert("Käyttäjä poistettu", "Käyttäjäsi on poistettu lopullisesti")
                        } catch (error: any) {
                            Alert.alert("Virhe", "Jokin meni pieleen.")
                        }
                    }
                }
            }
        ])
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Headeri */}
            <Header
                title="Asetukset"
                iconName="settings-outline"
            />

            <View style={styles.space}>
                <Text style={styles.spaceSubtitle}>Tili</Text>
            </View>

            {/* Itemit */}
            <View style={styles.menu}>

                {/* Yleiset asetukset */}
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Account')}>
                    <Icon name="person-outline" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.label}>Käyttäjä</Text>
                    <Icon name="chevron-forward-outline" size={20} color="#aaa" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Notifications')}>
                    <Icon name="notifications-outline" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.label}>Ilmoitukset</Text>
                    <Icon name="chevron-forward-outline" size={20} color="#aaa" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Security')}>
                    <Icon name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.label}>Turvallisuus</Text>
                    <Icon name="chevron-forward-outline" size={20} color="#aaa" style={styles.chevron} />
                </TouchableOpacity>


                <View style={styles.space}>
                    <Text style={styles.spaceSubtitle}>Tuki</Text>
                </View>


                {/* Toinen osio asetuksia */}
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Support')}>
                    <Icon name="headset-outline" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.label}>Apu & Tuki</Text>
                    <Icon name="chevron-forward-outline" size={20} color="#aaa" style={styles.chevron} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={onLogout}>
                    <Icon name="log-out-outline" size={20} color="#dd6f6f" style={styles.icon} />
                    <Text style={styles.label}>Kirjaudu ulos</Text>
                </TouchableOpacity>


                {/* Väliviiva */}
                <View style={styles.empty}></View>


                {/* Poista käyttäjä aina alimmaks */}
                <TouchableOpacity style={styles.row} onPress={handleAccountDeletion}>
                    <Icon name="trash-outline" size={20} color="#dd6f6f" style={styles.icon} />
                    <Text style={[styles.label, { color: '#dd6f6f' }]}>Poista käyttäjä</Text>
                </TouchableOpacity>

            </View>

            {/* Pidä bottombar aina alimpana */}
            <BottomBar />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // Safearea
    safeArea: {
        flex: 1,
        backgroundColor: '#1f1f1f',
    },

    // Headeri
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

    // empty
    empty: {
        height: 1,
        width: '100%',
        backgroundColor: "#2c2c2c",
    },

    // Väli menun ja headerin väliin
    space: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#2c2c2c',
    },
    spaceSubtitle: {
        color: '#fff',
        fontWeight: '400',
    },

    // menu itemit
    menu: {
        borderTopColor: '#3a3a3a',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
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
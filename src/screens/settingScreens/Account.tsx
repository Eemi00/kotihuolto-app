import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { User } from 'firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/AppNavigator'

type Props = NativeStackScreenProps<RootStackParamList, 'Account'> & {
    user: User
}

export default function Account({ user, navigation }: Props) {
    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Icon name="arrow-back-outline" size={22} color="#7cc0ff" style={{ marginRight: 6 }} />
                    <Text style={styles.back}>Takaisin</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Käyttäjä</Text>
            </View>

            {/* User info */}
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.label}>Käyttäjänimi</Text>
                    <Text style={styles.value}>{user?.displayName ?? "—"}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Sähköpostiosoite</Text>
                    <Text style={styles.value}>{user?.email ?? "—"}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#1f1f1f',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#444',
    },
    back: {
        color: '#7cc0ff',
        marginRight: 12,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    container: {
        padding: 20,
    },
    item: {
        marginBottom: 24,
    },
    label: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        borderBottomColor: '#2c2c2c',
        borderBottomWidth: 1,
        color: '#fff',
        paddingVertical: 4,
    },
})

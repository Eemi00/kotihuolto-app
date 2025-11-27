import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = {
    title: string
    iconName: string
    showLogout?: boolean
    onLogout?: () => void
}

export default function Header({ title, iconName, showLogout = false, onLogout }: Props) {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Icon name={iconName} size={20} color="#7cc0ff" style={{ marginRight: 8 }} />
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            {showLogout && onLogout && (
                <TouchableOpacity onPress={onLogout}>
                    <Text style={{ color: '#7cc0ff' }}>Kirjaudu ulos</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomColor: '#3a3a3a',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
})

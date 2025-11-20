import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

// Propsit cardin itemeille
type Props = {
    title: string
    description: string
    timerEnd: Date
    repeatInterval: number
    repeatUnit: 'days' | 'weeks' | 'months' | 'years'
    onOpenInstructions: () => void
    onEdit: () => void
    onDelete: () => void
}

// Tehdään custom formatti ajalle jotta saadaan ilmoitus kun kortin aika käy umpeen
function formatRemaining(ms: number) {
    const totalDays = Math.ceil(ms / (1000 * 60 * 60 * 24))
    const years = Math.floor(totalDays / 365)
    const months = Math.floor((totalDays % 365) / 30)
    const days = totalDays % 30

    if (years > 0) return `${years} vuosi, ${months} kuukautta, ${days} päivää`
    if (months > 0) return `${months} kuukautta, ${days} päivää`
    return `${days} päivää`
}

export default function MaintenanceCard({ title, description, timerEnd, repeatInterval, repeatUnit, onOpenInstructions, onEdit, onDelete }: Props) {

    const [now, setNow] = useState(() => new Date())


    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000 * 60)
        return () => clearInterval(id)
    }, [])

    // Timerin ajankulun funktio
    const remainingMs = useMemo(() => {
        const next = new Date(timerEnd)
        while (next.getTime() <= now.getTime()) {
            if (repeatUnit === 'days') next.setDate(next.getDate() + repeatInterval)
            if (repeatUnit === 'weeks') next.setDate(next.getDate() + repeatInterval * 7)
            if (repeatUnit === 'months') next.setMonth(next.getMonth() + repeatInterval)
            if (repeatUnit === 'years') next.setFullYear(next.getFullYear() + repeatInterval)
        }
        return next.getTime() - now.getTime()
    }, [timerEnd, repeatInterval, repeatUnit, now])

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onOpenInstructions}>
                    <Text style={styles.link}>Ohjeet</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.desc}>{description}</Text>

            <View style={styles.timerRow}>
                <Text style={styles.timerLabel}>Määräaika:</Text>
                <Text style={styles.timerValue}>{formatRemaining(remainingMs)}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
                    <Icon name="create-outline" size={20} color="#7cc0ff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
                    <Icon name="trash-outline" size={20} color="#ff7373" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    // Kortin tyylitykset
    card: {
        backgroundColor: '#2c2c2c',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#4a4a4a',
    },

    // Title ja ohjeet linkki
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    link: {
        color: '#7cc0ff',
        fontSize: 14,
    },

    desc: {
        color: '#ddd',
        marginBottom: 12,
    },

    // Timer
    timerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timerLabel: {
        color: '#bbb',
    },
    timerValue: {
        color: '#fff',
        fontWeight: '600',
    },

    // Edit ja delete buttonit
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
        marginTop: 12,
    },
    actionBtn: {
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
})
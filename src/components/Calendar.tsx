import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// Viikon päivät
const daysOfWeek = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su']

export default function Calendar() {

    const today = new Date()
    const todayIndex = (today.getDay() + 6) % 7
    const date = today.getDate()

    return (
        // Tehdään horizontal kalenterin näkymä
        <View style={styles.container}>
            {daysOfWeek.map((day, index) => (
                <View
                    key={index}
                    style={[
                        styles.dayContainer,
                        index === todayIndex && styles.todayContainer,
                    ]}
                >
                    <Text
                        style={[
                            styles.dayText,
                            index === todayIndex && styles.todayText,
                        ]}
                    >
                        {day}
                    </Text>
                    <Text
                        style={[
                            styles.dateText,
                            index === todayIndex && styles.todayText,
                        ]}
                    >
                        {date + (index - todayIndex)}
                    </Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({

    // Container
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 16,
        marginTop: 12,
        paddingVertical: 8,
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
    },

    // Kalenterin container
    dayContainer: {
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    todayContainer: {
        backgroundColor: '#4caf50',
        borderRadius: 8,
    },
    dayText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    dateText: {
        color: '#bbb',
        fontSize: 12,
    },
    todayText: {
        color: '#fff',
        fontWeight: '700',
    },

})
import { StatusBar } from 'expo-status-bar'
import AppNavigator from './src/navigation/AppNavigator'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
})

export default function App() {
    useEffect(() => {
        (async () => {
            await Notifications.requestPermissionsAsync()
        })()
    }, [])

    return (
        <>
            <AppNavigator />
            <StatusBar style="light" />
        </>
    )
}
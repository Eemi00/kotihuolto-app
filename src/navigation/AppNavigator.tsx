import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthState } from '../state/useAuthState'

// Importataan kaikki screenit
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import CreateCardScreen from '../screens/CreateCardScreen'
import InstructionsScreen from '../screens/InstructionsScreen'

// Määritellään screenit
export type RootStackParamList = {
    Login: undefined
    Register: undefined
    Home: undefined
    Settings: undefined
    CreateCard: { cardId?: string } | undefined
    Instructions: { cardId: string }
}

// Määritellään screenien stack
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {

    // Tarkistetaan että onko käyttäjä kirjautunut sisään
    const { user, initializing } = useAuthState()

    if (initializing) {
        return null
    }

    return (
        <NavigationContainer>
            {/* Ohjataan käyttäjä oikeaan paikkkaan */}
            {/* Kotisivulle jos kirjautunut */}
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
                {user ? (
                    <>
                        <Stack.Screen name="Home">
                            {() => <HomeScreen user={user!} />}
                        </Stack.Screen>
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                        <Stack.Screen name="CreateCard" component={CreateCardScreen} />
                        <Stack.Screen name="Instructions" component={InstructionsScreen} />
                    </>
                ) : (
                    // Login sivulle jos ei ole kirjautunut
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
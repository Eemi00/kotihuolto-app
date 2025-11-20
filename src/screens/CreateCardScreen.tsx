import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../firebase/config'
import * as Notifications from 'expo-notifications'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = NativeStackScreenProps<RootStackParamList, 'CreateCard'>

export default function CreateCardScreen({ navigation, route }: Props) {

    const nav = useNavigation()
    const editingId = route.params?.cardId
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [steps, setSteps] = useState<string[]>([''])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [loading, setLoading] = useState(!!editingId)
    const userId = auth.currentUser?.uid

    // intervalli päivien valitsemiseen
    const [repeatInterval, setRepeatInterval] = useState(1)
    const [repeatUnit, setRepeatUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days')

    useEffect(() => {
        // Kun editingId muuttuu ollaan muokkaamassa olemassa olevaa korttia
        // Haetaan Firestoresta kortin tiedot
        const load = async () => {
            if (!editingId) return
            const snap = await getDoc(doc(db, 'cards', editingId))
            // Täytetään oikeat kohdat oikeilla tiedoilla
            if (snap.exists()) {
                const data = snap.data() as any
                setTitle(data.title || '')
                setDescription(data.description || '')
                const lines = (data.instructions || '').split('\n')
                setSteps(lines.length ? lines : [''])
                setSelectedDate(data.timerEnd?.toDate?.() ?? new Date())
                setRepeatInterval(data.repeatInterval || 1)
                setRepeatUnit(data.repeatUnit || 'days')
            }
            setLoading(false)
        }
        load()
    }, [editingId])

    // Määritellään ohjeitten format
    const addStep = () => setSteps([...steps, ''])
    const updateStep = (index: number, text: string) => {
        const updated = [...steps]
        updated[index] = text
        setSteps(updated)
    }

    // Kortin tallennus funktio
    const onSave = async () => {
        try {
            // Tarkistetaan onko käyttäjä kirjautunut sisään
            if (!userId) {
                Alert.alert('Et ole kirjautunut sisään')
                return
            }
            if (!title.trim()) {
                Alert.alert('Täytä otsikko')
                return
            }

            // Asetetaan timerin loppumis aika päivän klo 17.00
            const timerEndDate = new Date(selectedDate)
            timerEndDate.setHours(17, 0, 0, 0)

            // Määritellään timerin loppumisaika
            const timerEnd = Timestamp.fromDate(timerEndDate)
            const instructions = steps.filter(s => s.trim()).join('\n')

            // Jos editingId on asetettu päivitetään olemassa olevaa korttia
            if (editingId) {
                await updateDoc(doc(db, 'cards', editingId), {
                    title,
                    description,
                    instructions,
                    timerEnd,
                    repeatInterval,
                    repeatUnit,
                })
            } else {
                // Jos ei niin luodaan uusi kortti
                await addDoc(collection(db, 'cards'), {
                    title,
                    description,
                    instructions,
                    timerEnd,
                    repeatInterval,
                    repeatUnit,
                    userId,
                    createdAt: serverTimestamp(),
                })
            }

            try {
                // Määritellään notification kun aika loppuu kortista
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Huoltokirjan muistutus',
                        body: `Aika tehdä: ${title}`,
                    },
                    trigger: { type: 'date', date: timerEndDate } as any,
                })

                // Sitten asetetaan uusi timer kun alkuperäinen loppuu
                // Asetetaan se käyttäjän valitsemisen mukaan kuinka usein ilmoitus tulee
                let seconds = 0
                if (repeatUnit === 'days') seconds = repeatInterval * 60 * 60 * 24
                if (repeatUnit === 'weeks') seconds = repeatInterval * 60 * 60 * 24 * 7
                if (repeatUnit === 'months') seconds = repeatInterval * 60 * 60 * 24 * 30
                if (repeatUnit === 'years') seconds = repeatInterval * 60 * 60 * 24 * 365

                // Toistuva notification
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Huoltokirjan muistutus',
                        body: `Aika tehdä: ${title}`,
                    },
                    trigger: { type: 'timeInterval', seconds, repeats: true } as any,
                })
            } catch {

            }

            // Näytetään tallennettu alert, määritellään desc sen mukaan loitko vai muokkaistko korttia
            Alert.alert('Tallennettu', editingId ? 'Kortti päivitetty' : 'Kortti luotu')
            navigation.navigate('Home')
        } catch (e: any) {
            Alert.alert('Virhe', e.message ?? 'Tallennus epäonnistui')
        }
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.center}><Text style={{ color: '#fff' }}>Ladataan…</Text></View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safe}>

            {/* Headeri */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="arrow-back-outline" size={22} color="#7cc0ff" style={{ marginRight: 6 }} />
                    <Text style={styles.back}>Takaisin</Text>
                </TouchableOpacity>
                {/* Näytetään oikea title sen mukaan muokkaatko vai luotko korttia */}
                <Text style={styles.headerTitle}>{editingId ? 'Muokkaa kotihuoltoa' : 'Luo kotihuolto'}</Text>
            </View>

            {/* Määritellään inputit */}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.label}>Otsikko</Text>
                <TextInput
                    style={styles.input}
                    placeholder="esim. Vaihda ilmansuodattimet"
                    placeholderTextColor="#888"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Lyhyt kuvaus</Text>
                <TextInput
                    style={[styles.input, styles.multiline]}
                    placeholder="esim. Muista huollattaa ja puhdistaa ilmansuodattimet kodin sisältä"
                    placeholderTextColor="#888"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                <Text style={styles.label}>Ohjeet vaiheittain</Text>
                {steps.map((step, idx) => (
                    <TextInput
                        key={idx}
                        style={[styles.input, styles.stepInput]}
                        placeholder={`Ohje ${idx + 1}`}
                        placeholderTextColor="#888"
                        value={step}
                        onChangeText={(text) => updateStep(idx, text)}
                    />
                ))}
                <TouchableOpacity style={styles.addStep} onPress={addStep}>
                    <Text style={styles.addStepText}>＋ Lisää uusi ohje</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Määräpäivä</Text>
                <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                    <Text style={{ color: '#fff' }}>{selectedDate.toLocaleDateString('fi-FI')}</Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="calendar"
                        minimumDate={new Date()}
                        onChange={(event, date) => {
                            setShowPicker(false)
                            if (date) setSelectedDate(date)
                        }}
                    />
                )}

                {/* Toistuvuus kohta jotta käyttäjä voi valita kuinka usein ilmoitus tulee hänelle */}
                <Text style={styles.label}>Toistuvuus</Text>
                <Text style={styles.descSmall}>
                    Valitse kuinka usein muistutus toistuu ensimmäisen määräpäivän jälkeen.
                    Esim. joka päivä, joka toinen viikko, kerran kuussa tai kerran 10 vuodessa.
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', marginVertical: 8 }}>
                    <TextInput
                        style={[styles.input, { width: 70, marginRight: 8, textAlign: 'center' }]}
                        keyboardType="numeric"
                        value={String(repeatInterval)}
                        onChangeText={(text) => setRepeatInterval(Number(text))}
                    />
                    {['days', 'weeks', 'months', 'years'].map(unit => (
                        <TouchableOpacity
                            key={unit}
                            style={[
                                styles.repeatBtn,
                                repeatUnit === unit && styles.repeatBtnSelected
                            ]}
                            onPress={() => setRepeatUnit(unit as any)}
                        >
                            <Text style={styles.repeatBtnText}>
                                {unit === 'days' ? 'päivää' :
                                    unit === 'weeks' ? 'viikkoa' :
                                        unit === 'months' ? 'kuukautta' :
                                            'vuotta'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Nappi */}
                <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text style={styles.buttonText}>{editingId ? 'Tallenna muutokset' : 'Tallenna'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // Safearea
    safe: {
        flex: 1,
        backgroundColor: '#121212'
    },

    // Headerin tyylitykset
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
        fontWeight: '700',
    },

    // Global tyylitykset
    container: {
        padding: 16,
    },
    label: {
        color: '#bbb',
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#3a3a3a',
        color: '#fff',
        borderRadius: 8,
        padding: 12,
        marginTop: 6,
    },
    multiline: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Ohje input ja button
    stepInput: {
        marginBottom: 8,
    },
    addStep: {
        backgroundColor: '#4a8cff',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 16,
    },
    addStepText: {
        color: '#fff',
        fontWeight: '600',
    },

    // Tallenna button
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },

    // Repeat notification itemien tyylitys
    repeatBtn: {
        backgroundColor: '#3a3a3a',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
        justifyContent: 'center',
    },
    repeatBtnSelected: {
        backgroundColor: '#4a8cff',
    },
    repeatBtnText: {
        color: '#fff',
    },
    descSmall: {
        color: '#888',
        fontSize: 13,
        marginBottom: 8,
    },
})

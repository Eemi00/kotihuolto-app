import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

export default function Support() {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView>

                {/* Headeri */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Icon name="arrow-back-outline" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Apu & Tuki</Text>
                </View>

                {/* Hero osio */}
                <View style={styles.hero}>
                    <Text style={styles.heroText}>Miten voimme auttaa? 👋</Text>
                </View>

                <View style={styles.articles}>

                    {/* Osion otsikko */}
                    <Text style={styles.articleTitle}>Usein kysytyt kysymykset</Text>

                    {/* Artikkeli 1 */}
                    <View style={styles.item}>
                        <Icon name="lock-closed-outline" size={24} color="#4fc3f7" style={styles.itemIcon} />
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>Haluatko vaihtaa salasanasi?</Text>
                            <Text style={styles.itemDesc}>
                                Voit päivittää salasanasi asetuksista. Mene asetuksiin → Turvallisuus → Vaihda salasana.
                            </Text>
                        </View>
                    </View>

                    {/* Artikkeli 2 */}
                    <View style={styles.item}>
                        <Icon name="add-circle-outline" size={24} color="#81c784" style={styles.itemIcon} />
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>Miten luon uuden kortin?</Text>
                            <Text style={styles.itemDesc}>
                                Paina "+" -painiketta kotisivulla, lisää otsikko, ohjeet ja aseta muistutusaika.
                            </Text>
                        </View>
                    </View>

                    {/* Artikkeli 3 */}
                    <View style={styles.item}>
                        <Icon name="time-outline" size={24} color="#ffb74d" style={styles.itemIcon} />
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>Voinko muokata kortin muistutusta?</Text>
                            <Text style={styles.itemDesc}>
                                Kyllä! Valitse kortti ja paina muokkaa painiketta. Voit vaihtaa tekstit tai ajastimen.
                            </Text>
                        </View>
                    </View>

                    {/* Artikkeli 4 */}
                    <View style={styles.item}>
                        <Icon name="notifications-outline" size={24} color="#f06292" style={styles.itemIcon} />
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>Sovellus ei ilmoita?</Text>
                            <Text style={styles.itemDesc}>
                                Tarkista puhelimen ilmoitusasetukset ja varmista että Kotihuolto-sovellukselle on sallittu ilmoitukset.
                            </Text>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    // Safe area
    safe: {
        flex: 1,
        backgroundColor: '#1f1f1f',
    },

    // Headerin tyylitykset
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#444',
    },
    icon: {
        marginRight: 15,
        backgroundColor: '#333',
        padding: 8,
        borderRadius: 50,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },

    // Hero osio
    hero: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 18,
    },

    // Artikkelit
    articles: {
        marginTop: -30,
        backgroundColor: '#2c2c2c',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 12,
        paddingBottom: 16,
    },
    articleTitle: {
        color: '#fff',
        padding: 16,
        fontSize: 20,
        fontWeight: '600',
        borderBottomWidth: 1,
        borderColor: '#444',
    },

    // Artikkeli itemi
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: 12,
        marginTop: 12,
        borderRadius: 10,
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    itemIcon: {
        marginRight: 12,
        marginTop: 4,
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    itemDesc: {
        color: '#bbb',
        fontSize: 14,
        lineHeight: 20,
    },

})
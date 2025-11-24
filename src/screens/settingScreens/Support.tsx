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

                {/* Hero osio hakupalkilla */}
                <View style={styles.hero}>
                    <Text style={styles.heroText}>Miten voimme auttaa? 👋</Text>
                    <View style={styles.searchContainer}>
                        <Icon name="search-outline" size={20} color="#fff" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder='Etsi huoltoja...'
                            placeholderTextColor="#dfebebff"
                        />
                    </View>
                </View>

                <View style={styles.articles}>
                    <Text style={styles.articleTitle}>Usein kysytyt kysymykset</Text>

                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>Miksi en saanut ilmoitusta huollosta?</Text>
                        <Text style={styles.itemDesc}></Text>
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
        experimental_backgroundImage: 'linear-gradient( #10270aff, #377725)',
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

    // Haku osio
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff5e',
        margin: 16,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        paddingVertical: 8,
    },

    // Artikkelit
    articles: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        backgroundColor: '#2c2c2c',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    articleTitle: {
        color: '#ffffffff',
        padding: 12,
        fontSize: 18,
        fontWeight: '500',
    },

    // Artikkeli itemi
    item: {
        padding: 20,
    },
    itemTitle: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 6,
    },

})
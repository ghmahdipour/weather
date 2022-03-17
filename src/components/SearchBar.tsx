
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Text, Image, TouchableOpacity } from "react-native";
    
const SearchBar = (
    {clicked, searchPhrase, setSearchPhrase, setClicked, search, closeSearch} : 
    {
        clicked : boolean, 
        searchPhrase: string, 
        setSearchPhrase: Function,
        setClicked: Function,
        search: Function,
        closeSearch: Function
    }
) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.searchBarClicked}>
                <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            returnKeyType='search'
                            placeholder="Enter your city name"
                            value={searchPhrase}
                            onSubmitEditing={() => {
                                search(searchPhrase)
                            }}
                            onChangeText={(text: any) => setSearchPhrase(text)}
                            onFocus={() => {
                                setClicked(true);
                            }}
                    />
                    {clicked && searchPhrase !== '' ? (
                        <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                            setSearchPhrase('')
                            closeSearch()
                            }}
                        style={styles.imageContainer}>
                            <Image source={require('../../assets/close.png')}/>
                        </TouchableOpacity>
                    
                    ): (
                    <TouchableOpacity
                        style={styles.imageContainer} 
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(true);
                            }}>
                    </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity 
                    onPress={() => {
                        search(searchPhrase)
                        Keyboard.dismiss();
                    }}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
            </View>
            
         </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "85%",
    },
    inputContainer: {
        flexDirection: "row",
        backgroundColor: 'white',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    searchBarClicked: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "lightblue",
        borderRadius: 15,
        alignItems: "center",
        overflow: 'hidden',
    },
    imageContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: '400',
    }
})

export default SearchBar;
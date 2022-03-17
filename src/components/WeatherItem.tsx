import React from "react";
import {StyleSheet, View, Text} from "react-native";
import moment  from "moment";
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";

const WeatherItem = (props:any) => {
    
    const {items} = props
    const img = {uri: 'http://openweathermap.org/img/wn/' +items.image+ '@4x.png'}
    
    const calTemp = (temp:any) => {
        let _temp = Math.floor(temp-273.15)
        return _temp
    }

    return (
        <View style={styles.container} key={items.id}>
            <View style={styles.ContainerItem}>
                <View style={styles.otheContainer}>
                    <Text style={styles.day}>
                        <Text>{moment(items.time * 1000).format('dddd')}{', '}</Text>
                        <Text>{moment(items.time * 1000).format('MMM Do')}</Text>
                    </Text>
                    <Text style={[styles.temp, {fontSize: 18}]}>{calTemp(items.temp)}&#176;C{' - '}
                        <Text>{items.description}</Text>
                    </Text>
                    <Text style={styles.temp}>
                        Humidity :{' '}<Text>{items.humidity}{'%'}</Text>
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <ProgressiveFastImage
                        source={img} 
                        style={styles.image}
                        thumbnailSource={img}
                    />
                </View>
            </View>
         </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        padding: 20
    },
    imageContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 160,
        height: 160
    },
    ContainerItem: {
        backgroundColor: '#0000003c',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
        flexDirection: 'row',
        flex:1
    },
    day: {
        fontSize: 18,
        color: 'white',
        backgroundColor: '#3c3c44',
        padding: 12,
        textAlign: 'center',
        borderRadius: 50,
        marginBottom: 15,
        fontWeight: '400'
    },
    otheContainer: {
        // backgroundColor: 'pink',
        // alignItems:'flex-start'
    },
    temp: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: '400',
        padding:3
        
    }
})

export default WeatherItem;
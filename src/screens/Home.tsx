import React, {useRef, useState, useCallback} from 'react';
import { View, ImageBackground, useWindowDimensions, StatusBar, ScrollView, RefreshControl } from 'react-native';
import SearchBar from '../components/SearchBar'
import WeatherItem from '../components/WeatherItem'
import * as homeActions from '../actions/homeActions';
import Loader  from '../components/Loader';
import Toast from 'react-native-easy-toast';

import {useSelector, useDispatch} from 'react-redux';

const Home = (props: any) => {
    const {width: windowWidth, height: windowHeight} = useWindowDimensions()
    const weatherData = useSelector((state:any) => state.home.weathers)
    const [searchPhrase, setSearchPhrase] = useState<string>("")
    const [clicked, setClicked] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const toast = useRef<any>()
    const dispatch = useDispatch()
   
    const closeSearch = () => {
        // setweatherData([])
    }
    
    const _search = async (str: string) => {
        let reg = /^[a-zA-Z',.\s-]{1,25}$/
        
        if(str === '' || str === undefined){
            toast.current.show('Please type your city name!', 3000)
            setIsRefreshing(false)
        } else if(!reg.test(str)){
            toast.current.show('Please type correct city name!', 3000)
            setIsRefreshing(false)
        } else {
            const url = `/forecast?q=${str}`
            setIsLoading(true);
            setIsRefreshing(false)
            try {
                await dispatch(homeActions.getWeathers(url));
            } catch (err: any) {
                console.log("error", err)
                if (err.status === 401) {
                    //don't have appid
                }else if(err.status === 404) {
                    toast.current.show('City name is Incorrect', 3000);
                }
            }
            setIsLoading(false);
        }
    }

    const _refreshHandler = useCallback(async(str: string) => {
        setIsRefreshing(true)
		await _search(str)
    },[])
    
    return (
        <>
            <StatusBar barStyle='light-content' />
            <View style={{width: windowWidth, height: windowHeight, flex: 1}}>
                <ImageBackground
                    source={require('../../assets/background.png')}
                    style={{flex: 1}}
                >
                    <SearchBar 
                        search={_search}
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                        clicked={clicked}
                        setClicked={setClicked}
                        closeSearch={closeSearch}
                    />

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                              refreshing={isRefreshing}
                              onRefresh={() => _refreshHandler(searchPhrase)}
                            />
                        }
                    >
                        {!weatherData ? (<></>)
                            : (<>{
                                weatherData.map((items:any, index:any) => {
                                    return (
                                        <WeatherItem items={items} key={JSON.stringify(index)} />
                                    ) 
                                })
                            }</>
                        )}
                    </ScrollView>
                    <Loader loading={isLoading} />
                </ImageBackground>    
            </View>
            <Toast ref={toast} position="top" positionValue={150} opacity={0.8} />
        </>
    )
}


export default Home;
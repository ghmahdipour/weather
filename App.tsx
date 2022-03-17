import React, { useEffect, useRef } from 'react';
import Home from './src/screens/Home'
import {Provider, useDispatch, useSelector} from 'react-redux';
import Store from './src/utils/create_store'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-easy-toast'
import {
    SET_NETWORK_INFO_DISCONNECTED, 
    SET_NETWORK_INFO_CONNECTED
  } from './src/actions/actionTypes';

export const AppWrapper = (props: any) => {
    return (
        <Provider store={Store}>
            <App />
        </Provider>
    )
}

export const App = () => {
    const toast = useRef<any>()
    const dispatch = useDispatch()
    const networkInfo = useSelector((state:any) => state.app.networkInfo)

    const _setNetworkInfo = (state:any) => {
        if (state.isConnected == false) {
            dispatch({
                'type': SET_NETWORK_INFO_DISCONNECTED,
                'payload': {
                    'state': state
                }
            })
        } else {
            dispatch({ 'type': SET_NETWORK_INFO_CONNECTED, 'payload': { 'state': state } })
        }
    }
    useEffect(() => {
        NetInfo.addEventListener(_setNetworkInfo)
        
    },[])

    useEffect(() => {
        if(networkInfo !== undefined){
            if(networkInfo.state.isConnected) toast.current.show('Online on search page', 3000)
            else toast.current.show('Connection Lost', 3000)
        }
    },[networkInfo])

    return(
        <>
            <Home />
            <Toast ref={toast} position="top" positionValue={150} opacity={0.8} />
        </>
    )
}

export default AppWrapper;
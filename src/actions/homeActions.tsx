
import request from 'axios';
import {
    GET_WEATHERS
  } from './actionTypes';

  import { Dispatch } from 'redux';

const API_KEY = 'acb1595d3cfdc18ae5d99dcbc3912ad3'
const apiServer = 'https://api.openweathermap.org/data/2.5';
const extra = '&appid='

export const setListItems = (listItems:any) => {
    let transformData : any[] = []
    const temp = new Set()

    Object.values(listItems).map((items:any, index: any) => {
        transformData.push({
            time: items.dt,
            mainTime: items.dt_txt.split(' ')[0],
            temp: items.main.temp,
            humidity:items.main.humidity,
            description: items.weather[0].description,
            image:items.weather[0].icon,
            id: index,
        });
        
    })
    return {
        'type': GET_WEATHERS,
        'payload': { 
            'data': transformData.filter((item:any) => {
                const duplicate = temp.has(item.mainTime);
                temp.add(item.mainTime);
                return !duplicate;
            })
        }
    };
};

export const getWeathers = (url : string) => {
    return async (dispatch:Dispatch) => {
        try {
            const response = await request.get<any>(
                apiServer + url + extra + API_KEY
            );
            console.log("--status-code--",response.status)  
            const data = await response.data.list
            dispatch(setListItems(data));
          } catch (err: any) {
            if (request.isAxiosError(err) && err.response) {
                console.log("error", err.response)
            }
            throw err.response;
        }
    };
};
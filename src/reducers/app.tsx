import {
    SET_NETWORK_INFO_DISCONNECTED, 
    SET_NETWORK_INFO_CONNECTED
} from '../actions/actionTypes';

const initialState = {
	networkinfo: null
};

export default function app(state = initialState, action:any) {
    switch (action.type) {
        case SET_NETWORK_INFO_DISCONNECTED: {
          return {
            ...state,
            'networkInfo': action.payload,
          };
        }
        case SET_NETWORK_INFO_CONNECTED: {
            return {
              ...state,
              'networkInfo': action.payload,
            };
          }
        default: {
          return state;
        }
    }
};


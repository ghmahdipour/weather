import {
    GET_WEATHERS
} from '../actions/actionTypes';

const initialState = {
	weathers: []
};

export default function home(state = initialState, action:any) {
    switch (action.type) {
        case GET_WEATHERS: {
          return {
            ...state,
            'weathers': action.payload.data
          };
        }
        default: {
          return state;
        }
    }
};


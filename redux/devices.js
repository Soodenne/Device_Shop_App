import * as ActionTypes from './ActionTypes';

export const devices = (state = { isLoading: true, errMess: null, devices: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEVICES:
            return { ...state, isLoading: false, errMess: null, devices: action.payload };
        case ActionTypes.DEVICES_LOADING:
            return { ...state, isLoading: true, errMess: null, devices: [] }
        case ActionTypes.DEVICES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
};
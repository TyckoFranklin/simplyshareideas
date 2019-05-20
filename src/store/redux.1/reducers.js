import { combineReducers } from 'redux'
import { combineMaps } from './util';
import * as A from './actions';

export const users = (state = new Map(), action) => {
    switch (action.type) {
        case A.ADD_USER: {
            return combineMaps(state, action.payload);
        }
        default: {
            return state;
        }
    }
}
export const slideshows = (state = new Map(), action) => {
    switch (action.type) {
        case A.ADD_SLIDESHOW: {
            return combineMaps(state, action.payload);
        }
        default: {
            return state;
        }
    }
}

export const slides = (state = new Map(), action) => {
    switch (action.type) {
        case A.ADD_SLIDE: {
            return combineMaps(state, action.payload);
        }
        default: {
            return state;
        }
    }
}

export const pictures = (state = new Map(), action) => {
    switch (action.type) {
        case A.ADD_PICTURE: {
            return combineMaps(state, action.payload);
        }
        default: {
            return state;
        }
    }
}

export const currentUser = (state = {}, action) => {
    switch (action.type) {
        case A.CURRENT_USER: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    users,
    slideshows,
    slides,
    pictures,
    currentUser,
})
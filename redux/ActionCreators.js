import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../share/baseUrl';

// leaders
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return fetch(baseUrl + 'leaders')
        .then((response) => {
            if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
            else return response.json();
        })
        .then((leaders) => dispatch(addLeaders(leaders)))
        .catch((error) => dispatch(leadersFailed(error.message)));
};
const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});
const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});
const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

// devices
export const fetchDevices = () => (dispatch) => {
    dispatch(devicesLoading());
    return fetch(baseUrl + 'devices')
        .then((response) => {
            if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
            else return response.json();
        })
        .then((devices) => dispatch(addDevices(devices)))
        .catch((error) => dispatch(devicesFailed(error.message)));
};
const devicesLoading = () => ({
    type: ActionTypes.DEVICES_LOADING
});
const devicesFailed = (errmess) => ({
    type: ActionTypes.DEVICES_FAILED,
    payload: errmess
});
const addDevices = (devices) => ({
    type: ActionTypes.ADD_DEVICES,
    payload: devices
});

// comments
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then((response) => {
            if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
            else return response.json();
        })
        .then((comments) => dispatch(addComments(comments)))
        .catch((error) => dispatch(commentsFailed(error.message)));
};
const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});
const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (deviceId, rating, author, comment) => (dispatch) => {
    var newcmt = { deviceId: deviceId, rating: rating, author: author, comment: comment, date: new Date().toISOString() };
    // dispatch(addComment(newcmt));
    fetch(baseUrl + 'comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newcmt)
    }).then((response) => {
        if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
        else return response.json();
    })
        .then((cmt) => dispatch(addComment(cmt)))
        .catch((error) => dispatch(commentsFailed(error.message)));
};
const addComment = (newcmt) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: newcmt
});

// promotions
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
    return fetch(baseUrl + 'promotions')
        .then((response) => {
            if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
            else return response.json();
        })
        .then((promos) => dispatch(addPromos(promos)))
        .catch((error) => dispatch(promosFailed(error.message)));
};
// users
export const loginUser = (userinfo) => ({
    type: ActionTypes.LOGIN_USER,
    payload: userinfo
});
export const logoutUser = () => ({
    type: ActionTypes.LOGOUT_USER,
    payload: null
});
// favorites
export const postFavorite = (deviceId) => (dispatch) => {
    dispatch(addFavorite(deviceId));
};
const addFavorite = (deviceId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: deviceId
});
// favorites
export const deleteFavorite = (deviceId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: deviceId
});
const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});
const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});
const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
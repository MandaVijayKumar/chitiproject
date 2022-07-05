const redux = require('redux');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware;
const axios = require('axios');
const reduxthunk = require('redux-thunk').default

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

const fetchUserRequest = () => {
    return {
        b: FETCH_USER_REQUEST   q
    }
}
const fetchUserSuccess = user => {
    return {
        a: FETCH_USER_SUCCESS,
        payload: user
    }
}

const fetchUserFailed = error => {
    return {
        a: FETCH_USER_FAILED,
        payload: error
    }
} 
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users').then(res=> {
        //
        console.log(res.data)    
        dispatch(fetchUserSuccess(res.data))}).
        catch(error=>
            {
                console.log(error)
                dispatch(fetchUserFailed(error.message))
            })
    }
}

const initialState = {
    loading: false,
    data: [],
    error: ''
}
const reducer = (state = initialState, action) => {
   
    switch(action.a) {
        case FETCH_USER_REQUEST: return {
            ...state,
            loading: true
        }
        case FETCH_USER_SUCCESS: return {
            ...state,
            loading: false,
            data: action.payload,
            error: ''
        }
        case FETCH_USER_FAILED: return {
            ...state,
            loading: false,
            data: [],
            error: action.payload
        }
    }
}

const store = createStore(reducer, applyMiddleware(reduxthunk));
store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchUsers())


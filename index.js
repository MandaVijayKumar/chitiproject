const redux = require('redux');
const reduxlogger = require('redux-logger');
const logger = reduxlogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers
const CAKE_ORDER = 'CAKE_ORDER';
const CAKE_CANCEL = 'CAKE_CANCEL';
const ICECREAM_CANCEL = 'ICECREAM_CANCEL';
const ICECREAM_ORDER = 'ICECREAM_ORDER';

const orderCacke = (data=1) => {
    return {
        type : CAKE_ORDER,
        payload : data
    }
}
const orderCakeCancel = (data=1) => {
    return {
        type : CAKE_CANCEL,
        payload : data
    }
}
const orderIceCream = (data = 1) => {
    return {
        type : ICECREAM_ORDER,
        payload : data
    }
}
const orderIceCancel = (data = 1) => {
    return {
        type: ICECREAM_CANCEL,
        payload: data
    }
}
const initialCakeState = {
    cakeCount : 10,
    
}
const initialIceCreamState = {
   
    iceCreamCount : 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDER: return {
            ...state,
            cakeCount : state.cakeCount + action.payload
        }
        case CAKE_CANCEL: return {
            ...state,
            cakeCount : state.cakeCount - action.payload
        }
       
        default:  return state;
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
      
        case ICECREAM_ORDER: return {
            ...state,
            iceCreamCount : state.iceCreamCount - action.payload
        }
        case ICECREAM_CANCEL: return {
            ...state,
            iceCreamCount: state.iceCreamCount + action.payload
        }
        default:  return state;
    }
}
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger));
let data = store.getState();
console.log('store is ',data);
let unsubscribe = store.subscribe(()=>{})
const actions = bindActionCreators({orderCacke,orderCakeCancel, orderIceCream, orderIceCancel},store.dispatch)
actions.orderCacke(2);
actions.orderCakeCancel(1);
actions.orderIceCream(2)
actions.orderIceCancel(4)
unsubscribe();
console.log(data.cake);




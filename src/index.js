import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import thunk from 'redux-thunk';
import  {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';


import portfolioReducer from '../src/store/reducers/portfolioReducer';
import repositoryReducer from '../src/store/reducers/repositoryReducer';
import selctors from '../src/store/reducers/selecorsReducer';
import excelReducer from '../src/store/reducers/uploadExcelReducer';
import movementReducer from '../src/store/reducers/movementsReducer';
import authReducer from '../src/store/reducers/authReducer';
import tzurReducer from '../src/store/reducers/tzurReducer';

// axios.defaults.baseURL ="http://localhost:8080/";
axios.defaults.baseURL ="https://env-4171164.j.box.co.il/AnchorOpen/";
// axios.defaults.baseURL ="https://anchor-bf513.firebaseio.com/";
// axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = 'TEST AUTH COMMON';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] =  '*';
// axios.defaults.headers.post['Content-type']= 'application/json';
// axios.defaults.withCredentials = true;


const rootReducer = combineReducers({
    excel:excelReducer,
    portfolio: portfolioReducer,
    select:selctors,
    repository:repositoryReducer,
    movements:movementReducer,
    auth:authReducer,
    tzur:tzurReducer
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose ;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

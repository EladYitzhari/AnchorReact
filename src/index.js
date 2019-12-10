import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import thunk from 'redux-thunk';
import  {createStore, combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';


import portfolioReducer from '../src/store/reducers/portfolioReducer'

axios.defaults.baseURL ="http://localhost:8080/";
axios.defaults.headers.common['Authorization'] = 'AUTO TOKEN';
axios.defaults.headers.post['content-type']= 'application/json';



const rootReducer = combineReducers({
    portfolio: portfolioReducer
});




const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import './Index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './redux/rootReducer.js'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers =
	typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		}) : compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
	<Provider store={store}>
		<BrowserRouter >
			<App />
		</BrowserRouter >
	</Provider>
)
ReactDOM.render(
	app,
	document.getElementById('root')
);

registerServiceWorker();




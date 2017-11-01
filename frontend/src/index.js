import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';

import Index from './components/index';
import reducers from './reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'dev' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));
const store    = createStore(reducers, enhancer);

ReactDOM.render(<Provider store={store}>
	<Index />
</Provider>, document.querySelector('.app-root'));

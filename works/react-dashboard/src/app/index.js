import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import myStore from './reducers';
import App from './containers/App';

ReactDOM.render(
    <Provider store={createStore(myStore)}>
        <App />
    </Provider>,
    document.getElementById('root')
);

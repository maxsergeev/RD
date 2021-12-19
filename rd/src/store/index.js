import {applyMiddleware, createStore} from "redux";
import {reducers} from './reducers';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";


const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
});

export const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk)
));
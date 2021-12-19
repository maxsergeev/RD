import {combineReducers} from 'redux'
import {cardReducer} from './card'
import {registryReducer} from "./registry/reducer";


export const reducers = combineReducers({
    card : cardReducer,
    registry : registryReducer
})
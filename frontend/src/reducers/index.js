import { combineReducers } from 'redux';
import userInfoReducer from 'reducers/userInfo'

export default combineReducers({
  userInfo: userInfoReducer
})
import { combineReducers } from 'redux';
import  fetchData  from './reducer_data';
const rootReducer = combineReducers({
  data: fetchData
});

export default rootReducer;

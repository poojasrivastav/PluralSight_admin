import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
 switch(action.type) {
  case types.LOAD_COURSES_SUCCESS:
   return action.courses;
  default:
   return state;
 }
}

//for create_course
// state.push(action.course);
//return state
//another form of above two lines
// return [...state,
//Object.assign({}, action.course)
//];
import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
 switch(action.type) {
  case types.LOAD_COURSES_SUCCESS:
   return action.courses;
  default:
   return state;
 }
}

//for create_course
//another form of -> state.push(action.course)//return state
// return [...state,
//Object.assign({}, action.course)
//];
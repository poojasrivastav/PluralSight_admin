import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';

//this loadCoursesSuccess action will not be fired untill async call successfully
// happend i.e untill loadCourses(thunk) return successfully thatswhy this action name is LOAD_COURSES_SUCCESS.

//Action 
export function loadCoursesSuccess(courses) {
	return {
		type: types.LOAD_COURSES_SUCCESS,
		courses
	};

}

export function updateCourseSuccess(course) {
	return {
		type: types.UPDATE_COURSE_SUCCESS,
		course
	};
}

export function createCourseSuccess(course) {
	return {
		type: types.CREATE_COURSE_SUCCESS,
		course
	};
}

		
//THUNK 
export function loadCourses() {
  return function(dispatch) {
   return CourseApi.getAllCourses().then(courses => {
     dispatch(loadCoursesSuccess(courses));
   }).catch(error =>{
        throw(error);
   });
  };
}

export function saveCourse(course) {
 return function(dispatch, getState) { //getState when you want a particular piece of info directly from store, here we dont want that--so here not useful you can even remove that.
   return CourseApi.saveCourse(course).then(savedCourse => {
     course.id ? dispatch(updateCourseSuccess(savedCourse)) :
     dispatch(createCourseSuccess(savedCourse));
   }).catch(error =>{
 	   throw(error);
   });
 };
}
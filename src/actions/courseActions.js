import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';

//this loadCoursesSuccess action will not be fired untill async call successfully
// happend i.e untill loadCourses(thunk) return successfully thatswhy this action name is LOAD_COURSES_SUCCESS.
export function loadCoursesSuccess(courses) {
	return {
		type: types.LOAD_COURSES_SUCCESS,
		courses
	};

}

export function loadCourses() {
	return function(dispatch) {
		return CourseApi.getAllCourses().then(courses => {
			dispatch(loadCoursesSuccess(courses));
		}).catch(error =>{
			throw(error);
		});
	};
}
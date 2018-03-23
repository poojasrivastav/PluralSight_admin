import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';


class ManageCoursePage extends React.Component {
 constructor(props, context){
  super(props, context);
  this.state = {
   authors: [],
   course: Object.assign({}, this.props.course),
   error: {}
  };
  this.updateCourseState = this.updateCourseState.bind(this);
  this.saveCourse = this.saveCourse.bind(this);
 }

 componentWillReceiveProps(nextProps) {
  if(this.props.course.id != nextProps.course.id) {
    //Necessary to populate form when existing course is loaded directly.
    this.setState({course: Object.assign({}, nextProps.course)});
  }
 }
 
//onChange handler
 updateCourseState(event) {
  const field= event.target.name;
  let course= Object.assign({}, this.state.course); //used object.assign to not mutate the state.
  course[field]= event.target.value; //otherwise in this line state will be mutated.
  return this.setState({course: course});
 }

 //dispatch saveCourse action
 saveCourse(event) {
  event.preventDefault();
  this.props.actions.saveCourse(this.state.course);
  this.context.router.push('/courses');

 }
 render() {
  return(
   <CourseForm 
     course={this.state.course}
     onChange={this.updateCourseState}
     onSave={this.saveCourse}
     allAuthors={this.props.authors}
     errors={this.state.error}
   /> //
  );
 }	
}

ManageCoursePage.propTypes = { 
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired

};

//Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
	router: PropTypes.object
};

function getCourseById(courses, id) {
  
  const course = courses.filter(course => course.id === id);
  if(course.length) return course[0];    
  return null;

}

function mapStateToProps(state, ownProps) {
 let courseId = ownProps.params.id;  //from the path '/course/:id' //ownProps is used to get props from react-router
 let course = {id: '', title: '', watchHref: '', authorId: '', length: '', category: ''};

 if(courseId && state.courses.length > 0){                   //2nd condition is for=>no courses i.e [] on reload while course.id is present. we are still waiting for that AJAX call to come back, but this is running immediately on page load.
  course = getCourseById(state.courses, courseId);          //  state.courses.length will be greater than 0 once our AJAX call is completed
 }
 const authorsFormattedForDropdown = state.authors.map(author => {
	return {
		value: author.id,
		text: author.firstName + ' ' + author.lastName
	};
 });
 return {
  course: course,
  authors: authorsFormattedForDropdown
 };

}

function mapDispatchToProps(dispatch) {
 return {
  actions: bindActionCreators(courseActions, dispatch)
 };

}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
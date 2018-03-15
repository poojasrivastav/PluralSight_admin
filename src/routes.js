import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';

export default (
//i.e. on every render, App component will always render. 
//inside App we nested HomePage and AboutPage component and these 
//two will be passed as a child component to App.
//IndexRoute- when path is root i.e. "/" then render HomePage.
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} /> 
		<Route path="courses" component={CoursesPage} />
		<Route path="course" component={ManageCoursePage} />
		<Route path="course/:id" component={ManageCoursePage} />
		<Route path="about" component={AboutPage} />
	</Route>
);


import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import {loadCourses} from './actions/courseActions';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


//instead of browserHistory we can use hash(#) routing too.
//browserHistory is for more modern browser that have good support for HTML5 push state, which is exactly what browserHistory uses behind the scenes.
const store = configureStore();
store.dispatch(loadCourses());

render(
 <Provider store={store}>
  <Router history={browserHistory} routes={routes} />
 </Provider>,
 document.getElementById('app')
);
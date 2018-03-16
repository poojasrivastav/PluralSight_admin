import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';

export function loadAuthorSuccess(authors) {
 return {
  type: types.LOAD_AUTHOR_SUCCESS,
  authors
 };
}

//THUNK

export function loadAuthors() {
 return function(dispatch) {
  return AuthorApi.getAllAuthors().then(authors => {
   dispatch(loadAuthorSuccess(authors));
  }).catch(error =>{
  	throw(error)
  });

 };
}
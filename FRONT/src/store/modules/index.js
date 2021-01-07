import { combineReducers } from 'redux';
import login from './login';
import membership from './membership'
import dashboard from './dashboard';
import account from './account'
import transcation from './transcation'
import transfer from './transfer'

import { reducer as formReducer } from 'redux-form';

/* 리듀서가 여러개일대는 redux 의 내장함수인 combineReducers 를 사용하여 리듀서를 하나로 합치는 작업을 합니다. 
여러개로 나뉘어진 리듀서들을 서브리듀서 라고 부르고, 하나로 합쳐진 리듀서를 루트리듀서 라고 부릅니다. */
export default combineReducers({
  login,
  membership,
  dashboard,
  account,
  transcation,
  transfer,
  form: formReducer
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});

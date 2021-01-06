import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './store/modules';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lang/i18n'; //다국어 지원 파일

/* 개발자 도구  적용 */
const devTools = 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

/* 스토어 생성 */
const store = createStore(rootReducer, devTools);
console.log("==========CONSOL LOG==========");
console.log(store.getState());
console.log("==============================");

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

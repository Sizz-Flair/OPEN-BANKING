import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'login/CHANGE_INPUT';
const START_LOGIN = 'login/START_LOGIN';
//                                       type: 액션 종류를 한번에 식별할 수 있는 문자열 혹은 심볼, payload: 액션의 실행에 필요한 임의의 데이터
//export const changeInput = createAction(CHANGE_INPUT, userId => userId);

export const changeInput = text => ({ 
    type: CHANGE_INPUT, 
    payload: text,
});

export const submit = test => ({
    type: START_LOGIN,
    payload: test,
});

const iniialState = {
    userId:'',
    userPassword:'',
    loginSuccess:'',
};

//리듀서
export default handleActions(
    {
        [CHANGE_INPUT]: (state, action) => ({          
            ...state,
            [action.payload.name]: action.payload.value,
        }),
        [START_LOGIN]: (state, action) => ({
            ...state,        
            loginSuccess: action.payload,
        })
    },
    iniialState
);



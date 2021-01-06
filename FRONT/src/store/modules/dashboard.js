import { createAction, handleActions } from 'redux-actions';

const READ_USERINFO = 'login/READ_USERINFO';
const CHANGE_INPUT = 'login/CHANGE_INPUT';
const CHANGE_PAGING = 'login/CHANGE_PAGING';
const BANK_STATUS = 'login/BANK_STATUS';


//                                       type: 액션 종류를 한번에 식별할 수 있는 문자열 혹은 심볼, payload: 액션의 실행에 필요한 임의의 데이터
//export const changeInput = createAction(CHANGE_INPUT, userId => userId);

export const userInfo = text => ({ 
    type: READ_USERINFO, 
    payload: text,
});

 export const chang = text => ({
     type: CHANGE_INPUT,
     payload: text,
 });

 export const pagingSelect = text => ({
     type: CHANGE_PAGING,
     payload: text,
 })

 export const bankStatus = text => ({
    type: BANK_STATUS,
    payload: text,
 })


const iniialState = {
    userInfoData: '',
    testInfo:[],
    userId2:'',
    pagingSelect: '',
    bankStatus:[],
};

//리듀서
export default handleActions(
    {
        [READ_USERINFO]: (state, action) => ({          
            ...state,
            userInfoData: action.payload,
            testInfo : action.payload.res_list,
            pagingSelect: 1,
            
        }),
        [CHANGE_INPUT]: (state, action) => ({          
            ...state,
            [action.payload.name]: action.payload.value,
        }),
        [CHANGE_PAGING]: (state, action) => ({
            ...state,
            pagingSelect: action.payload
        }),
        [BANK_STATUS]: (state, action) => (console.log(action.payload),{
            ...state,
            bankStatus: action.payload
        })
    },
    iniialState
);



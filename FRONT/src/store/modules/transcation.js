import { handleActions } from 'redux-actions';

const DROP_STATE = "transcation/DROP_STATE";
const SELECT_TYPE = "transcation/SELECT_TYPE";
const READ_TRANSINFO = "transcation/READ_TRANSINFO";
const READ_FINTECHINFO = "transcation/READ_FINTECHINFO";

export const dropDownState = text => ({
    type: DROP_STATE,
    payload: text
})

export const selectType = text => ({
    type: SELECT_TYPE,
    payload: text
})

export const readTransInfo = text => ({
    type: READ_TRANSINFO,
    payload: text
})

export const readFintechInfo = text => ({
    type: READ_FINTECHINFO,
    payload: text
});

const iniialState = {
    dropDownState: false,
    accountInquiryType: '조회 종류',
    accountBankName: '은행 이름',
    transInfoList:[],
    fintechInfo:[],
    accountType: [
        {
            id: 1,
            type:'A',
            name:'모든 계좌'
        },
        {
            id: 2,
            type: 'I',
            name: '입금'
        },
        {
            id: 3,
            type:'O',
            name:'출금'
        },
    ],
};

export default handleActions(
    {
        [DROP_STATE]: (state, action) => ({
            ...state,
            dropDownState: action.payload
        }),
        [SELECT_TYPE]: (state, action) => ({
            ...state,
            [action.payload.name]: [action.payload.value],
        }),
        [READ_TRANSINFO]: (state, action) => ({
            ...state,
            transInfoList: action.payload.res_list
        }),
        [READ_FINTECHINFO]: (state, action) => ({
            ...state,
            fintechInfo: action.payload.res_list
        }),
    },
    iniialState
);
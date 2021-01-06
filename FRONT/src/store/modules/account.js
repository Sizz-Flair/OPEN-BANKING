import { createAction, handleActions } from 'redux-actions';

const BANK_INFO = "account/BANK_INFO";
const SELECT_BANK_NAME = "account/SELECT_BANK_NAME"

export const userInfo = text => ({
    type: BANK_INFO,
    payload: text,
});

export const selectBankName = (data) => ({
    type: SELECT_BANK_NAME,
    payload: data
});

const iniialState = {
    userBankInfo: [],
    renderCheck: false,
    selectBankName: '은행을 선택하세요',
    fintechNum: '',
    selectBankInfo: '',
    bank_name: '',
};

export default handleActions(
    {
        [BANK_INFO]: (state, action) => ({
            ...state,
            userBankInfo: action.payload.res_list,
            renderCheck: true,
        }),
        [SELECT_BANK_NAME]: (state, action) => ({
            ...state,
            selectBankName: action.payload.bank_name,
            fintechNum: action.payload.fintech_use_num,
            selectBankInfo: action.payload
        })
    },
    iniialState
);

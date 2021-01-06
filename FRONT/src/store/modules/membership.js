import { createAction, handleActions } from 'redux-actions';


const CHANGE_INPUT = 'membership/CHANGE_INPUT'
const START_MEMBERSHIP = 'membership/START_MEMBERSHIP'
const ARRD_BTN = 'membership/ARRD_BTB'
const ARRD_INFO = 'membership/ARRD_INFO'

const TEST_INFO = 'membership/TEST_INFO'


/* Action */
export const changeInput = data => ({ 
    type: CHANGE_INPUT, 
    payload: data,
})

export const submit = data => ({
    type: START_MEMBERSHIP,
    payload: data
})

export const btnEvent = data => ({
    type: ARRD_BTN,
    payload: data
})

export const testInfo = data => ({
    type: TEST_INFO,
    payload: data
})

export const addrInfo = data => ({
    type: ARRD_INFO,
    payload: data
})

/* 리듀서 */
const inialState = {
    /* 로그인 */
    memberId: '',
    memberPassword: '',
    userName: '',
    email: '',
    phoneNum: '',
    addressOpen: '',
    addrInfo: '',
}


export default handleActions(
    {
        [CHANGE_INPUT]: (state, action) => (console.log(action),{
            ...state,
            [action.payload.name]: action.payload.value

        }),
        [START_MEMBERSHIP]: (state, action) => ({
            ...state,
        }),
        [ARRD_BTN]: (state, action) => ({
            ...state,
            addressOpen: action.payload,
        }),
        [ARRD_INFO]: (state, action) => ((console.log(action.payload)),{
            ...state,
            addrInfo: action.payload
        }),
        [TEST_INFO]: (state, action) => ({
            ...state

        })

    },

    inialState
)
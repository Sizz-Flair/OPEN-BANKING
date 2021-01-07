import { handleActions } from 'redux-actions';

const TRNASFER_DIPOSIT = "transfer/TRNASFER_DIPOSIT";
const MODAL_STATUS = "transfer/MODAL_STATUS"

export const transferDiposit = text => ({
    type: TRNASFER_DIPOSIT,
    payload: text
})

export const modalStatus = () => ({
    type: MODAL_STATUS,
})


const iniialState = {
    transferReqInfo: "",
    modalVisible:false,
    trnsgerReqInfoResList:[]
};

export default handleActions(
    {
        [TRNASFER_DIPOSIT]: (state, action) => ({
            ...state,
            transferReqInfo: action.payload,
            modalVisible: true,
            trnsgerReqInfoResList: action.payload.res_list
        }),
        [MODAL_STATUS]: (state, action) => ({
            ...state,
            modalVisible: false,
        })
    },
    iniialState
);
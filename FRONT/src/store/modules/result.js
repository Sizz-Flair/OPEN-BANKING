import { handleActions } from 'redux-actions';


const CHANGE_DATE = 'result/CHANGE_DATE'


/* Action */
export const dateArrayInfo = (id, date) => ({ 
    type: CHANGE_DATE, 
    payload:{
        id:id, 
        date:date
    }
})


/* 리듀서 */
const inialState = {
    dateArray:[
        {
            id:0,
            date:null
        },
        {
            id:1,
            date:null
        },
        {
            id:2,
            date:null
        }
    ]
}


export default handleActions(
    {
        [CHANGE_DATE]: (state, action) => ({
            ...state,
            dateArray:state.dateArray.map(i=>(
                console.log(i),
                i.id === action.payload.id ? { ...i, date: action.payload.date} : i
            ))
        })
    },

    inialState
)
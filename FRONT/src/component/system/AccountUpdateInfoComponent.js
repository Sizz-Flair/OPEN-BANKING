import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

/* Validation error 메세지 */
const required = value => value 
? undefined 
: 'Required'

const RenderInput = ({
    type,
    input,
    errorMessage,
    meta:{ touched, error }
}) => {
    return (       
        <div className="col-4" >   
        <label>변경할 이름</label>                
            <input {...input} type={type}/>
            {touched && (error && <div className="input-feedback mt-0">{errorMessage}</div>)}   
         </div>
    )
}

const Select = ({
    data,
    errorMessage,
    input,
    meta:{ touched, error }
}) => {
    return (
        <div>
        <label>변경할 은행</label>   
        <select className="form-select" {...input}>
            <option value="none">은행 선택</option>
            {data.map(i=>(
                <option key={i.id} value={i.fintech_use_num}>{i.bank_name}</option>
            ))}
        </select>
        {touched && (error && <div className="input-feedback mt-0">{errorMessage}</div>)} 
        </div>  
    )

}

const AccountUpdatInfoComponent = ({
    handleSubmit
}) => {

    /* store에서 유저 정보 가져오기 */
    const userFintechNumInfo = useSelector((state)=>state.dashboard);

    /* 다국어 지원 */
    const{ t } = useTranslation();


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="row">
            <Field
            name="account_alias"
            component={RenderInput}
            validate={required}
            errorMessage={t('MSG_INFO_COMMON_001', {n:'이름'})}      
            /> 
            <Field
            name="fintech_use_num"
            component={Select}
            data={userFintechNumInfo.testInfo}  
            validate={required}
            errorMessage={t('MSG_INFO_COMMON_001', {n:'은행'})}        
            /> 
            </div>
            <div className="d-flex justify-content-end mb-3 pl-3 pr-3"> 
                <button className="btn btn-primary" type='submit'>조회</button>
            </div> 
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'AccountInfoForm'
})(AccountUpdatInfoComponent)
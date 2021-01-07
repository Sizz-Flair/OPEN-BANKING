import React, {useState} from "react";
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import TransferModal from '../util/TransferModal';
import "../system/common.css"

/* Validation error 메세지 */
const required = value => value 
? undefined 
: 'Required'

const RenderInput = ({
    input,
    label,
    errorMessage,
    meta:{ touched, error }
}) => {
    return(
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 input-group mb-3">
            <div className="layout">
                <span className="input-group-text">{label}</span>
            </div>
            <input className="form-control" {...input} />
            {touched && (error && <div className="col-12 input-feedback mt-0">{errorMessage}</div>)}  
        </div>
    )
}

const RenderSelect = ({
    input,
    options,
    errorMessage,
    label,
    meta:{ touched, error }
}) => {
    return (
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 input-group mb-3">
            <div className="layout">
                <span className="input-group-text">{label}</span>
            </div>
            <select className="col-8 form-select form-control" {...input}>
                <option />
                {options.map(i=>(
                    <option>{i}</option>
                ))}
            </select>
            {touched && (error && <div className="col-12 input-feedback mt-0">{errorMessage}</div>)}
        </div>
    )
}

const RenderSelectBank = ({
    input,
    options,
    errorMessage,
    label,
    meta:{ touched, error }
}) => {
    return (
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 input-group mb-3">
            <div className="layout">
                <span className="input-group-text">{label}</span>
            </div>
            <select className="col-8 form-select form-control" {...input}>
                <option />
                {options.map(i=>(
                    <option value={i.fintech_use_num}>{i.bank_name}</option>
                ))}
            </select>
            {touched && (error && <div className="col-12 input-feedback mt-0">{errorMessage}</div>)}
        </div>
    )
}
  
  
const TransferDepositComponent = ({
    handleSubmit,
    transferReqInfo,
    trnsgerReqInfoResList,
    modalVisible,
    modalStatus
}) => {

    const userFintechNumInfo = useSelector((state)=>state.dashboard);
    const { t } = useTranslation();

    return (
        <div className="col-12 Transfer contentbody">
            <div className="contenthead m-3">
                <h1 className="text-initial">입금이체</h1>
            </div>
            <TransferModal 
            visible={modalVisible}
            modalStatus={modalStatus}
            transferReqInfo={transferReqInfo}
            trnsgerReqInfoResList={trnsgerReqInfoResList}
            />
            <form onSubmit={handleSubmit}>
            <div className="contentinner">
            <Field
            component={RenderSelect} 
            name="cntr_account_type"
            label={t("LABEL_ACCOUNT_TYPE")}
            validate={required}
            options={[
                'Y',
                'N'
            ]}
            errorMessage={t("MSG_INFO_COMMON_006",{n:t("LABEL_ACCOUNT_TYPE")})}
            /> 
            <Field
            component={RenderSelectBank}
            name="fintech_use_num"
            label={t("LABEL_BANK")+t("LABEL_CHOICE")}
            validate={required}
            options={userFintechNumInfo.testInfo}
            errorMessage={t("MSG_INFO_COMMON_006",{n:t("LABEL_BANK")})}
            />       
            <Field
            name="name_check_option"
            label={t("LABEL_NAME_CHECK_OPTION")}
            component={RenderSelect} 
            validate={required}
            options={[
                'on',
                'off'
            ]}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_NAME_CHECK_OPTION")})}
            />                      
            <Field component={RenderInput}
            name="cntr_account_num"
            label={t("LABEL_ACCOUT_NUM")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_ACCOUT_NUM")})}
             />
            <Field component={RenderInput}
            name="wd_pass_phrase"
            label={t("LABEL_PASS_PHRASE")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_PASS_PHRASE")})}
             />
            <Field component={RenderInput}
            name="wd_print_content"
            label={t("LABEL_WB_PRINT_CONTENT")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_WB_PRINT_CONTENT")})}
             />
            <Field component={RenderInput}
            name="sub_frnc_name"
            label={t("LABEL_FRNC")}
             />
            <Field component={RenderInput}
            name="sub_frnc_num"
            label={t("LABEL_FRNC_NUM")}
             />         
            <Field component={RenderInput}
            name="sub_frnc_business_num"
            label={t("LABEL_BUSINESS_NIM")}
             />                
            <Field component={RenderInput}
            name="req_cnt"
            label={t("LABEL_REQ_CNT")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_REQ_CNT")})}
             />    
            <Field component={RenderInput}
            name="tran_no"
            label={t("LABEL_TRAN_NO")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_TRAN_NO")})}
             />       
            <Field component={RenderInput}
            name="print_content"
            label={t("LABEL_PRINT_CONTENT")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_PRINT_CONTENT")})}
             />  
            <Field component={RenderInput}
            name="tran_amt"
            label={t("LABEL_TRAN_AMT")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_TRAN_AMT")})}
             />   
            <Field component={RenderInput}
            name="req_client_name"
            label={t("LABEL_REQ_CLIENT_NAME")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_REQ_CLIENT_NAME")})}
             />    
            <Field component={RenderInput}
            name="req_client_bank_code"
            label={t("LABEL_CLIENT_BANK_CODE")}
             />         
            <Field component={RenderInput}
            name="req_client_account_num"
            label={t("LABEL_CLIENT_ACCOUNT_NUM")}
             />             
            <Field component={RenderInput}
            name="req_client_num"
            label={t("LABEL_CLIENT_NUM")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_CLIENT_NUM")})}
             />               
            <Field component={RenderInput}
            name="transfer_purpose"
            label={t("LABEL_TRANSFER_PUROSE")}
            validate={required}
            errorMessage={t("MSG_INFO_COMMON_001",{n:t("LABEL_TRANSFER_PUROSE")})}
             />  
            <Field component={RenderInput}
            name="cms_num"
            label={t("LABEL_CMS_NUM")}
             />              
            <div className="col-12 mb-3 contentfoot"> 
                <button className="btn btn-primary mt-3" type='submit'>조회</button>
            </div>    
            </div>          
             </form>                                                                                                                                                                      
        </div>
    )
}
export default reduxForm({
    form: 'TransferForm'
})(TransferDepositComponent)
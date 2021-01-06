import React from "react";
import { Field, FieldArray, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';

const RenderInput = ({
    input,
    initVlue,
    labelName

}) => {
    return(
        <div className="col-3">
            <label>{labelName}</label>
            <input {...input} value={initVlue}/>
        </div>
    )
}
  
const TransferDepositComponent = ({
    handleSubmit
}) => {

    const userFintechNumInfo = useSelector((state)=>state.dashboard);

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="row">
            <Field
            name="cntr_account_type"
            component="select"    
            > 
            <option value="Y">Y</option>
            <option value="N">N</option>
            </Field>
            <Field component={RenderInput}
            name="cntr_account_num"
            labelName="cntr_account_num"
            initVlue="1539337380" 
             />
            <Field component={RenderInput}
            name="wd_pass_phrase"
            labelName="wd_pass_phrase"
            initVlue="NONE"
             />
            <Field component={RenderInput}
            name="wd_print_content"
            labelName="wd_print_content"
            initVlue="환불금액"
             />
            <Field
            name="name_check_option"
            component="select"     
            > 
            <option value="on">on</option>
            <option value="off">off</option>
            </Field>       
            <Field component={RenderInput}
            name="sub_frnc_name"
            labelName="sub_frnc_name"
            initVlue="하위가맹점"
             />
            <Field component={RenderInput}
            name="sub_frnc_num"
            labelName="sub_frnc_num"
            initVlue="123456789012"
             />         
            <Field component={RenderInput}
            name="sub_frnc_business_num"
            labelName="sub_frnc_business_num"
            initVlue="1234567890"
             />           
            <Field component={RenderInput}
            name="tran_dtime"
            labelName="tran_dtime"
            initVlue="20200722093752"
             />       
            <Field component={RenderInput}
            name="req_cnt"
            labelName="req_cnt"
            initVlue="1"
             />    
            <Field component={RenderInput}
            name="tran_no"
            labelName="tran_no"
            initVlue="1"
             />     
            <Field component={RenderInput}
            name="bank_tran_id"
            labelName="bank_tran_id"
            initVlue="T991637660U231035225"
             />  
            <Field component={RenderInput}
            name="fintech_use_num"
            labelName="fintech_use_num"
            initVlue="199163766057884728492112"
             />     
            <Field component="select">
                {userFintechNumInfo.testInfo.map(i=>(
                    <option value="i.fintech_use_num">{i.bank_name}</option>
                ))
                }
            </Field>        
            <Field component={RenderInput}
            name="print_content"
            labelName="print_content"
            initVlue="쇼핑몰환불"
             />  
            <Field component={RenderInput}
            name="tran_amt"
            labelName="tran_amt"
            initVlue="500"
             />   
            <Field component={RenderInput}
            name="req_client_name"
            labelName="req_client_name"
            initVlue="홍길동"
             />    
            <Field component={RenderInput}
            name="req_client_bank_code"
            labelName="req_client_bank_code"
            initVlue="097"
             />         
            <Field component={RenderInput}
            name="req_client_account_num"
            labelName="req_client_account_num"
            initVlue="219999999999"
             />             
            <Field component={RenderInput}
            name="req_client_num"
            labelName="req_client_num"
            initVlue="HONGGILDONG1234"
             />               
            <Field component={RenderInput}
            name="transfer_purpose"
            labelName="transfer_purpose"
            initVlue="TR"
             />  
            <Field component={RenderInput}
            name="cms_num"
            labelName="cms_num"
            initVlue="93848103221"
             />              
            <div className="d-flex justify-content-end mb-3 pl-3 pr-3"> 
                <button className="btn btn-primary" type='submit'>조회</button>
            </div>    
            </div>          
             </form>                                                                                                                                                                      
        </div>
    )
}
export default reduxForm({
    form: 'TransferForm'
})(TransferDepositComponent)
import React, {useState, useRef} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { useTranslation } from 'react-i18next'
import { Field, reduxForm } from 'redux-form';
import * as dateFns from "date-fns";
import { useSelector } from 'react-redux';
import Table from '../system/PagingComponent2'
import '../system/datePicker.css';
import '../system/common.css';

/* Validation error 메세지 */
const required = value => value 
? undefined 
: 'Required'

const DropDownMenu = ({
    setDropDownActive,
    setDropDownActive_click,
    dropDownActive,
    selectType,
    data,
    keyId,
    value,
    valueName,
    refFocus,
    name
}) => {
    /* 메뉴 드롭다운 상태체크(true/false) */
    let dropDownClassName = 
    dropDownActive 
    ? "dropdown-menu show p-0" 
    : "dropdown-menu p-0"
    return (
        <div 
        className={dropDownClassName}
        onMouseLeave={() => {setDropDownActive_click(true)}}
        onMouseOut={() => {setDropDownActive_click(false)}}
        >
            {data.map(i => (                
                <button
                key={i[keyId]}
                className="dropdown-item p-0 text-center" 
                name={name}
                type="button"
                value={i[value]}
                onClick={e=>{
                        refFocus(); 
                        selectType(e);
                        setDropDownActive(false);}} // 버튼 클릭시 해당 input포커스와 동시에 데이터 변경
                >
                    {i[valueName]}
                </button>
            ))}
        </div>
    )
}

const RenderInput = ({
    type,
    input,
    data,
    refFocus,
    errorMessage,
    meta:{ touched, error }
}) => {
    return (       
        <div>                   
            <button 
            {...input}
            className="input-group-text date-hidden "
            placeholder={""}         
            type={type}
            value={data}
            ref={refFocus}
            ></button>  
            {touched && (error && <div className="input-feedback mt-0">{errorMessage}</div>)}   
         </div>
    )
}

const RenderButton = ({
    input,
    data,
    refFocus,
    accountInquiryType,
    setDropDownActive,
    errorMessage,
    meta:{ touched, error }
}) => {
    return (

        <div className="col-12">
        <button 
        {...input}            
        className="col-12 btn btn-primary dropdown-toggle"
        placeholder={""}         
        type='button'
        value={data}
        ref={refFocus}
        onClick={() => {setDropDownActive(true)}}
        >
            {
            accountInquiryType == 'A' && '모든계좌' ||
            accountInquiryType == 'I' && '입금' ||
            accountInquiryType == 'O' && '출금' ||
            accountInquiryType
            }          
        </button>
        {touched && (error && <div className="input-feedback mt-0">{errorMessage}</div>)}  
        </div>
    )
}

const TransInfoList = ({
    tran_date,
    tran_time,
    inout_type,
    tran_type,
}) => {
    return(
        <tr>
            <th>{tran_date}</th>
            <th>{tran_time}</th>
            <th>{inout_type}</th>
            <th>{tran_type}</th>
        </tr>
    );
}

const TranscationListComponent = ({
    selectType,
    accountInquiryType,
    accountBankName,
    handleSubmit,
    accountType,
    transInfoList
}) => {

    const createTable = transInfoList.map((i, index) => (
        <TransInfoList
        key={index}
        tran_date={i.tran_date}
        tran_time={i.tran_time}
        inout_type={i.inout_type}
        tran_type={i.tran_type}
        print_content={i.print_content}
        tran_amt={i.tran_amt}
        after_balance_amt={i.after_balance_amt}
        branch_name={i.branch_name}
        />
    ))

    /* 다국어 지원 */
    const { t } = useTranslation();
    const[dropDownActive_1, setDropDownActive_1] = useState(false);
    const[dropDownActive_2, setDropDownActive_2] = useState(false);

    const[dropDownActive_click, setDropDownActive_click] = useState(false);

    const[startData, setStartDate] = useState();
    const[endData, setEndDate] = useState();

    const inputRef_1 = useRef(null);
    const onClickEvent_1 = () => inputRef_1.current.focus();

    const inputRef_2 = useRef(null);
    const onClickEvent_2 = () => inputRef_2.current.focus();

    const startDateRef = useRef(null);
    const startDateClickEv = () => startDateRef.current.focus();

    const endDateRef = useRef(null);
    const endDateClickEv = () => endDateRef.current.focus();

    const userFintechNumInfo = useSelector((state)=>state.dashboard);

    /* datePicker 한글 적용 */
    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
            <article className="col-sm-12 col-md-12 col-lg-12 col-xl-12 contentbody">
            <div className="col-12 col-md-12 col-lg-12 col-xl-12 border-bottom mb-3">
                <h3 className="text-left">거래내역 조회</h3>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="btn-group dropright col-6 mb-3">
            <Field
                name="inquiry_type"
                component={RenderButton}
                data={
                    accountInquiryType=='조회 종류'
                    ?''
                    :accountInquiryType}
                type=""   
                refFocus={inputRef_1}
                validate={required} 
                accountInquiryType={accountInquiryType}   
                setDropDownActive={setDropDownActive_1}    
                dropDownActive_click={dropDownActive_click}  
                onBlur={() => {
                    if(dropDownActive_click) {
                        setDropDownActive_1(false)}
                    }
                }
                errorMessage="타입을 선택해 주세요"        
                />    

                <DropDownMenu
                selectType={selectType}
                dropDownActive={dropDownActive_1}
                setDropDownActive_click={setDropDownActive_click}   
                data={accountType}
                keyId="id"
                value="type"
                valueName="name"  
                name="accountInquiryType"
                refFocus={()=>{onClickEvent_1()}} 
                setDropDownActive={setDropDownActive_1}
                />
            </div>
            <div className="btn-group dropright col-6 mb-3">
            <Field
                name="fintech_use_num"
                component={RenderButton}
                data={
                    accountBankName=='은행 이름'
                    ?''
                    :accountBankName}
                type=""   
                refFocus={inputRef_2}     
                accountInquiryType={accountBankName}   
                setDropDownActive={setDropDownActive_2}    
                dropDownActive_click={dropDownActive_click}  
                onBlur={() => {
                    if(dropDownActive_click) {
                        setDropDownActive_2(false)}
                    }
                }     
                validate={required}
                errorMessage="은행을 선택해 주세요"
                />   
                <DropDownMenu
                selectType={selectType}
                dropDownActive={dropDownActive_2}
                setDropDownActive_click={setDropDownActive_click}   
                data={userFintechNumInfo.testInfo}
                keyId="id"
                value="fintech_use_num"
                valueName="bank_name"  
                name="accountBankName"
                refFocus={()=>{onClickEvent_2()}} 
                setDropDownActive={setDropDownActive_2}          
                />
            </div>
            <div className="row p-3">
            <div className="col-6 mb-3">        
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3 border-bottom">
                    <div className="input-group mb-3">
                    <span className="input-group-text">시작일자</span>
                        <DatePicker 
                        selected={startData}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date)=>{startDateClickEv(); setStartDate(new Date(date))}}
                        placeholderText="일자"
                        />
                        <Field
                        name="from_date"
                        component={RenderInput}
                        data={
                            startData==null
                            ?''
                            :dateFns.format(startData, "yyyyMMdd")
                        }
                        type="hidden"  
                        refFocus={startDateRef}   
                        validate={required} 
                        errorMessage="날짜를 선택해주세요"           
                        /> 
                    </div>
                </div> 
            </div>
            <div className="col-6 mb-3">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3 border-bottom">
                    <div className="input-group mb-3">
                    <span className="input-group-text">종료일자</span>
                        <DatePicker 
                        selected={endData}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date)=>{endDateClickEv(); setEndDate(new Date(date))}}
                        minDate ={startData}
                        placeholderText="일자"
                        />
                        <Field
                        name="to_date"
                        component={RenderInput}
                        data={
                            endData==null
                            ?''
                            :dateFns.format(endData, 'yyyyMMdd')
                        }
                        type="hidden"
                        refFocus={endDateRef}     
                        validate={required}  
                        errorMessage="날짜를 선택해주세요"                  
                        />  
                    </div>
                </div>
            </div>
            </div>
            <div className="d-flex justify-content-end mb-3 pl-3 pr-3"> 
                <button className="btn btn-primary" type='submit'>조회</button>
            </div>
            </form>                  
            </article>
            <article className="col-sm-12 col-md-12 col-lg-12 col-xl-12 contentbody">
                <Table
                arrayThead = {[                  
                    '거래후 잔액',
                    '분당점',
                    '입금',
                    '통장인자내용',
                    '거래금액',
                    '거래일자',
                    '거래시간',
                    '거래구분'
                ]} 
                arrayTheadName = {[
                    'after_balance_amt',
                    'branch_name',
                    'inout_type',
                    'print_content',
                    'tran_amt',
                    'tran_date',
                    'tran_time',
                    'tran_type'
                ]}
                arrayTbody = {transInfoList}
                />
            </article>
            </div>       
    )
}
export default reduxForm({
    form: 'TranscationForm'
})(TranscationListComponent)
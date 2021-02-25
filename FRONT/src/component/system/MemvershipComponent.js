import React, { useEffect, useRef } from 'react';
import '../system/common.css';
import { Field, reduxForm } from 'redux-form';
import PostComponent from './PostComponent';
import { useTranslation } from 'react-i18next'

/* Validation error 메세지 */
const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
  value && value.length > max ? `max${max}` : undefined

const minLength = min => value =>
    value && value.length < min ? `min${min}` : undefined

const idValid = value =>
    value && !/^[a-z0-9+]*$/i.test(value) ?
    'idValid' : undefined

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'email' : undefined

const maxLength32 = maxLength(32);
const maxLength10 = maxLength(10);
const minLength8 = minLength(8);
const minLength2 = minLength(2);
const minLength1 = minLength(1);

const RenderInput = ({
    input,
    placeholder,
    errorMessage,
    button,
    label,
    type,
    infoMessage,
    onClick,
    errorId,
    meta:{ touched, error }
}) => {

    const { t } = useTranslation();

    switch(error) {
        /* ID */
        case 'Required': errorMessage = t('MSG_INFO_COMMON_001', {n:errorId}); break
        case 'idValid': errorMessage = t('MSG_INFO_COMMON_004', {n:"영문소문자 숫자만"}); break
        case 'min5': errorMessage = t('MSG_INFO_COMMON_002', {n:'1'}); break
        case 'min8': errorMessage = t('MSG_INFO_COMMON_002', {n:'8'}); break
        case 'min2': errorMessage = t('MSG_INFO_COMMON_002', {n:'2'}); break
        case 'max10': errorMessage = t('MSG_INFO_COMMON_003', {n:"10"}); break
        case 'max32': errorMessage = t('MSG_INFO_COMMON_003', {n:"36"}); break  
    }
    return(
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {label != null &&
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-inline-flex label-box">
                    <b className="label">{label}</b>
                </div>
            }
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-inline-flex text-center">
                <input className="border-line-none" {...input} placeholder={placeholder} type={type}/>
                {button && <button className="btn btn-primary col-3" type="button" onClick={onClick}><b className="btn-b">중복확인</b></button>}
            </div>
            {touched && (error && <div className="col-10 mt-3 input-feedback mt-0 d-inline-flex">{errorMessage}</div>)}  
            {infoMessage != null &&
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-inline-flex text-center">
                    <div className="">
                        <b className="info">{infoMessage}</b>
                    </div>
                </div>
            }
        </div>
    )
}
const RenderInputAddr = ({
    input,
    placeholder,
    errorMessage,
    label,
    addrInfo,
    addressBtn,
    addressOpen,
    addrInfoData,
    testref,
    meta:{ touched, error }
}) => {
    const { t } = useTranslation();
    switch(error) {
        /* ID */
        case 'Required': errorMessage = t('MSG_INFO_COMMON_001', {n:'주소'}); break
        case 'email': errorMessage = t('MSG_INFO_COMMON_005', {n:"email"}); break
        case 'min8': errorMessage = t('MSG_INFO_COMMON_002', {n:'8'}); break
        case 'max32': errorMessage = t('MSG_INFO_COMMON_003', {n:"36"}); break  
    }
    return(
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {label != null &&
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-inline-flex label-box">
                    <b className="label">{label}</b>
                </div>
            }
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-inline-flex text-center">
                <input className="border-line-none" {...input} placeholder={placeholder} value={addrInfo} ref={testref}/>
                <PostComponent
                addressBtn={addressBtn} 
                addressOpen={addressOpen}
                addrInfo={addrInfoData}
                /> 
            </div>
            {touched && (error && <div className="col-10 mt-3 input-feedback mt-0 d-inline-flex">{errorMessage}</div>)} 
        </div>
    )
}

const MembershipComponent = ({
    addrInfo,
    handleSubmit,
    addressBtn,
    addressOpen,
    addrInfoData,
    testref,
    onClick,
}) => {
    return (
        <div className="membership container container-sm container-md container-lg container-xl mt-5 mb-5 text-center">
            <h1 className="title">OPEN-BANK</h1>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 border d-inline-block">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-inline-flex label-box">
                <h5>오픈뱅크계정 정보를 입력해주세요</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <Field
                    name="memberId"
                    component={RenderInput}
                    placeholder="아이디 입력"
                    type=""   
                    validate={[required, minLength2, idValid, maxLength10]} 
                    errorId="ID"
                    errorMessage=""   
                    label="오픈뱅크 아이디"
                    button={true}    
                    onClick={onClick}
                    infoMessage="* 영문 소문자 또는 숫자 조합만 가능합니다." 
                    /> 
                    <Field
                    name="memberPassword"
                    component={RenderInput}
                    placeholder="비밀번호(8~32자리)"
                    type="password"   
                    validate={[required, minLength8, maxLength32]} 
                    label={"비밀번호"}
                    errorMessage=""     
                    errorId="비밀번호"   
                    /> 
                    <Field
                    name="reMemberPassword"
                    component={RenderInput}
                    placeholder="비밀번호 재입력"
                    type="password"   
                    validate={[required, minLength8, maxLength32]} 
                    errorMessage=""    
                    errorId="비밀번호"    
                    /> 
                    <Field
                    name="userName"
                    component={RenderInput}
                    placeholder="이름"
                    type=""   
                    validate={[required, minLength1, maxLength10]} 
                    label={"이름"}
                    errorMessage=""    
                    errorId="이름"    
                    /> 
                    <Field
                    name="phoneNum"
                    component={RenderInput}
                    placeholder="전화번호"
                    type=""   
                    validate={[required, minLength1, maxLength32]} 
                    label={"전화번호"}
                    errorMessage=""    
                    errorId="전화번호"    
                    /> 
                    <Field
                    name="email"
                    component={RenderInput}
                    placeholder="이메일"
                    type=""   
                    validate={[email, required]} 
                    label={"이메일"}
                    errorMessage="이메일 양식이 아닙니다"     
                    errorId="이메일"   
                    />
                    <Field
                    name="addrInfo"
                    component={RenderInputAddr}
                    placeholder="주소"
                    type=""   
                    validate={[required, minLength8, maxLength32]} 
                    label={"주소"}
                    errorMessage=""  
                    post={true}      
                    addrInfo={addrInfo}
                    addressBtn={addressBtn}
                    addressOpen={addressOpen}
                    addrInfoData={addrInfoData}     
                    testref={testref}
                    errorId="주소"
                    /> 
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-inline-flex text-center">
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <button className="btn btn-primary member-btn">회원가입</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default reduxForm({
    form: 'MemberForm'
})(MembershipComponent)
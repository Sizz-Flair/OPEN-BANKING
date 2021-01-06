import React from 'react';
import * as yup from 'yup'
import { Formik } from 'formik';
import './common.css';
import { useTranslation } from 'react-i18next'
import PostComponent from '../system/PostComponent';

/* 가입정보 정규식 */
function ValidationSchema() {
  
  const { t } = useTranslation()

  const validationSchema = yup.object ({
    memberId: yup.string()
    .required(t('MSG_INFO_COMMON_001', {n:'ID'}))
    .min(5,t('MSG_INFO_COMMON_002', {n:"5"}))
    .max(20, t('MSG_INFO_COMMON_003', {n:"20"}))
    .matches( /^[a-z0-9+]*$/,t('MSG_INFO_COMMON_004', {n:"영문소문자 숫자만"})),

    memberPassword: yup.string().required(t('MSG_INFO_COMMON_001', {n:"비밀번호"}))
    .min(6,t('MSG_INFO_COMMON_002', {n:"6"}))
    .max(12,t('MSG_INFO_COMMON_003', {n:"12"})),

    userName: yup.string().required(t('MSG_INFO_COMMON_001', {n:"이름"}))
    .min(1,t('MSG_INFO_COMMON_002', {n:"1"}))
    .max(10,t('MSG_INFO_COMMON_003', {n:"10"})),

    email: yup.string()
    .email(t('MSG_INFO_COMMON_005', {n:"이메일"}))
    .required(t('MSG_INFO_COMMON_001', {n:"비밀번호"}))
    .min(8,t('MSG_INFO_COMMON_002', {n:"8"}))
    .max(20,t('MSG_INFO_COMMON_003', {n:"20"})),

    phoneNum: yup.string(),


    addrInfo: yup.string()
    .required(t('MSG_INFO_COMMON_001', {n:"주소"}))
  });
  return validationSchema;
}

const MembershipComponent = ({
    memberId,
    memberPassword,
    userName,
    email,
    phoneNum,
    addrInfo,
    onSubmit,
    onchange,
    onClick,
    submitCheck,
    addressBtn,
    addressOpen,
    addrInfoData,
}) => (      
<Formik 
  validationSchema={ValidationSchema()} //Formik validation
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Logging in", values);
      onSubmit(values);
      setSubmitting(false);
    }, 500);
  }}
  initialValues={{
    memberId,
    memberPassword,
    userName,
    email,
    phoneNum,
    addrInfo
  }}
>
  {props => {
    const {
      values,
      handleChange,
      handleBlur,
      isSubmitting,
      isValidating,
      handleSubmit,
      touched,
      errors,
    } = props;   

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">  
        <form className="form" onSubmit={handleSubmit}>
          <h4><span className="badge badge-light">ID</span></h4>
          <div className="input-group mb-3">
            <input 
            className="col-md-6" 
            name="memberId" 
            value={values.memberId} 
            placeholder="ID" 
            onChange={handleChange}
            onBlur={handleBlur}
            />
          <button className="btn btn-primary" type="button" onClick={onClick}>중복확인</button>
          </div>
          {errors.memberId && touched.memberId && (
            <div className="input-feedback">{errors.memberId}</div>
          )}
          <h4><span className="badge badge-light">PASSWORD</span></h4>
          <div className="input-group mb-3">
            <input 
            className="col-md-6" 
            name="memberPassword" 
            value={values.memberPassword} 
            placeholder="PASSWORD" 
            type="PASSWORD" 
            onChange={handleChange} 
            onBlur={handleBlur}
            />
          </div>
          {errors.memberPassword && touched.memberPassword && (
            <div className="input-feedback">{errors.memberPassword}</div>
          )}
          <h4><span className="badge badge-light">NAME</span></h4>
          <div className="input-group mb-3">
           <input 
           className="col-md-6" 
           name="userName" 
           value={values.userName} 
           placeholder="NAME" 
           onChange={handleChange} 
           onBlur={handleBlur}
           />
          </div>
          {errors.userName && touched.userName && (
            <div className="input-feedback">{errors.userName}</div>
          )}                   
          <h4><span className="badge badge-light">E-MAIL</span></h4>
          <div className="input-group mb-3">
            <input 
            name="email" 
            value={values.email} 
            placeholder="E-MAIL"  
            onChange={handleChange} 
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
            />
          </div>
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}
          <h4><span className="badge badge-light">PHONE NUMBER</span></h4>
          <div className="input-group mb-3">
            <input 
            name="phoneNum" 
            value={values.phoneNum} 
            placeholder="POHNE-NUMBER" 
            onChange={handleChange} 
            onBlur={handleBlur}
            />
          </div>
          {errors.phoneNum && touched.phoneNum && (
            <div className="input-feedback">{errors.phoneNum}</div>
          )}
          <h4><span className="badge badge-light">ADDRES</span></h4>
          <div className="input-group mb-3">
            <input 
            name="addrInfo" 
            value={ values.addrInfo = addrInfo } 
            placeholder="ADDRESS" 
            onBlur={handleBlur}
            />
            <PostComponent
            addressBtn={addressBtn} 
            addressOpen={addressOpen}
            addrInfo={addrInfoData}
            />
          </div>
          {errors.addrInfo && touched.addrInfo && (
            <div className="input-feedback">{errors.addrInfo}</div>
          )}
          <button className="btn btn-primary mr-2" type="submit">가입하기</button>
        </form>
    </div>
    );
  }}
  </Formik>
  );
export default MembershipComponent;
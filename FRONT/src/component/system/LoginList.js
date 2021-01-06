import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';
import { useTranslation } from 'react-i18next'

/* Validation error 메세지 */
const requiredId = value => value ? undefined : 'RequiredId';
const requiredPw = value => value ? undefined : 'RequiredPw';
const maxLength = max => value =>
  value && value.length > max ? `max${max}` : undefined
const minValue = min => value =>
    value && value < min ? `min${min}` : undefined
const idValid = value =>
    value && !/^[a-z0-9+]*$/i.test(value) ?
    'idValid' : undefined

const maxLength20 = maxLength(20);
const minLength1 = minValue(1);

/* Field Component Render */
const RenderField = ({ 
    input,
    label,
    type,
    meta:{ touched, error, warning 
    }}) => {
    const { t } = useTranslation();

    /* 다국어 지원을 위한 error메시지 변경 */
    switch(error) {
        /* ID */
        case "RequiredId": error = t('MSG_INFO_COMMON_001', {n:'ID'}); break
        case "idValid": error = t('MSG_INFO_COMMON_004', {n:"영문소문자 숫자만"}); break
        case 'min1': error = t('MSG_INFO_COMMON_002', {n:'1'}); break
        case `max20`: error = t('MSG_INFO_COMMON_003', {n:"20"}); break

        /* PW */
        case "RequiredPw": error = t('MSG_INFO_COMMON_001', {n:'PASSWORD'}); break       
    }

    return (
        <div className="input-group mb-5">
            <div className="input-group-prepend">
                <span className="input-group-text">{label}</span>
            </div>
            <input className="col-12" {...input} placeholder={label} type={type} />
            {touched && (error && <div className="input-feedback mt-0">{error}</div>)}
        </div>
    )
}

const LoginComponent = ({
    handleSubmit,
    movePage,
}) => {
    const { t } = useTranslation();
    return (
        <div className="container mt-5">
            <div className="col-6">
                <h1 className="align-self-center border">LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                    <Field 
                    name="userId" 
                    component={RenderField}
                    label="ID" 
                    type="text"
                    validate={[requiredId, minLength1, maxLength20, idValid]}
                    />
                    </div>
                    <div>
                    <Field 
                    name="userPw" 
                    component={RenderField}
                    label="PASSWORD" 
                    type="PASSWORD"
                    validate={requiredPw}
                    />
                    </div>
                    <div className="btn-group">
                    <button className="btn btn-primary" type="submit">Submit</button>
                    <button className="btn btn-primary" onClick={movePage}>회원가입</button>
                    </div>
                </form>        
            </div>
        </div>
    );
}

export default reduxForm({
    form:'LoginForm'
})(LoginComponent)

/*
const LoginList = ({
    userId, 
    userPassword,
    onSubmit,
    onChange,
}) => {
    return (
        <div className="container">
            <div className="col-12">
                <h1 className="row justify-content-md-center">LOGIN</h1>
                <form onSubmit={onSubmit}>
                    <div className="input-group mb-5">
                        <div className="input-group-prepend">
                            <span className="input-group-text">ID</span>
                        </div>
                        <input 
                        value={userId} 
                        onChange={onChange} 
                        name="userId"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">PASSWORD</span>
                        </div>
                    <input 
                    value={userPassword} 
                    onChange={onChange} 
                    name="userPassword" 
                    type="password"
                    />
                    </div>
                    <button type="button" class="btn btn-primary">login</button>
                </form>   
            </div>
        </div>
    )
}

export default LoginList;
*/

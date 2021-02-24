import React from 'react';
import { Field, reduxForm } from 'redux-form';

const RenderFieldHidden = () => {

    const url = window.location.href;
    console.log(url);

    /* 사용자 인증으로 받은 code 값 분리 */
    let queryString = url.substring(url.indexOf('?')+1);

    let subArr = queryString.split('&');
    console.log("subArr=>>>>" + subArr);
    const code = subArr[0].substring(subArr[0].indexOf('=')+1);

    return code;
}

const AuthorizeComponent = ({
    tokenIssuance,
}) => {
    return (
        <div className="container mt-0 text-center">
            {console.log(window.location.href)}
            <div className="from-group">
            <form className="m-0" action="https://nid.naver.com/oauth2.0/authorize" target="_self">
                <div>
                <Field 
                name="response_type" 
                component="input"
                label="" 
                type="hidden"
                />
                </div>
                <div>
                <Field 
                name="client_id" 
                component="input"
                label="" 
                type="hidden"              
                />
                <Field 
                name="redirect_uri" 
                component="input"
                label="" 
                type="hidden"               
                />
                <Field 
                name="state" 
                component="input"
                label="" 
                type="hidden"               
                />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3 d-inline-block">
                    <button className="col-12 n-button" type="submit"><img src={require('../../img/Logo.png')} height="38px"/> 네이버 아이디로 로그인</button>
                </div>
            </form> 
            </div>
        </div>

    )
}

/* Test모드시 오픈뱅킹 ID대신 TEST본인 인증으로 CODE 발급 */
export default reduxForm({
    form:'AuthorizeForm',
    /* 기본 값 셋팅 */
    initialValues: {
        response_type:"code",
        client_id: "1MfixpmMddZrtU_n1SbF",
        redirect_uri:"http://localhost:3000/",
        state:"STATE_STRING",
    }
})(AuthorizeComponent)
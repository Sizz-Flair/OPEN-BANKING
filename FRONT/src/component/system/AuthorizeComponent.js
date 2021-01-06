import { getQueriesForElement } from '@testing-library/react';
import { Form } from 'formik';
import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';

const RenderField = ({ input, value, label, type, meta:{ touched, error, warning }}) => {

    return (
        <div className="input-group fles-nowrap">
            <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">@</span>
            </div>
            <input className="form-control" placeholder={label} type={type} />
        </div>
    )
}

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

const addData = (name, value) => {

    let elem = document.createElement('input');
    elem.setAttribute('type','hidden')
    elem.setAttribute('name', name);
    elem.setAttribute('value',value);

    return elem;
}

const authForm = () => {
    console.log("ayth")

    const f = document.createElement('form');
    document.body.appendChild(f);

    f.action ='https://testapi.openbanking.or.kr/oauth/2.0/authorize';
    f.method='get';
    f.target='blank';
    f.appendChild(addData('client_id','5BNCrTASDTzMLtfZrbsX60XBD1h1SPypvIcY9Hbn'));
    f.appendChild(addData('client_secret','rN36u2fFU1UNQ5W7OZizwC2oANW5b5c69nBT6NWf'));
    f.appendChild(addData('response_type','code'));
    f.appendChild(addData('scope','inquiry login transfer'));
    f.appendChild(addData('redirect_uri','http://localhost:3000/index/dashbord'));
    f.appendChild(addData('state','12345678901234567890123456789013'));

    f.submit();

    return f;
}

const AuthorizeComponent = ({
    tokenIssuance,

}) => {

    {tokenIssuance(RenderFieldHidden())}
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="from-group">
            <form className="m-0" action="https://testapi.openbanking.or.kr/oauth/2.0/authorize" target="blank">
                <div>
                <Field 
                name="client_id" 
                component="input"
                label="" 
                type="hidden"
                />
                </div>
                <div>
                <Field 
                name="client_secret" 
                component="input"
                label="" 
                type="hidden"              
                />
                <Field 
                name="response_type" 
                component="input"
                label="" 
                type="hidden"               
                />
                <Field 
                name="scope" 
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
                <div className="col-12 mb-3">
                    <button className="btn btn-primary" type="submit">사용자 인증</button>
                    <div className="col-12 row">
                        <b>Test를 위한 사용자 인증(상용에서 사용 시 오픈뱅킹 로그인으로 code발급)</b>
                    </div>

                </div>
            </form> 
            </div>
        </div>

    )
}

/* Test모드시 오픈뱅킹 ID대신 TEST본인 인증으로 CODE 발급 */
export default reduxForm({
    form:'AuthorizeForm',
    initialValues: {
        client_id:"5BNCrTASDTzMLtfZrbsX60XBD1h1SPypvIcY9Hbn",
        client_secret: "rN36u2fFU1UNQ5W7OZizwC2oANW5b5c69nBT6NWf",
        response_type:"code",
        scope:"inquiry login transfer",
        redirect_uri:"http://localhost:3000/index/userinfo",
        state:"12345678901234567890123456789013"
    }
})(AuthorizeComponent)
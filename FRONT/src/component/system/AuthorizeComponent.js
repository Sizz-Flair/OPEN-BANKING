import React from 'react';


const AuthorizeComponent = ({
    bankAuth,
    authClick
}) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-3">
            <div className="from-group">
            <form className="m-0" action="https://testapi.openbanking.or.kr/oauth/2.0/authorize" target="_self">
                <div>
                    <input name="client_id" value={bankAuth.CLIENT_ID || ''} type="hidden"/>
                    <input name="client_secret" value={bankAuth.CLIENT_SECRET || ''} type="hidden" />
                    <input name="response_type" value={bankAuth.RESPONSE_TYPE || ''} type="hidden" />
                    <input name="scope" value={bankAuth.SCOPE || ''} type="hidden" />
                    <input name="redirect_uri" value={bankAuth.RE_URI || ''} type="hidden" />
                    <input name="state" value={bankAuth.STATE || ''} type="hidden" />
                </div>
                <div className="col-12 mb-3">
                    <button className="btn btn-primary" type="submit" onClick={authClick}>사용자 인증</button>
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
export default AuthorizeComponent
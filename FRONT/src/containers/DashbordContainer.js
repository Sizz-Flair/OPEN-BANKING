import { da } from 'date-fns/locale';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ApiService from '../ApiService';
import AuthorizeComponent from '../component/system/AuthorizeComponent';
import UserInfoListComponent from '../component/system/UserInfoComponent';
import * as dashAction from '../store/modules/dashboard';

class DashbordContainer extends Component {

    componentDidMount() {
        const { history, DashAction, cookies, authClick } = this.props;

        /* SESSION CHECK */
        ApiService.loginSessionCheck(history).then(res=>{
            if(res === "SESSION_OUT") {
                alert("SESSION_OUT");
                history.push("/");
            }
        })

        /* 사용자 인증 정보 확인 */
        ApiService.bankAuthInfo().then(res=>{
            DashAction.bankAuth(res);

            /* 토큰발급 */
            if(!cookies.get("ACCESS_TOKEN")) {

                const url = window.location.href;
                console.log(url);
            
                /* 사용자 인증으로 받은 code 값 분리 */
                let queryString = url.substring(url.indexOf('?')+1);
            
                let subArr = queryString.split('&');
                console.log("subArr=>>>>" + subArr);
                const code = subArr[0].substring(subArr[0].indexOf('=')+1);
                
                ApiService.tokenRequest(code).then(res=>{
                    if(res.data.tokneSave) {
                        window.location.reload()
                    }
                }) // 발급 토큰은 쿠키에 저장
            }
        })
    }

    /* USER 정보 불러오기 */
    userInfoList = () => {
        const { DashAction } = this.props;
        ApiService.readUserInfoList().then(res=>{ 
            DashAction.userInfo(res);
        })
    }

    test = (e) => {
        const { DashAction } = this.props;
        DashAction.chang(e);
    }
    pagingClick = (data) => {
        const { DashAction } = this.props;
        DashAction.pagingSelect(data);
    }

    readBankStatus = () => {
        const { DashAction } = this.props;
        ApiService.readBankStatus().then(res=>{
            console.log(res.res_list);
            DashAction.bankStatus(res.res_list);
        })
    }

    authClick = () => {
        ApiService.removeToken();
    }

    render() {
        const {userInfoData, testInfo, pagingSelect, bankStatus, bankAuth, cookies} = this.props
        return(
            <div>
                <AuthorizeComponent
                bankAuth={bankAuth}
                authClick={this.authClick}
                cookies={cookies}
                />
                <UserInfoListComponent
                userInfo={this.userInfoList}
                userInfoData={userInfoData}
                testInfo={testInfo}
                pagingClick={this.pagingClick}
                pagingSelect={pagingSelect}
                readBankStatus={this.readBankStatus}
                bankStatus={bankStatus}
                cookies={cookies}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ dashboard }) => ({
    userInfoData: dashboard.userInfoData,
    testInfo: dashboard.testInfo,
    pagingSelect: dashboard.pagingSelect,
    bankStatus: dashboard.bankStatus,
    renderState : dashboard.renderState,
    bankAuth: dashboard.bankAuth,
    authClick: dashboard.authClick,
});

const mapDispatchToProps = dispatch => ({
    DashAction: bindActionCreators(dashAction, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashbordContainer);
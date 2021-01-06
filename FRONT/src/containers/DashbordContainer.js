import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ApiService from '../ApiService';
import AuthorizeComponent from '../component/system/AuthorizeComponent';
import UserInfoListComponent from '../component/system/UserInfoComponent';
import * as dashAction from '../store/modules/dashboard';

import qs from 'qs';


class DashbordContainer extends Component {

    loginSessionCheck = () => {
        const { history } = this.props;
        ApiService.loginSessionCheck(history);
    }

    /* 토큰 발급 */
    tokenIssuance = (data) => {
       console.log("test========================", data);  
    
       if(data) {
           console.log("if진입");
           ApiService.tokenRequest(data);

       } else {
           console.log("else")
       }
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

    render() {
        {
            this.loginSessionCheck();
        }
        const {userInfoData, testInfo, pagingSelect, bankStatus} = this.props
        return(
            <div>
                <AuthorizeComponent
                onSubmit={this.authorize} 
                tokenIssuance={this.tokenIssuance}
                />
                <UserInfoListComponent
                userInfo={this.userInfoList}
                userInfoData={userInfoData}
                testInfo={testInfo}
                pagingClick={this.pagingClick}
                pagingSelect={pagingSelect}
                readBankStatus={this.readBankStatus}
                bankStatus={bankStatus}
                 />
            </div>
        )
    }
}

const mapStateToProps = ({ dashboard }) => ({
    userInfoData: dashboard.userInfoData,
    testInfo: dashboard.testInfo,
    pagingSelect: dashboard.pagingSelect,
    bankStatus: dashboard.bankStatus
});

const mapDispatchToProps = dispatch => ({
    DashAction: bindActionCreators(dashAction, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashbordContainer);
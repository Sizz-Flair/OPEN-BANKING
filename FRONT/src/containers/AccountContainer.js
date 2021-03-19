import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ApiService from '../ApiService';
import AccountComponent from '../component/system/AccountComponent';

import * as accountAction from '../store/modules/account';


class AccountContainer extends Component {

    componentDidMount() {
        const { history } = this.props;
        
        ApiService.loginSessionCheck(history).then(res=>{
            if(res === "SESSION_OUT") {
                alert("SESSION OUT");
                history.push("/");
            }
        })
    }

    userInfoList = (data) => {
        console.log("userInfoList")
        const { AccountAction } = this.props;
        ApiService.readUserInfoList().then(res=>{      
                AccountAction.userInfo(res);           
        })
    }

    /* 잔액조회(핀테크 번호) */
    readBalanceFintech =(fintechNum) =>{
        const { AccountAction} = this.props;

        console.log(fintechNum,"fiiiiiiiiiiiiiiiiiiii");
        /* fintech_use_num 정보로 잔액 조회 */
        ApiService.readUserAccountInfo(fintechNum).then(res=>{
            AccountAction.selectBankName(res)   
        })       
    }

    render() {
      const { userBankInfo, renderCheck, selectBankName, fintechNum, selectBankInfo, bank_name } = this.props
        return(
            <div>
                <AccountComponent
                getUserBankInfo={this.userInfoList}
                userBankInfo = {userBankInfo}
                renderCheck ={renderCheck}
                readBalanceFintech={this.readBalanceFintech}
                selectBankName={selectBankName}
                fintechNum={fintechNum}
                selectBankInfo={selectBankInfo}
                bank_name={bank_name}
                 />
            </div>
        )
    }
}

const mapStateToProps = ({ account }) => ({
    userBankInfo: account.userBankInfo,
    renderCheck: account.renderCheck,
    selectBankName: account.selectBankName,
    fintechNum: account.fintechNum,
    selectBankInfo: account.selectBankInfo,
    bank_name: account.bank_name,
});

const mapDispatchToProps = dispatch => ({
    AccountAction: bindActionCreators(accountAction, dispatch),
});

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(AccountContainer);

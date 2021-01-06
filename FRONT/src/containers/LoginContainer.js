import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginAction from '../store/modules/login';
import Login from '../component/system/LoginList';
import ApiService from '../ApiService';



class LoginContainer extends Component {

    /*handleChange = e => {
        const { LoginAction } = this.props;
   
        LoginAction.changeInput(e.target);
    };*/

    loginSubmit = (formData) => {
        const{ LoginAction } = this.props;
        const { history } = this.props;   

        ApiService.RsaKeyModulus(formData, history)
        .then( res=>{
            if(res.resCode === "0000") {
                history.push('/index')
            } else if(res.resCode === "L001" ) {
                alert('비밀번호가 일치하지 않습니다.');
            } else {
                alert("미계정 등록 사용");
            }
            //LoginAction.submit(res.data);
        }).catch (err => {
            console.log("==========RsaKeyModulus err", err);
        })
    }

    handleSubmit = e => {
        console.log("handleSubmit 함수 실행 =================");

        const{ LoginAction } = this.props;

        ApiService.ReadLogninInfo(this.props.userId, this.props.userPassword).then(res => {         
            console.log("==========ApiService.ReadLogin 진입==========")           
            LoginAction.submit(res.data.resCode);  
        });  
        e.preventDefault()  
    };

    handleMovePage = () => {
        const { history } = this.props;
        history.push('/membership');
    }

    check = () => {
        ApiService.test();
    }

    render() {
        const { userId, userPassword, loginSuccess} = this.props;
        return(
            <div>
            <Login 
            userId={userId} 
            userPassword={userPassword}
            onSubmit={this.loginSubmit} 
            movePage={this.handleMovePage}
            />
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({
    userId: login.userId,
    userPassword: login.userPassword,
    loginSuccess: login.loginSuccess,
    
});

const mapDispatchToProps = dispatch => ({
    LoginAction: bindActionCreators(loginAction, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
import React, {Component} from 'react';
import AccountUpdateInfoComponent from '../component/system/AccountUpdateInfoComponent'
import ApiService from '../ApiService';

class AccountUpdateInfoContainer extends Component {
    componentDidMount() {
        const { history } = this.props;
        ApiService.loginSessionCheck(history).then(res=>{
            if(res === "SESSION_OUT") {
                alert("SESSION OUT");
                history.push("/");
            }
        })
    }

    upDateAccountInfo = (e) => {
        ApiService.updateAccountUpdateInfo(e).then(res=>{
            alert(res);
            window.location.reload();
        })
    }

    render() {
        return(
            <div>
                <AccountUpdateInfoComponent
                onSubmit={this.upDateAccountInfo}
                />
            </div>
        )
    }
}

export default AccountUpdateInfoContainer;
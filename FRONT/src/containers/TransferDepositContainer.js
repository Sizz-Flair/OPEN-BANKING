import React,{Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import ApiService from '../ApiService';
import TransferDepositComponent from "../component/system/TransferDepositComponent";

import * as transferAction from '../store/modules/transfer';

class TransferDepositContainer extends Component {

    transferDeposit = (e) => {
        console.log(e);
        const { TransferAction } = this.props;
        ApiService.transferDiposit(e).then(res=>{
            console.log(res,">>>>>>>>>>>>>>>!!");
            if(res.errorCode != "A0001" && res.rsp_code=="A0000") {
                TransferAction.transferDiposit(res);
            } else {
                if(res.errorCode == "A0001") {
                    alert(res.errorCode);
                } else {
                    alert(res.errorMessage);
                }
            }
        })
    }

    modalStatus=() => {
        const { TransferAction } = this.props;
        console.log("action");
        TransferAction.modalStatus();
    }

    render() {
        const {transferReqInfo, trnsgerReqInfoResList, modalVisible}=this.props;
        return(
            <div>
                <TransferDepositComponent 
                onSubmit={this.transferDeposit}
                transferReqInfo={transferReqInfo}
                trnsgerReqInfoResList={trnsgerReqInfoResList}
                modalVisible={modalVisible}
                modalStatus={this.modalStatus}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ transfer }) => ({
    transferReqInfo: transfer.transferReqInfo,
    trnsgerReqInfoResList: transfer.trnsgerReqInfoResList,
    modalVisible: transfer.modalVisible
})

const mapDispatchToProps = dispatch => ({
    TransferAction: bindActionCreators(transferAction, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferDepositContainer);
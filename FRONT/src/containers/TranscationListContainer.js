import React, {Component} from 'react';
import TranscationComponent from '../component/system/TranscationListComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as transcationAction from '../store/modules/transcation';
import ApiService from '../ApiService';

class TransationListContainer extends Component {
    componentDidMount() {
        const { history, TranscationAction } = this.props;
        ApiService.loginSessionCheck(history).then(res=>{
            if(res === "SESSION_OUT") {
                alert("SESSION OUT");
                history.push("/login");
            }
        })
        
        //window.addEventListener('resize',()=>console.log(window.innerWidth));
    }

    UNSAFE_componentWillMount() {
        const { TranscationAction } = this.props;
        ApiService.readUserInfoList().then(res=>{
            TranscationAction.readFintechInfo(res)
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            innerWidth:0
        };
    }

    dropDownOpen = () => {
        const { TranscationAction } = this.props;
        TranscationAction.dropDownState(true);
    }

    dropDownOff = () => {
        const { TranscationAction } = this.props;
        TranscationAction.dropDownState(false);
    }

    /* 거래내역 조회 종류 */
    selectType = (e) => {
        const { TranscationAction } = this.props;
        TranscationAction.selectType(e.target)
    }

    /* 잔액조회 */
    transAction = (e) => {
        const { TranscationAction } = this.props;
        ApiService.readTranscationInfo(e).then(res=>{
            console.log(res);
            TranscationAction.readTransInfo(res);        
        })     
    }

    render() {
        const { 
            dropDownState,
            accountInquiryType,
            accountBankName,
            accountType,
            inquiry_type,
            transInfoList,
            fintechInfo
         } = this.props

        return (
            <div>              
                <TranscationComponent 
                dropDownOpen={this.dropDownOpen}
                dropDownOff={this.dropDownOff}
                dropDownState={dropDownState}
                selectType={this.selectType}
                accountInquiryType={accountInquiryType}
                onSubmit={this.transAction}
                accountType={accountType}
                inquiry_type={inquiry_type}
                accountBankName={accountBankName}
                transInfoList={transInfoList}
                fintechInfo={fintechInfo}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ transcation }) => ({
    dropDownState: transcation.dropDownState,
    accountInquiryType: transcation.accountInquiryType,
    accountType:transcation.accountType,
    accountBankName:transcation.accountBankName,
    transInfoList: transcation.transInfoList,
    fintechInfo: transcation.fintechInfo
});
const mapDispatchToProps = dispatch => ({
    TranscationAction: bindActionCreators(transcationAction, dispatch)
});

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(TransationListContainer);

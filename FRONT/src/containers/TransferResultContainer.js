import React, { Component } from 'react';
import TransferResultComponent from '../component/system/TransferResult';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as resultAction from '../store/modules/result';
import ApiService from '../ApiService';

class TransferResultContainer extends Component {

    componentDidMount() {
        const { history } = this.props;
        ApiService.loginSessionCheck(history).then(res=>{
            if(res === "SESSION_OUT") {
                alert("SESSION OUT");
                history.push("/");
            }
        })
    }
    
    readResult = (e) => {
        console.log(e);
        ApiService.readResultInfo(e);
    }

    updateDate = (id, date) => {
        const {ResultAction} = this.props;
        ResultAction.dateArrayInfo(id, date)
    }

    render() {
        const { dateArray } = this.props;
        return (
            <div>
                <TransferResultComponent 
                onSubmit={this.readResult}
                updateDate={this.updateDate}
                dateArray={dateArray}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ result }) => ({
    dateArray: result.dateArray,
})

const mapDispatchToProps = dispatch => ({
    ResultAction: bindActionCreators(resultAction, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferResultContainer);
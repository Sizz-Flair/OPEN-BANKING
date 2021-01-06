import React, { Component } from 'react';
import { connect } from "react-redux";
import * as memberAction from '../store/modules/membership';
import ApiService from '../ApiService';
import MembershipComponent from '../component/system/MembershipComponent';
import { bindActionCreators } from 'redux';
import qs from 'qs';


import PostComponent from '../component/system/PostComponent'
import serialize from 'form-serialize'
import Axios from 'axios';
import * as yup from 'yup'
import { Form, Formik } from 'formik';

class MembershipContainer extends Component {

    handleChange = (e) => {
        const { MemberAction }= this.props;
        MemberAction.changeInput(e.target);
    }

    /* 주소 검색 */
    handleAddrComplete = (data) => {

        const { MemberAction, addrInfo } = this.props 

        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
    
        console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        MemberAction.addrInfo(fullAddress);
      }
      
    handleSubmit = (e) => {
        /* 주석처리 */
        //console.log(e.target.name);
        //const data = serialize(e.target);
        //console.log("++++++++++",data);

        const { history } = this.props;   

        ApiService.MemberShipInfo(qs.stringify(e), history);
    }

    chekDuple = () => {
        console.log("==========듀플체크==========");

        const data = {
            memberId: this.props.memberId
        }

        console.log(data);

        ApiService.dupleCheck(data);
    }
    
    addrBtnClick = () => {
        const { MemberAction, addressOpen} = this.props;
        console.log("==============addrBtnClick + addressOpen = " );
 
        MemberAction.btnEvent(!addressOpen);
    }  

    testSubmit = (e) => {
        const form = e.currentTarget;
        console.log("testSubmit 진입=============")
        if (form.checkValidity() === true) {
            console.log("if 진입=============")
            e.preventDefault();
            e.stopPropagation();
          }
          e.preventDefault() 
    }

    handleComplete = (data) => {
        console.log(data.address);

        const { MemberAction } = this.props;

        MemberAction.addrInfo(data.address);
    }

    render() {
        const {
            memberId,
            memberPassword,
            userName,
            email,
            phoneNum,
            addrInfo,
            addressOpen,
        } = this.props

        return(
            <div>
                <MembershipComponent 
                memberId={memberId}
                memberPassword={memberPassword}
                userName={userName}
                email={email}
                phoneNum={phoneNum}
                addrInfo={addrInfo}
                submitCheck={this.handleSubmitCheck}
                onClick={this.chekDuple}
                onSubmit={this.handleSubmit}
                onchange={this.handleChange}
                testSubmit={this.testSubmit}
                addressBtn={this.addrBtnClick}
                addressOpen={addressOpen}
                addrInfoData={this.handleComplete}
                />
                {/*<PostComponent 
                addressBtn={this.addrBtnClick}
                addressOpen={addressOpen}
                addrInfo={this.handleComplete}
                />*/}
            </div>
        )
    }
}

const mapStateToProps = ({ membership }) => ({
    memberId: membership.memberId,
    memberPassword: membership.memberPassword,
    userName: membership.userName,
    email: membership.email,
    phoneNum: membership.phoneNum,
    addressOpen: membership.addressOpen,
    addrInfo: membership.addrInfo,
    submitCheck: membership.submitCheck,

    memberId: membership.memberId,
    memberPassword: membership.memberPassword,
    userName: membership.userName,
    email: membership.email,
    phoneNum: membership.phoneNum,
    addrInfo: membership.addrInfo
})

const mapDispatchToProps = dispatch => ({
    MemberAction: bindActionCreators(memberAction, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MembershipContainer);
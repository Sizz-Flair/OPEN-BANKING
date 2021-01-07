import React from 'react';
import styled from 'styled-components';
import Table from '../system/PagingComponent2'
import '../system/common.css'
import {TiTimes} from 'react-icons/ti';



const TransferModal = ({
    visible,
    modalStatus,
    transferReqInfo,
    trnsgerReqInfoResList
}) => {

    return (
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
        <TransferModalOverlay visible={visible} />
          <TransferModalWrapper tabIndex="-1" visible={visible}>
            <TransferModalInner tabIndex="0" className="modal-inner">
                <div className="button-position-end" onClick={()=>modalStatus()}>  
                    <div className="button-border">
                        <TiTimes />
                    </div>   
                </div>
                <div className="col-12 contenthead mb-3 p-0">
                    <h5 className="">입금이체 결과 조회</h5>
                </div>
                <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <label>아이템</label>
                    <input className="col-12" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <label>아이템</label>
                    <input className="col-12" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <label>아이템</label>
                    <input className="col-12" />
                </div>
                <div className="col-12 mt-3">
                    <Table 
                    arrayThead = {[
                        '은행이름',
                        '통장 인자내용',
                        '수취인'
                    ]}
                    arrayTheadName = {[
                        'bank_name',
                        'print_content',
                        'account_holder_name'
                    ]}
                    arrayTbody = {trnsgerReqInfoResList}
                    />
                </div>
                </div>
            </TransferModalInner>
          </TransferModalWrapper>          
        </div>
    )
}

const TransferModalOverlay = styled.div`
box-sizing: border-box;
display: ${(props) => (props.visible ? 'block' : 'none')};
position: fixed;
top: 0px;
left: 0;
bottom: 0;
right: 0;
overflow: auto;
background-color: rgba(0, 0, 0, 0.6);
z-index: 999;
`
const TransferModalWrapper = styled.div`

box-sizing: border-box;
display: ${(props) => (props.visible ? 'block' : 'none')};
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
z-index: 1000;
overflow: auto;
outline: 0;
`

const TransferModalInner = styled.div`
box-sizing: border-box;
position: relative;
box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
background-color: #fff;
border-radius: 10px;
height: 560px;
max-height: 680px;
width: 560px;
max-width: 680px;
top: 50%;
transform: translateY(-50%);
margin: 0 auto;
overflow: auto;
padding: 40px 20px;

@media(min-width: 468px) {
    width:260px;
}
@media(min-width: 768px) {
    width:360px;
}
@media(min-width: 992px) {
    width:460px;
}
@media(min-width: 1200px) {
    width:560px;
}
`
export default TransferModal;
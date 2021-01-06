import React from 'react'
import styled from 'styled-components';

const Modal = ({
    visible, 
    bankStatus,
    setModalVisible
}) => {
    return (
        <>
        <ModalOverlay visible={visible} />
            <ModalWrapper tabIndex="-1" visible={visible}>
                <ModalInner tabIndex="0" className="modal-inner" onBlur={()=>(setModalVisible(false))}>
                  {
                    bankStatus.map(i=>(
                      <>
                      <label>{i.bank_code_std}</label>
                      <b>{i.bank_name}</b>
                      </>
                    ))
                  }
                </ModalInner>
        </ModalWrapper>
        </>
    )
}

const ModalWrapper = styled.div`
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
const ModalOverlay = styled.div`
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
const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  height: 360px;
  max-height: 480px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  overflow: auto;
  padding: 40px 20px;
`
export default Modal;
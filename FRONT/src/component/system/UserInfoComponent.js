import React, {useState, useEffect} from 'react';
import Modal from '../util/Modal';
import Paging from '../system/PagingComponent'

const UserInfoList = ({
    bank_name,
    account_holder_name,
    inquiry_agree_dtime,
    transfer_agree_dtime,
}) => {
    return(
        <tr>
            <th className="th-set">{bank_name}</th>
            <th className="th-set">{account_holder_name}</th>
            <th className="th-set">{inquiry_agree_dtime}</th>
            <th className="th-set">{transfer_agree_dtime}</th>
        </tr>
    );
};

const UserInfoListComponent = ({
    userInfoData,
    testInfo,
    userInfo,
    pagingClick,
    pagingSelect,
    readBankStatus,
    bankStatus,
    cookies,
}) => {

    const [modalVisible, setModalVisible] = useState(false);

    let pagingNum = 0;

    console.log(cookies.get("ACCESS_TOKEN"),"############");

    const userInfoList = cookies.get("ACCESS_TOKEN") 
    ? testInfo.map((i, index) => (
        i.id >= (pagingSelect-1)*10 && i.id <= pagingSelect*10 &&
        <UserInfoList
        id={i.id}
        key={index}
        bank_name={i.bank_name}
        account_holder_name={i.account_holder_name}
        inquiry_agree_dtime={i.inquiry_agree_dtime}
        transfer_agree_dtime={i.transfer_agree_dtime}
        />
    )) 
    : null;

    useEffect(() => {
    }, []);

    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 userinfo">
            <div className="col-xs-12 col-sm-6 col-md-12 col-lg-12 col-xl-12 title mb-3 p-0">
                <h1 className="text-left">사용자 정보조회</h1>
            </div>
            <div className="col-12 mb-3">
                <div className="col-12">
                    <button className="btn btn-primary" onClick={cookies.get("ACCESS_TOKEN") ? userInfo : ()=>{alert("사용만료입니다. 사용자 인증을 진행해 주세요"); window.location.reload()}}><b>사용자 정보 조회</b></button>
                </div>
            </div>
            <div className="col-12 mb-3">
                <div className="col-12">
                    <button className="btn btn-primary" onClick={()=>{setModalVisible(!modalVisible); readBankStatus()}}><b>참가은행 조회</b></button>
                </div>
            </div>
            {
                modalVisible && <Modal visible={true} bankStatus={bankStatus} setModalVisible={setModalVisible}/>
            }
            <div className="col-12 input-box">
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div className="col-4 p-0">
                        <span className="input-group-text"><b>총 갯수</b></span>
                    </div>
                    <input className="form-control" readOnly value={userInfoData.res_cnt || ''}/>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div className="col-4 p-0">
                        <span className="input-group-text"><b>응답코드</b></span>
                    </div>
                    <input className="form-control" readOnly value={userInfoData.rsp_code || ''}/>
                </div> 
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div className="col-4 p-0">
                        <span className="input-group-text"><b>일자</b></span>
                    </div>
                    <input className="form-control" readOnly value={userInfoData.api_tran_dtm || ''}/>
                </div>     
            </div>  
            <div className="col-12 input-box">   
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div className="col-4 p-0">
                        <span className="input-group-text"><b>사용자 번호</b></span>
                    </div>
                    <input className="form-control" readOnly value={userInfoData.user_seq_no || ''}/>
                </div> 
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div className="col-4 p-0">
                        <span className="input-group-text"><b>아이템</b></span>
                    </div>
                    <input className="form-control" readOnly value={userInfoData.user_ci || ''}/>
                </div>        
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div className="col-4 p-0">
                        <span className="input-group-text"><b>사용자 이름</b></span>
                    </div>
                    <input className="form-control" readOnly value={userInfoData.user_name || ''}/>
                </div>  
            </div>
            <div className="col-12 table-set">
                <div className="col-12">
                    <table className ="table col-12">
                        <thead>
                            <tr>                    
                                <th>#</th>
                                <th>first</th>
                                <th>last</th>
                                <th>handle</th>
                            </tr>
                        </thead>
                        <tbody>                  
                            {userInfoList}
                        </tbody>
                    </table>
                </div>
            </div>
            <nav aria-label="...">
                <ul className="pagination justify-content-center">
                    {testInfo.map((i, index)=> (
                        i.id%10 == 0 &&
                        <Paging 
                        key={index}
                        testInfo={testInfo}
                        pagingNum={++pagingNum}
                        pagingClick={pagingClick}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    )
}
export default UserInfoListComponent;
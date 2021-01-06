import React, {useState} from 'react';
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
            <th>{bank_name}</th>
            <th>{account_holder_name}</th>
            <th>{inquiry_agree_dtime}</th>
            <th>{transfer_agree_dtime}</th>
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
    bankStatus
}) => {

    const [modalVisible, setModalVisible] = useState(false);

    let pagingNum = 0;
    const userInfoList = testInfo.map((i, index) => (
        i.id >= (pagingSelect-1)*10 && i.id <= pagingSelect*10 &&
        <UserInfoList
        key={index}
        bank_name={i.bank_name}
        account_holder_name={i.account_holder_name}
        inquiry_agree_dtime={i.inquiry_agree_dtime}
        transfer_agree_dtime={i.transfer_agree_dtime}
        id={i.id}
        />
    ));

    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="col-6 col-md-6 col-lg-6 col-xl-6 border-bottom mb-3">
                <h1 className="text-left">사용자 정보조회</h1>
            </div>
            <div className="col-12 mb-3">
                <button className="btn btn-primary" onClick={userInfo}>사용자 정보 조회</button>
            </div>
            <div className="col-12 mb-3">
                <button className="btn btn-primary" onClick={()=>{setModalVisible(!modalVisible); readBankStatus()}}>참가은행 조회</button>
            </div>
            {
                modalVisible && <Modal visible={true} bankStatus={bankStatus} setModalVisible={setModalVisible}/>
            }
            <div className="col-12 row">
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div>
                        <span className="input-group-text">아이템</span>
                    </div>
                    <input className="form-control" type="readonly" value={userInfoData.api_tran_id}/>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div>
                        <span className="input-group-text">아이템</span>
                    </div>
                    <input className="form-control" type="readonly" value={userInfoData.rsp_code}/>
                </div> 
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div>
                        <span className="input-group-text">아이템</span>
                    </div>
                    <input className="form-control" type="readonly" value={userInfoData.api_tran_dtm}/>
                </div>     
            </div>  
            <div className="col-12 row">   
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div>
                        <span className="input-group-text">아이템</span>
                    </div>
                    <input className="form-control" type="readonly" value={userInfoData.user_seq_no}/>
                </div> 
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div>
                        <span className="input-group-text">아이템</span>
                    </div>
                    <input className="form-control" type="readonly" value={userInfoData.user_ci}/>
                </div>        
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 input-group mb-3">
                    <div>
                        <span className="input-group-text">아이템</span>
                    </div>
                    <input className="form-control" type="readonly" value={userInfoData.user_name}/>
                </div>  
            </div>
            <div className="col-12 row">
                <div className="col-12 input-group mb-3">
                    <div>
                        <span className="input-group-text">아이템</span>
                    </div>
                    <input className="form-control" type="readonly" value={userInfoData.res_cnt}/>
                </div>       
            </div>
            <div className="col-12 row">
                <div className="col-12">
                    <table className ="table">
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
                    <li className="page-item disabled">
                        <a className="page-link" href="#" aria-disabled="true">Previous</a>
                    </li>
                    {testInfo.map((i, index)=> (
                        i.id%10 == 0 &&
                        <Paging 
                        key={index}
                        testInfo={testInfo}
                        pagingNum={++pagingNum}
                        pagingClick={pagingClick}
                        />
                    ))}
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default UserInfoListComponent;
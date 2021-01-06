import React, {useState} from 'react';
import { useTranslation } from 'react-i18next'

/* 유저 은행정보 드롭다운 메뉴 */
const DropDownMenu = ({
    dropDownAcive,
    userBankInfo,
    readBalanceFintech,
    setDropDownActive,
    setDropDownActive_click,
}) => {
    let dropDownState = 
    dropDownAcive 
    ? "dropdown-menu show col-sm-4 col-md-5 col-lg-5 col-xl-5" 
    : "dropdown-menu"

    return(
        <div 
        className={dropDownState}   
        onMouseLeave={() => {setDropDownActive_click(true)}}
        onMouseOut={() => {setDropDownActive_click(false)}}
        >
            {userBankInfo
            .map((i) => (
            <button 
            key={i.id}
            onBlur={()=>{setDropDownActive(!dropDownState)}} 
            onClick={() => {setDropDownActive(!dropDownState); readBalanceFintech(i.fintech_use_num);}} 
            className="dropdown-item col-sm-4"
            >
                {i.bank_name+'('+i.account_num_masked+')'}
            </button>))}     
        </div>
    )
}

const AccountComponent = ({
    getUserBankInfo,
    userBankInfo,
    renderCheck,
    selectBankName,
    readBalanceFintech,
    selectBankInfo,
}) => {
    /* 다국어 지원 */
    const { t } = useTranslation();
    const[dropDownActive, setDropDownActive] = useState(false);
    const[dropDownActive_click, setDropDownActive_click] = useState(false);
    if(!renderCheck){
        getUserBankInfo(userBankInfo);   
    }
    return(
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="col-6 col-md-6 col-lg-6 col-xl-6 border-bottom mb-3">
                <h1 className="text-left">잔액조회</h1>
            </div>
            <div className="dropdown mb-3">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3 border-bottom">
                    <div className="row">                       
                        <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_INQUIRY")+" "+t("LABEL_BANK")}</label>
                        <button className="btn btn-primary dropdown-toggle col-sm-4" 
                        onClick={() => {setDropDownActive(!dropDownActive); 
                        console.log(dropDownActive)}} 
                        onBlur={()=>{dropDownActive_click && setDropDownActive(!dropDownActive)}}
                        type="button"
                        > 
                        {selectBankName}
                        </button>
                    </div>
                    <DropDownMenu
                    dropDownAcive={dropDownActive}
                    userBankInfo={userBankInfo}
                    readBalanceFintech={readBalanceFintech}
                    setDropDownActive={setDropDownActive}
                    dropDownActive_click={dropDownActive_click}
                    setDropDownActive_click={setDropDownActive_click}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="row p-1 border-bottom">
                    <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_BANK_NAME")}</label>                  
                    <input 
                    className="col-12 col-sm-4 col-md-6 col-lg-6 col-xl-6"
                    readOnly 
                    placeholder={t("LABEL_BANK_NAME")} 
                    value={selectBankInfo.bank_name || ''}
                    />                  
                </div>
                <div className="row p-1 border-bottom">
                    <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_PRODUCT_NAME")}</label>
                    <input 
                    className="col-sm-4 col-md-6 col-lg-6 col-xl-6"
                    readOnly 
                    placeholder={t("LABEL_PRODUCT_NAME")} 
                    value={selectBankInfo.product_name || ''}
                    />
                </div>
                <div className="row p-1 border-bottom">
                    <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_BALANCE")}</label>
                    <input 
                    className="col-sm-4 col-md-6 col-lg-6 col-xl-6"
                    readOnly 
                    placeholder={t("LABEL_BALANCE")} 
                    value={selectBankInfo.balance_amt || ''}
                    />
                </div>
                <div className="row p-1 border-bottom">
                    <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_AVAILAB")}</label>
                    <input 
                    className="col-sm-4 col-md-6 col-lg-6 col-xl-6"
                    readOnly 
                    placeholder={t("LABEL_AVAILAB")} 
                    value={selectBankInfo.available_amt || ''}
                    />
                </div>
                <div className="row p-1 border-bottom">
                    <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_FINTECH_NUM")}</label>
                    <input 
                    className="col-sm-4 col-md-6 col-lg-6 col-xl-6"
                    readOnly 
                    placeholder={t("LABEL_FINTECH_NUM")} 
                    value={selectBankInfo.fintech_use_num || ''}
                    />
                </div>
                <div className="row p-1 border-bottom">
                    <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_BANK_TRAN")}</label>
                    <input
                    className="col-sm-4 col-md-6 col-lg-6 col-xl-6" 
                    readOnly 
                    placeholder={t("LABEL_BANK_TRAN")} 
                    value={selectBankInfo.bank_tran_date || ''}
                    />
                </div>
                <div className="row p-1 border-bottom">
                    <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_MATURITY")}</label>
                    <input 
                    className="col-sm-4 col-md-6 col-lg-6 col-xl-6"
                    readOnly 
                    placeholder={t("LABEL_MATURITY")} 
                    value={selectBankInfo.maturity_date || ''}
                    />
                </div>
                <div className="row p-1 border-bottom">
                    <label className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">{t("LABEL_LAS_TRAN_DATA")}</label>
                    <input 
                    className="col-sm-4 col-md-6 col-lg-6 col-xl-6"
                    readOnly 
                    placeholder={t("LABEL_LAS_TRAN_DATA")} 
                    value={selectBankInfo.last_tran_date || ''}
                    />
                    </div>
            </div>
        </div>
    )
}
export default AccountComponent;
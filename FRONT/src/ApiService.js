import axios from 'axios';
import RSAKey from 'react-native-rsa';
import qs from 'qs';
import { reduxForm } from 'redux-form';

const USER_API_BASE_URL = "http://localhost:8080/";

class ApiService {

    ReadLogninInfo = (userID, userPasswodr) => {
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + 'session',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded' ,
            },
            data: {
                userId: 'name',
                pass: 'pass',
            }
        }).then(res=>{
            return res.data;
        }).catch(err=>{
            console.log(err);
        })
    }
  
    /* RSA-KEY 세션등록 */
    RsaKeyModulus = (formData, history) => {
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + 'rsaKeyModulus',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded' 
            },
            withCredentials:true,
        }).then(res=>{
            console.log("==========RsaKeyModulus Axios Success==========");

            /* RSA KEY 생성 */
            let rsa = new RSAKey();
            rsa.setPublic(res.data.modulus, res.data.exponent);

            /* ID, PASSWORD 암호화 */
            const hiddenId = rsa.encrypt(formData.userId);
            const hiddenPassword = rsa.encrypt(formData.userPw);
            const loginInfoData = {
                'hiddenId': hiddenId,
                'hiddenPassword': hiddenPassword
            }

            /* ID 유효성 검사 */
            res.data = axios({
                method: 'POST',
                url: USER_API_BASE_URL+"loginVaildJson",
                headers: {  
                    'content-type': 'application/x-www-form-urlencoded' 
                },
                withCredentials:true,
                data: qs.stringify(loginInfoData),
            }).then( res=> {
                //history.push("/index");
                return res.data
            })    
            return res.data
        }).catch( err=> {
            console.log('==========RsaKeyModulus Axios Error!==========', err);
        })
    }
    
    MemberShipInfo = (data, history) => {
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL+"membership",
            header: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            data: data,
            withCredentials:true,
        }).then(res=>{
            alert("회원가입 성공");
            history.push("/index");
        })
    }

    dupleCheck = (data) => {
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + "dupleCheck",
            header: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            data: qs.stringify(data),
            withCredentials:true,          
        }).then( res=> {
            console.log("dupleCheck succes===");
            console.log(res.data);
            if(res.data===true) {
                alert("사용 가능합니다.");

            } else {
                alert("중복된 아이디 입니다.");
            }
        })
    }

    test = ( history ) => {
        const data = {
        }
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + 'test',
            data: qs.stringify(data),
            headers: { 
                'content-type': 'application/x-www-form-urlencoded' ,
            },
            withCredentials:true
        }).then(res=>{
            console.log(res.data);
            if(res.data === "SESSION_OUT") {
                
                console.log("logout");
                history.push("/");
            }           
        })
    }
    loginSessionCheck = (history) => {
        return axios({
            method:'POST',
            url: USER_API_BASE_URL + 'idSessionCheck',
            withCredentials:true
        }).then(res=>{
            console.log(">>>>>>>>>>>>>>>>>"+res.data);
            if(res.data=='SESSION_OUT') {
                alert("세션아웃");
                history.push('/login');
            } 
            return res.data;
        })
    }

    tokenRequest = (data) => {
        const codeData ={
            code: data
        }

        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + 'tokenRequest',
            withCredentials:true,
            data: qs.stringify(codeData)
        })
    }

    /* 사용자 정보 조회 */
    readUserInfoList = () => {
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + '/index/user',
            withCredentials:true
        }).then(res=>{
            return res.data;
        })
    }

    /* 잔액조회 */
    readUserAccountInfo = (data) => {
        const finData = {
            fintechNum: data
        }
        return axios ({
            method: 'POST',
            url: USER_API_BASE_URL + '/index/account',
            withCredentials:true ,
            data: qs.stringify(finData)
        }).then(res=>{
            return res.data;
        })
    }

    /* 거래내역 조회 */
    readTranscationInfo = (data) => {
        return axios({
                method: 'POST',
                url: USER_API_BASE_URL + '/index/transation',
                withCredentials:true,
                data: qs.stringify(data)
            }).then(res=>{
                return res.data;
            })     
    }

    /* 계좌정보 변경 */
    updateAccountUpdateInfo = (data) => {
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + '/index/accountupdateinfo',
            withCredentials:true,
            data: qs.stringify(data)
        }).then(res=>{
            return res.data;
        })
    }

    /* 입금 이체 */
    transferDiposit = (data) => {
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + '/index/transferdiposit',
            withCredentials:true,
            data: qs.stringify(data)
        }).then(res=>{
            return res.data;
        })
    }

    readBankStatus = () => {
        return axios({
            method: 'POST',
            url: USER_API_BASE_URL + '/index/status',
            withCredentials:true,
        }).then(res=>{
            return res.data;
        })
    }
}
export default new ApiService();
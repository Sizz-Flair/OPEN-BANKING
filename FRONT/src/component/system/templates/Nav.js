import React,{useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import styled, {keyframes} from 'styled-components'
import '../common.css';

const Navbar = () => { 
    const [menuState, setMenuState] = useState(false);
    
    useEffect(() => {
      }, []);
   
    return(      
        <div className={`col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 border-right navcontainer`}
        >
            <div className="col-12"> 
                <MenuDrop test={menuState} >
                {console.log(menuState,"width")}
                <ul className="nav flex-column text-end">
                    <li className="nav-item">
                        <Link className="navMenu" to="/index/userinfo">사용자 정보</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="navMenu" to="/index/account">잔액조회</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="navMenu" to="/index/transcation">거래내역 조회</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="navMenu" to="/index/accountinfo">계좌정보 변경</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="navMenu" to="/index/transfer">입금이체</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="navMenu"to="/index/result">이체결과 조회</Link>
                    </li>
                </ul>
                </MenuDrop>
            </div>
        </div>
    )
}

const down = keyframes`
    0% {
    height: 0px;
    }
    100% {
    height: 200px;
    }`;

const MenuDrop = styled.div`
@media ( max-width : 420px) {
    text-align: center;
    overflow: hidden;
    padding-top: 20px;
    height: 0px;
    margin-bottom: 20px;
    &:hover {
    animation-name: ${down};
    animation-duration:0.7s;
    animation-fill-mode: both;
    }
    &:before {
        content: "menu";
        position: relative;
        text-align: center;
        width: 10px;
        height: 10px;
        display: initial;
        border-top: 0.5px solid;
        border-bottom: 0.5px solid;
        top: -25px;
    }
}`;

export default Navbar;
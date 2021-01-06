import React from 'react';
import { Link } from 'react-router-dom';
import '../common.css';

const Navbar = () => {

    return(      
        <div className="col-12">
            <ul className="nav flex-column">
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
                    <Link className="navMenu" to="/index/user">참가은행 조회</Link>
                </li>
                <li className="nav-item">
                    <Link className="navMenu" to="/index/transfer">입금이체</Link>
                </li>
                <li className="nav-item">
                    <Link className="navMenu"to="/index/user">이체결과 조회</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
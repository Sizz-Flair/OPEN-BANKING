import React from 'react';
import '../common.css';
import {AiOutlineLogout} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header = ({logout}) => {

    return (
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 header p-0 mb-3">
            <div className="header-top">
                <div className="header-inline">
                    <ul className="header-gourp">
                        <li className="header-menu"><Link className="navMenu" to="/login">사용자 정보 변경</Link></li>
                        <li className="header-menu"><Link className="navMenu" to="/login">공지사항</Link></li>
                        <li className="header-menu" onClick={logout}><Link className="navMenu" to="/login">로그아웃</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import '../common.css';


const Foot = () => {

    return(      
        <div className="container">
            <div className="row">
                <ul>
                    <li>회사소개</li>
                    <li>오시는길</li>
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                </ul>
                <div>
                    <b>본관</b>
                    <b>센터</b>
                </div>

            </div>

        </div>
    )
}

export default Foot;
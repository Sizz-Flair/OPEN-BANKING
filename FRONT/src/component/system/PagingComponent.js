import React from 'react';

const Paging =({pagingClick, pagingNum}) => {
    return (      
        <div>
           <li className="page-item"><button onClick={() => {
               pagingClick(pagingNum);
           }} className="page-link">{pagingNum}</button></li>   
        </div>
    )
}

export default Paging;
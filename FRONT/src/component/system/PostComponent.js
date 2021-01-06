import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const PostCode = ({
    fullAddress,
    addressBtn, 
    addressOpen=false,  
    addrInfo, 
}) => {
    return (
        <div className="col-12 p-0">
        <button className="btn btn-primary" onClick={addressBtn } type="button">주소 검색</button>
        {
            addressOpen ? 
            <DaumPostcode 
            onComplete={addrInfo}
            /> : null
        }          
        </div>   
    )
}

export default PostCode;
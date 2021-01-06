import React from 'react';

const DropDownButton = ({
    id,
    placeholder,
    data
}) => {

    const dropDown = () => {
        document.getElementById(id).classList.add('show');
    }

    const dropUp = () => {
        document.getElementById(id).classList.remove('show');
    }

    return (
        <div>
            <button 
            id="test" 
            className="btn btn-primary" 
            type='button' 
            onClick={dropDown}
            onBlur={()=>setTimeout(()=>{dropUp()},100)}
            >
            {placeholder}
            </button>
            <div id={id} className="dropdown-menu">      
            {data.map(i=>(
                <input 
                readOnly 
                name="tssss"
                key={i.key} 
                value={i.bank_name} 
                onClick={(e)=>console.log(e.target.value)}/>
            ))}
            </div> 
        </div>
    )
}

export default DropDownButton;
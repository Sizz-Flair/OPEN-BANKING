import React, {useState} from 'react';

const Tbody = ({
    arrayTheadName,
    arrayTbody,
    pagingNum
}) => {
    return(
        <tbody> 
            {console.log(pagingNum,"paging>>>>>>>>")}
            {arrayTbody.map((i) =>(
                i.id >= pagingNum*10 && i.id < (1+pagingNum)*10&&
                <tr key={i.id}>
                    {arrayTheadName.map((j, index) => (
                        <th key={index}>
                        {i[j]}
                        </th>
                    ))}
                </tr>

            ))}
        </tbody> 
    );
}

const Table = ({
    arrayThead,
    arrayTheadName,
    arrayTbody,
    pagingNum  
}) => {
    return (
        <div>
            <div className="col-12">
                <table className ="table">
                    <thead>
                        <tr>
                            {arrayThead.map((i, index) => (
                                <th key={index}>{i}</th>
                            ))}
                        </tr>
                    </thead>                  
                        <Tbody 
                        arrayTheadName={arrayTheadName}  
                        arrayTbody={arrayTbody} 
                        pagingNum={pagingNum}                            
                        />                
                </table>
            </div>
        </div>
    )
}

const PagingNum = ({
    setPabingNum,
    arrayTbody
}) => {
    const elements = []
    let length = arrayTbody.length/10;
    
    for(let i=0; i<=length; i++) {
    elements.push(<li className="page-item"><button className="page-link" onClick={() => setPabingNum(i)}>{i+1}</button></li>)
    }

    return (
        <ul className="pagination justify-content-center">
            <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
                {elements}
            <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
    )    
}

const TablePaging =({
    arrayThead, 
    arrayTheadName,
    arrayTbody 
}) => {
    const[pagingNum, setPabingNum] = useState(0);
    return ( 
        <div className="col-12">     
            <Table 
            arrayThead={arrayThead}
            arrayTheadName={arrayTheadName}
            arrayTbody={arrayTbody}
            pagingNum={pagingNum}
            />
            <nav aria-label="Page navigation">
                <PagingNum 
                setPabingNum={setPabingNum}
                arrayTbody={arrayTbody}
                />
            </nav>
        </div>
    )
}

export default TablePaging;
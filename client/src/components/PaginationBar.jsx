import React from 'react';
import './PaginationBar.css';

export function PaginationBar({pagination, setPagination}){

    function backPage(){
        if(pagination.page > 1) setPagination({...pagination, page: parseInt(pagination.page) - 1});
    };

    function nextPage(){
        if(pagination.page < pagination.maxPages) setPagination({...pagination, page: parseInt(pagination.page) + 1});
    };

    function setPage(value){
        setPagination({...pagination, page: parseInt(value)});
    };

    console.log(pagination);
    return(
        <div className='paginationDiv'>
            <button  onClick={e => backPage()}>Back</button>
            {pagination.page === 1 ? <></> : <button onClick={e => setPage(e.target.innerText)}> 1 </button>}
            <a > {pagination.page} </a>
            {pagination.page === pagination.maxPages ? <></> : <button onClick={e => setPage(e.target.innerText)}>{pagination.maxPages}</button>}
            <button onClick={e => nextPage()}>Next</button>
        </div>
    )
};
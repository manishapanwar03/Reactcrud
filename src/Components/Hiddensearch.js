import React, { useState } from 'react'
import './Hidden.css';
const Hidden_Search = () => {
    const [show, setShow] = useState(1);
    const handleShow = () => {
        if (show === 1) {
            document.getElementsByClassName("main_day4")[0].setAttribute("class", "main_day4 active");
            setShow(0);
        } else {
            document.getElementsByClassName("main_day4")[0].setAttribute("class", "main_day4");
            setShow(1);
        }
    }
    return (
        <div className='main_day4'>
            {show ? (
                <>
                     <i class="fa fa-search" onClick={handleShow}></i>
                </>

            ) : (
                <>
                    <input type='text' placeholder='Search' className='input' />
                <button id='btn' onClick={handleShow}><i class="fa fa-search"></i></button>
                </>

            )}

        </div>
    )
}
export default Hidden_Search







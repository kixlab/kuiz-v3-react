import React from 'react';
import "./Gnb.scss";

const Gnb = (props: {loginState:boolean}) => {
    return (
        <div className='SideTab'>
            <h1>KUIZ</h1>
            {props.loginState && <>
                <div className='ProfileImg'></div>
                <div className='NavBtn'>Create Question</div>
                <div className='NavBtn'>Create Options</div>
                <div className='NavBtn'>My Page</div>
            </>
            }
        </div>
    )
}

export default Gnb;
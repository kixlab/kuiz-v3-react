import React from 'react';
import "./Gnb.scss";

const Gnb = (props: {loginState:boolean}) => {
    return (
        <div className='SideTab'>
            <div id="Logo">📖KUIZ</div>
            {props.loginState && <>
                <div className='Menu'>
                    <div className='MenuBtn'>Create Question</div>
                    <div className='MenuBtn'>Create Options</div>
                    <div className='MenuBtn'>My Page</div>
                </div>
                <div className='ProfileImg'></div>
            </>
            }
        </div>
    )
}

export default Gnb;
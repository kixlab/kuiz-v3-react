import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Gnb.scss";

const Gnb = (props: {loginState:boolean}) => {
    const navigate = useNavigate();

    return (
        <div className='SideTab'>
            <div id="Logo" onClick={() => navigate("/")}>📖KUIZ</div>
            {props.loginState==true && <>
                <div className='Menu'>
                    <div className='MenuBtn' onClick={() => navigate("/createQuestion")}>Create Question</div>
                    <div className='MenuBtn' onClick={() => navigate("/question/createOption")}>Create Options</div>
                    <div className='MenuBtn' onClick={() => navigate("/mypage")}>My Page</div>
                </div>
                <div className='ProfileImg' onClick={() => navigate("/login")}></div>
            </>
            }
        </div>
    )
}

export default Gnb;
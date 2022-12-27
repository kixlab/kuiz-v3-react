import React from 'react';
import MadeOption from '../../Components/MadeOption/MadeOption';
import MadeStem from '../../Components/MadeStem/MadeStem';
import QuizListContent from '../../Components/QuizList/QuizListContent';
import QuizListHeader from '../../Components/QuizList/QuizListHeader';
import "./MyPage.scss";

function MyPage(props:{stemNum:number, optionNum:number}) {
    return (
        <div>
            <div>
                <div className='DataLabel'><div style={{color:'#212121'}}>Created Question Stems</div>{props.stemNum}</div>
                <div className='MadeLists'>
                    <MadeStem />
                    <MadeStem />
                    <MadeStem />
                </div>
            </div>
            <div>
                <div className='DataLabel'><div style={{color:'#212121'}}>Created Options</div>{props.optionNum}</div>
                <div className='MadeLists'>
                    <MadeOption optionType='Distractor'/>
                    <MadeOption optionType='Answer'/>
                    <MadeOption optionType='Distractor'/>
                    <MadeOption optionType='Distractor'/>
                </div>
            </div>
            <button>Log Out</button>
        </div>

    )
}


export default MyPage;
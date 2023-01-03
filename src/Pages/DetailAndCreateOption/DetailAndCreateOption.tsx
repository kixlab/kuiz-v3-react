import React from 'react';
import styled from 'styled-components';
import { CreateNewOption } from '../../Components/CreateNewOption/CreateNewOption';
import { QExplain } from '../../Components/QExplain/QExplain';
import "./DetailAndCreateOption.scss";

function DetailAndCreateOption() {
    return (
        <QuestionBox>
            <QExplain type="Objective"/>
            <QExplain type="Explanation"/>
            <DividerLine/>
            <div className='Label'>Q. abcd</div>
            <div>
                <div className='Option'>✅Option1</div>
                <div className='Option'>❌Option1</div>
                <div className='Option'>❌Option1</div>
            </div>
            <DividerLine/>
            <CreateNewOption/>
        </QuestionBox>
    )
}

//QuestionBox is here!
const QuestionBox = styled.div`
    border-radius: 8px;
    background-color: white;
    margin: 40px 0 40px 0;
    padding: 0 30px 30px 30px;
`

const DividerLine = styled.hr`
    border:0;
    height:1px;
    background-color: #dbdbdb;
    margin-top: 30px;
`

export default DetailAndCreateOption;
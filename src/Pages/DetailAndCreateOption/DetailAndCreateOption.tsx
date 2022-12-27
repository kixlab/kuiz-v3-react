import React from 'react';
import styled from 'styled-components';
import CreateNewOption from '../../Components/CreateNewOption/CreateNewOption';
import QExplain from '../../Components/QExplain/QExplain';
import "./DetailAndCreateOption.scss";

function DetailAndCreateOption() {
    return (
        <BoxShadow>
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
        </BoxShadow>
    )
}

const BoxShadow = styled.div`
    box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
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
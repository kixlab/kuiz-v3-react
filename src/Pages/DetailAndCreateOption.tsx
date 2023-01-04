import styled from '@emotion/styled';
import { CreateNewOption } from '../Components/CreateNewOption';
import { QExplain } from '../Components/QExplain';

export function DetailAndCreateOption() {
    return (
        <QuestionBox>
            <QExplain type="Objective"/>
            <QExplain type="Explanation"/>
            <DividerLine/>
            <div className='Label'>Q. abcd</div>
            <div>
                <Option>✅Option1</Option>
                <Option>❌Option1</Option>
                <Option>❌Option1</Option>
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

const Option = styled.div`
    background-color: #f1f1f1;
    padding: 16px;
    margin-bottom: 6px;
    border-radius: 6px;
`

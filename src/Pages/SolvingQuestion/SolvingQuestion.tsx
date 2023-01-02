import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export function SolvingQuestion() {
    //from DB (this is an example options) -> should edit
    const options: string[] = ["Answer", "Distractor1", "Distractor2", "Distractor3"]
    const [selectedOption, setSelectedOption] = useState<number>(0);

    return (
        <QuestionBox>
            <Label>Q. What is the question?</Label>
            <div>
                {options.map((e,idx) => {
                    return (
                        <Option onClick={()=> setSelectedOption(idx)} selected={selectedOption} keyNum={idx}>{e}</Option>
                    )
                })}
            </div>
            <BtnDisplay>
                <FillBtn>Submit</FillBtn>
                <StrokeBtn>Button2</StrokeBtn>
                <StrokeBtn>Button3</StrokeBtn>
            </BtnDisplay>
        </QuestionBox>
    )
}

const QuestionBox = styled.div`
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 30px;
    @media (max-width: 599px) {
        margin: 30px 0 30px 0;
    }
`

const Label = styled.div`
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    padding: 8px 0 16px;
    @media (max-width: 599px) {
        font-size: 16px;
        padding: 0px;
    }
`

const Option = styled.div`
    background-color: #E9EEF4;
    padding: 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    cursor: pointer;
    border: 1.5px solid rgba(0,0,0,0);
    :hover {
        background-color: #D4E4F3;
    }
    @media (max-width: 599px) {
        font-size: 13px;
    }
    ${({ keyNum, selected } : {keyNum: number, selected: number}) => {
        return keyNum==selected ? 
            `border-color: #3d8add;
            color: #3372B6;
            font-weight: 500;
            background-color: #D4E4F3` : null;

    }}
`

const BtnDisplay = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`
const FillBtn = styled.button`
    @media (max-width: 599px) {
    font-size: 14px;
    }
`

const StrokeBtn = styled.button`
    color: #212121;
    background-color: #fff;
    border: 1px solid #2C3B44;
    :hover {
        background-color: #E9EEF4;
    }
    @media (max-width: 599px) {
        font-size: 14px;
    }
`
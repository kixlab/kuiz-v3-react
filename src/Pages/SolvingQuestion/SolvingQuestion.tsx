import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SolvingQuestion() {
    //from DB (this is an example options) -> should edit
    const optiondb: string[] = ["Answer", "Distractor1", "Distractor2", "Distractor3"]
    const [options, setOptions] = useState<string[]>(optiondb);
    const [selectedOption, setSelectedOption] = useState<string>(optiondb[0]);

    function shuffleOptions() {
        const tmpOptions = [...options];
        tmpOptions.sort(() => Math.random()-0.5)
        setOptions(tmpOptions);
    }

    return (
        <QuestionBox>
            <ReturnBtn onClick={()=>console.log("back to the quizList")}>
                <FontAwesomeIcon icon={faArrowLeft} /> Return to Question List
			</ReturnBtn>
            <Label>Q. What is the question?</Label>
            <div>
                {options.map((e,idx) => {
                    return (
                        <Option onClick={()=> setSelectedOption(e)} selected={selectedOption} val={e} key={idx}>{e}</Option>
                    )
                })}
            </div>
            <BtnDisplay>
                <FillBtn>Submit</FillBtn>
                <StrokeBtn onClick={shuffleOptions}>Shuffle Answers</StrokeBtn>
                <StrokeBtn>Report Question Error</StrokeBtn>
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

const ReturnBtn = styled.div`
    cursor: pointer;
    font-weight: 500;
    color: #616161;
    :hover {
        color: #919191;
    }
`

const Label = styled.div`
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    padding: 8px 0 0 0;
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
    ${({ val, selected } : {val: string, selected: string}) => {
        return val==selected ? 
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
    border: 1px solid #616161;
    :hover {
        background-color: #E9EEF4;
    }
    @media (max-width: 599px) {
        font-size: 14px;
    }
`
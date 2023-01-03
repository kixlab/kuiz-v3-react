import React from 'react';
import styled from 'styled-components';
import { QuizListContent } from '../../Components/QuizList/QuizListContent';
import { QuizListHeader } from '../../Components/QuizList/QuizListHeader';
import "./MainPage.scss";

function MainPage() {
    return (
        <BoxShadow>
            <QuizListHeader/>
            <QuizListContent type="Content"/>
            <QuizListContent type="Content"/>
            <QuizListContent type="Content"/>
            <QuizListContent type="End"/>
        </BoxShadow>
    )
}

const BoxShadow = styled.div`
    box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
    border-radius: 8px;
`

export default MainPage;
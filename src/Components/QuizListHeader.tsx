import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const QuizListHeader = () => {
    return (
        <QuizList id="Header">
            <div>Question</div>
            <div># of Options</div>
            <div>Last Updated</div>
        </QuizList>
    )
}

const QuizList = styled.div<{id:'Header'}>`
    display: grid;
    grid-template-columns: auto 100px 140px;
    background-color: white;
    place-items: left;
    padding: 20px;
    ${props=>props.id === 'Header' && css`
        height: auto;
        background-color: #3d8add;
        color: white;
        border-radius: 8px 8px 0 0;
        margin-top: 40px;
    `}
`

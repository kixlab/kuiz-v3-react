import React from 'react';
import styled from 'styled-components';
import "./MadeStem.scss";

const MadeStem = () => {
    return (
        <StemBox>
            <div className="RowFlex">
                <div className='QSymbol'>Q.</div>
                <div>What is the question?</div>
            </div>
            <div id="EditBtns" className="RowFlex">
                <div id='DeleteBtn'>Delete</div>
                <div id='MoveBtn'>View</div>
            </div>
        </StemBox>

    )
}

const StemBox = styled.div`
    background-color: white;
    padding: 16px 24px 0px 24px;
    border-radius: 8px;
`


export default MadeStem;
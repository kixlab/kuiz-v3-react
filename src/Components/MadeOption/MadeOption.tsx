import React from 'react';
import styled from 'styled-components';
import "./MadeOption.scss";

const MadeOption = (props:{optionType:string}) => {
    return (
        <OptionBox>
            <div className="RowFlex">
                <div id={props.optionType} className='Tag'>{props.optionType}</div>
                <div>option</div>
            </div>
            <div className="RowFlex">
                <div className='QSymbol'>Q.</div>
                <div>What is the question?</div>
            </div>
            <div id="EditBtns" className="RowFlex">
                <div id='DeleteBtn'>Delete</div>
                <div id='MoveBtn'>View</div>
            </div>
        </OptionBox>

    )
}

const OptionBox = styled.div`
    background-color: white;
    padding: 16px 24px 0px 24px;
    border-radius: 8px;
`


export default MadeOption;
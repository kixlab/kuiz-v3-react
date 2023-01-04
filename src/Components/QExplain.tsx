import styled from '@emotion/styled';

export const QExplain = (props:{type:string}) => {
    let label='';

    if (props.type=="Objective"){
        label = 'Learning Objective';
    }
    else label = 'Explanation';
    
    return (
            <div className='LabelBox'>
                <Label>{label}</Label>
                <div>abcd</div>
            </div>

    )
}

const Label = styled.div`
    color: #1f74ce;
    font-weight: 700;
    padding: 30px 0 16px;
`

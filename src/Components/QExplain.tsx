import styled from '@emotion/styled';
import draftToHtml from 'draftjs-to-html';
interface props{
    title: string
    information: any
}

export const QExplain = (props:props) => {
    let label='';

    if (props.title=="Objective"){
        label = 'Learning Objective';
        return (
            <div className='LabelBox'>
                <Label>{label}</Label>
                <div>{props.information}</div>
            </div>
        )
    }else{
        label = 'Explanation';
        return (
            <div className='LabelBox'>
                <Label>{label}</Label>
                <div dangerouslySetInnerHTML={{
					__html: draftToHtml(JSON.parse(props.information)),
				}}/>
            </div>
        )
    } 
}

const Label = styled.div`
    color: #1f74ce;
    font-weight: 700;
    padding: 30px 0 16px;
`

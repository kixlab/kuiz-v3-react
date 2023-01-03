import React, { useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';

export function SolvingQuestion() {
    const navigate = useNavigate();
    //SAMPLE OPTION LIST
    const sampleOptions: Array<string> = ["Answer", "Distractor1", "Distractor2", "Distractor3"]
    const [qInfo, setQInfo] = useState<Object>();
    const [options, setOptions] = useState<Array<string>>(sampleOptions);
    const [selectedOption, setSelectedOption] = useState<string>(sampleOptions[0]);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const ansRef = useRef<string>('');

    /* CONNECTING DB AFTER FINISHING STATE CONTROL(BUILDING....)
    const qid = useParams().id;
	const cid = useParams().cid;

    function shuffle(arr:Array<any>) {
        return [...arr].sort(() => 0.5 - Math.random())
    }

    function getMultipleRandom(arr: Array<any>, num: number) {
		const shuffled = shuffle(arr);
		return shuffled.slice(0, num);
	}

    function getShuffledOptions() {
        axios.get(`${process.env.REACT_APP_BACK_END}/question/detail/load?qid=` + qid).then((res) => {
			axios
				.get(`${process.env.REACT_APP_BACK_END}/question/load/cluster?qid=` + qid)
				.then((res2) => {
					const cluster = res2.data.cluster;
					const ans = cluster.filter((c:any) => c.representative.is_answer).map((e:any) => e.representative);
					const dis = cluster.filter((c:any) => !c.representative.is_answer).map((e:any) => e.representative);
					const ansList = getMultipleRandom(ans, 1);
					const disList = getMultipleRandom(dis, 3);

                    ansRef.current = ans;
					setOptions(shuffle(ansList.concat(disList)));
				})
				.catch((err) => console.log(err));
            setQInfo(res.data.qinfo);
		});
        setSelectedOption('');
    }
    */

    function submit() {
        //DEMO VALUE FOR SIMULATING
        ansRef.current = 'Answer';
        if (selectedOption == ansRef.current) {
            alert("CORRECT!");
            setIsAnswered(true);
        }
        else console.log("WRONG")
    }

    return (
        <QuestionBox>
            <ReturnBtn onClick={()=>navigate('/')}>
                <FontAwesomeIcon icon={faArrowLeft} /> Return to Question List
			</ReturnBtn>
            <Label>Q. What is the question?</Label>
            <div>
                {options.map((e,idx) => {
                    return (
                        <Option onClick={()=> isAnswered==false && setSelectedOption(e)} state={isAnswered} selected={selectedOption} val={e} key={idx}>{e}</Option>
                    )})
                }
            </div>
            <BtnDisplay>
                {isAnswered==false ? <>
                    <FillBtn onClick={submit}>Submit</FillBtn>
                    <StrokeBtn onClick={() => {setOptions([...options].sort(()=> Math.random()-0.5)); setSelectedOption('')}}>Shuffle Answers</StrokeBtn> {/* FOR NOW, SHUFFLING FUNCTION IS A SAMPLE FUNCTION */}
                </> : <FillBtn>Add Option</FillBtn>}
                <StrokeBtn>Report Question Error</StrokeBtn>
            </BtnDisplay>
        </QuestionBox>
    )
}

interface OptionProps {
    state: boolean, 
    val: string,
    selected: string,
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

const Option = styled.div<OptionProps>`
    background-color: #E9EEF4;
    padding: 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    border: 1.5px solid rgba(0,0,0,0);
    :hover {
        ${(props) => {
            return props.state==false ? 
                `background-color: #D4E4F3;
                cursor: pointer;` : null;
        }}
    }
    @media (max-width: 599px) {
        font-size: 13px;
    }
    ${(props) => {
        return props.val==props.selected ? 
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
    border: 1px solid #858585;
    :hover {
        background-color: #E9EEF4;
    }
    @media (max-width: 599px) {
        font-size: 14px;
    }
`
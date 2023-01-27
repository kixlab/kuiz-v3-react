import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { RootState } from '../state/store'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
//SAMPLE OPTION LIST
const ObjectID = require("bson-objectid");

interface qinfoType {
  action_verb: string[];
  author: string;
  class:string;
  contributor: string[]
  createdAt: string
  explanation: string
  keyword: string[]
  learning_objective: string
  optionSets: string[]
  options: string[]
  raw_string: string
  report: string[]
  stem_text: string
  updatedAt: string
  __v:number
  _id: string
}

interface optionListType{
  author:string;
  class:string;
  dependency: {
    same: string[]
    contradictory: string[]
    _id: string
  }
  disjointSet: string
  disliked: string[]
  explanation: string
  includedSet: string[]
  is_answer: boolean
  keyWords: string[]
  liked: string[]
  option_text: string
  plausible:{
    similar: string[]
    difference: string[]
    _id: string
  }
  qstem: string
  suggesetions: string[]
  __v: number 
  _id: string
}

interface clusterType{
  options: optionListType[]
  representative: optionListType
}

export function SolvingQuestion() {
  const navigate = useNavigate()
  const qid = useParams().id;
	const cid = useParams().cid;
	const uid = useSelector((state:RootState) => state.userInfo._id);
	const [optionSet, setOptionSet] = useState<optionListType[]>();
	const [options, setOptions] = useState([]);
	const [qinfo, setQinfo] = useState<qinfoType>();
	const [ansVisible, setAnsVisible] = useState(true);
	const [selected, setSelected] = useState<number>();
	const [answer, setAnswer] = useState(0);
	const [isSolved, setIsSolved] = useState(false);

	const [ans, setAns] = useState([]);
	const [dis, setDis] = useState([]);

	function getMultipleRandom(arr:optionListType[], num:number) {
		const shuffled = [...arr].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, num);
	}

	function shuffle(array:optionListType[]) {
		array.sort(() => Math.random() - 0.5);
		return array;
	}

	const getQinfo = useCallback((qid:string|undefined) => {
		let optionList;
		axios.get(`${process.env.REACT_APP_BACK_END}/question/detail/load?qid=` + qid).then((res) => {
			axios
				.get(`${process.env.REACT_APP_BACK_END}/question/load/cluster?qid=` + qid)
				.then((res2) => {
					const cluster = res2.data.cluster;
					const ans = cluster.filter((c:clusterType) => c.representative.is_answer);
					const dis = cluster.filter((c:clusterType) => !c.representative.is_answer);
					const ansList = getMultipleRandom(ans, 1);
					const disList = getMultipleRandom(dis, 3);
          

					optionList = shuffle(
						ansList.map((a:any) => a.representative).concat(disList.map((d:any) => d.representative))
					);

					setAns(ans);
					setDis(dis);
          
					setOptionSet(optionList);

					optionList.forEach((o:any, i:number) => {
						if (o.is_answer) {
							setAnswer(i);
						}
					});
				})
				.catch((err) => console.log(err));
			setOptions(res.data.options);
			setQinfo(res.data.qinfo);
		});
	}, []);

	const checkAnswer = () => {
		if (!ansVisible) {
			axios
				.post(`${process.env.REACT_APP_BACK_END}/question/solve`, {
					qid: qid,
					uid: uid,
					initAns: optionSet && selected && optionSet[selected]._id,
					isCorrect: selected === answer,
					optionSet: options.map((o:any) => ObjectID(o._id)),
				})
				.then((res) => {
					console.log("success:", res.data.success);
				});
		}
		setAnsVisible(!ansVisible);
	};

	const background = (index:number) => {
    if(!isSolved){
      return "wrong-selected";
    }else{
			if (index === answer) {
				return "answer";
			} else {
					return "wrong-selected";
			}
    }
	};

	useEffect(() => {
		getQinfo(qid);
	}, [getQinfo, qid]);

	const shuffleOptions = () => {
		getQinfo(qid);
		setIsSolved(false);
		setSelected(-1);
		setAnsVisible(false);
	};

  return (
    <QuestionBox>
      <ReturnBtn onClick={() => navigate('/' + cid)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Return to Question List
      </ReturnBtn>
      <Label>{qinfo && JSON.parse(qinfo.stem_text).blocks[0].text}</Label>
      <div>
        {optionSet?.map((e:any, i:number) => {
          return (
            <Option onClick={()=>{
              setSelected(i)
              setIsSolved(true)}} 
              state={isSolved} selected={selected === i} key={i} id={background(i)}>
              {e.option_text}
            </Option>
          )
        })}
      </div>
      <BtnDisplay>
            <FillBtn onClick={checkAnswer} disabled={isSolved == false ? true : false}>
              Submit
            </FillBtn>
            <StrokeBtn onClick={shuffleOptions}>Shuffle Answers</StrokeBtn>
          {/* <FillBtn>Add Option</FillBtn> */}
        {/* <StrokeBtn onClick={toggleModal}>Report Error</StrokeBtn>
        <InputDialog modalState={isOpenModal} submit={reportSubmit} toggleModal={toggleModal} /> */}
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
  font-size: 15px;
  font-family: 'inter-m';
  color: #616161;
  :hover {
    color: #919191;
  }
`

const Label = styled.div`
  font-size: 20px;
  font-family: 'inter-sb';
  line-height: 1.4;
  padding: 8px 0 0 0;
  @media (max-width: 599px) {
    font-size: 16px;
    padding: 0px;
  }
`

const Option = styled.div<{ state: boolean; selected: boolean; id:string}>`
  ${({ state, selected, id }) => css`
    background-color: #e9eef4;
    padding: 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    border: 1.5px solid rgba(0, 0, 0, 0);

    ${!state &&
    css`
      :hover {
        background-color: #d4e4f3;
        cursor: pointer;
      }
    `}
    @media (max-width: 599px) {
      font-size: 13px;
    }

    ${selected &&
    css`
      border-color: #3d8add;
      color: #3372b6;
      font-family: 'inter-m';
      background-color: #d4e4f3;
    `}

    ${id==='answer' &&
    css`
      border-color: green;
      background-color: green;
    `}
  `}
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
  color: #323232;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  :hover {
    background-color: #e9eef4;
  }
  @media (max-width: 599px) {
    font-size: 14px;
  }
`

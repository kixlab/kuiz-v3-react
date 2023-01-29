import styled from '@emotion/styled';
import { CreateNewOption } from '../Components/CreateNewOption';
import { QExplain } from '../Components/QExplain';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import { qinfoType } from '../apiTypes/qinfo';
import { optionType } from '../apiTypes/option';

const ObjectID = require("bson-objectid");

export function DetailAndCreateOption() {
	const navigate = useNavigate();
	const qid = useParams().id;
	const cid = useParams().cid;
	const uid = useSelector((state:RootState) => state.userInfo._id);
    const [ansList, setAnsList] = useState<optionType[]>([]);
	const [disList, setDistList] = useState<optionType[]>([]);
	const [qinfo, setQinfo] = useState<qinfoType>();
	const [similarOptions, setSimilarOptions] = useState<string[]>([]);

    // My option values
	const [option, setOption] = useState("");
	const [isAnswer, setIsAnswer] = useState(false);
	const [keywords, setKeywords] = useState<string[]>([]);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BACK_END}/question/option/load?qid=` + qid).then((res) => {
			const ans = res.data.options.filter((op:optionType) => op.is_answer === true);
			const dis = res.data.options.filter((op:optionType) => op.is_answer === false);

			setAnsList(ans);
			setDistList(dis);
			setQinfo(res.data.qinfo);
		});
	}, [navigate, qid, setAnsList, setDistList, setQinfo ]);

	const submit = useCallback(async () => {
		const optionData = {
			author: ObjectID(uid),
			option_text: option,
			is_answer: isAnswer,
			class: ObjectID(cid),
			qstem: ObjectID(qid),
			keywords: keywords,
		};

        if(keywords.length>0 && option.length>0){
            if(keywords.includes('Form similar to answer')){
                ansList.map((item:optionType)=>{
                    if(!similarOptions.includes(item._id)){
                        setSimilarOptions([item._id, ...similarOptions])
                    }
                })
            }
        }

        await axios
            .post(`${process.env.REACT_APP_BACK_END}/question/option/create`, {
                optionData: optionData,
                similarOptions: similarOptions,
            }).then(()=>{navigate("/"+cid)})
	},[cid, isAnswer, keywords, navigate, option, qid, similarOptions, uid])

    return (
        <QuestionBox>
            {
                qinfo &&
                <>
                    <QExplain title="Objective" information={qinfo.learning_objective}/>
                    <QExplain title="Explanation" information={qinfo.explanation}/>
                    <DividerLine />
                    <div dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(qinfo.stem_text))}}/> 
                </>
            }
            
            <div>
                {ansList.map((item:any) => (
                    <Option key={item._id}>✅{item?.option_text}</Option>
                ))}
                {disList.map((item:any) => (
                    <Option key={item._id}>❌{item?.option_text}</Option>
                ))}
            </div>
            <DividerLine/>
            <CreateNewOption isAnswer={isAnswer} setIsAnswer={setIsAnswer} setOption={setOption} setKeywords={setKeywords} onSubmit={submit}/>
        </QuestionBox>
    )
}

const QuestionBox = styled.div`
  border-radius: 8px;
  background-color: white;
  margin: 40px 0 40px 0;
  padding: 10px 30px 30px 30px;
`

const DividerLine = styled.hr`
  border: 0;
  height: 1px;
  background-color: #dbdbdb;
  margin: 30px 0 20px 0;
`
const Option = styled.div`
    background-color: #f1f1f1;
    padding: 16px;
    margin-bottom: 6px;
    border-radius: 6px;
`

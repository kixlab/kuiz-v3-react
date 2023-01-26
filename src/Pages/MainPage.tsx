import styled from '@emotion/styled';
import { QuizListContent } from '../Components/QuizListContent';
import { QuizListHeader } from '../Components/QuizListHeader';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../state/store';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function MainPage() {
    const navigate = useNavigate();
	const cid = useParams().cid;
	const uid = useSelector((state:RootState) => state.userInfo._id);

	const checkValidUser = useCallback(() => {
		axios
			.post(`${process.env.REACT_APP_BACK_END}/auth/check/inclass`, {
				cid: cid,
				uid: uid,
			})
			.then((res) => {
				if (res.data.inclass) {
					axios.get(`${process.env.REACT_APP_BACK_END}/auth/class/type?cid=` + cid).then(() => {
						getQuestionList(cid);
					});
				} else {
					if (!res.data.enrolled) {
						navigate("/enroll");
					} else {
						axios
							.get(`${process.env.REACT_APP_BACK_END}/auth/class/type?cid=` + res.data.cid)
							.then(() => {
								getQuestionList(res.data.cid);
							});
					}
				}
			});
	}, [cid, uid, navigate]);

	const [questionList, setQuestionList] = useState([]);

	const getQuestionList = (cid:string|undefined) => {
		axios
			.get(`${process.env.REACT_APP_BACK_END}/question/list/load?cid=` + cid)
			.then(async (res) => {
				setQuestionList(res.data.problemList);
			});
	};

	useEffect(() => {
		checkValidUser();
	}, [checkValidUser]);
    return (
        <BoxShadow>
            <QuizListHeader/>
            {questionList
                .map((question:any,index:number)=>{
                    console.log(question)
                    return(
                        <QuizListContent 
                            key={index}
                            index={index+1}
                            title={question.raw_string}
                            options={question.options.length}
                            date={question.updatedAt ? question.updatedAt : question.createdAt}
                            type={index+1===questionList.length? 'End' : 'Content'}/>)
            })}
        </BoxShadow>
    )
}

const BoxShadow = styled.div`
    box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
    border-radius: 8px;
`

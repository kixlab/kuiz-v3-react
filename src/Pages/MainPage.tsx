import styled from '@emotion/styled';
import { QuizListContent } from '../Components/QuizListContent';
import { QuizListHeader } from '../Components/QuizListHeader';
import { useNavigate } from 'react-router-dom';
import { useParams,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../state/store';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface propsType{
	createOptions: boolean
}
export function MainPage(props:propsType) {
    const navigate = useNavigate();
	const cid = useParams().cid;
	const [questionList, setQuestionList] = useState([]);
	const [validList, setValidList] = useState([false]);
	const uid = useSelector((state:RootState) => state.userInfo._id);
	const getQuestionList = useCallback((cid:string) => {
			axios
				.get(`${process.env.REACT_APP_BACK_END}/question/list/load?cid=` + cid)
				.then(async (res) => {
					const valid = [false];

					await Promise.all(
						res.data.problemList.map(async (q:any, i:number) => {
							await axios

								.get(`${process.env.REACT_APP_BACK_END}/question/load/cluster?qid=` + q._id)
								.then(async (res2) => {
									const clusters = await res2.data.cluster;

									const ans = clusters.filter((c:any) => c.representative.is_answer).length;
									const dis = clusters.filter((c:any) => !c.representative.is_answer).length;

									if (ans + dis >= 4) {
										valid[i] = true;
										return true;
									} else {
										valid[i] = false;
										return false;
									}
								})
								.catch((err) => console.log(err));
						})
					);

					setValidList(valid);
					setQuestionList(res.data.problemList);
				});
		},
		[]
	);

	const checkValidUser = useCallback(() => {
		axios
			.post(`${process.env.REACT_APP_BACK_END}/auth/check/inclass`, {
				cid: cid,
				uid: uid,
			})
			.then((res) => {
				if (res.data.inclass) {
					getQuestionList(res.data.cid);
				} else {
					if (!res.data.enrolled) {
						navigate("/enroll");
					} else {
						axios
							.get(`${process.env.REACT_APP_BACK_END}/auth/class/type?cid=` + res.data.cid)
							.then((res2) => {
								getQuestionList(res2.data.cid);
							});
					}
				}
			});
	}, [cid, uid, getQuestionList, navigate]);

	useEffect(() => {
		checkValidUser();
	}, [checkValidUser]);

    return (
        <BoxShadow>
            <QuizListHeader/>
			{questionList
						.filter((q:any, j:number) => validList[j])
						.map((question:any, index:number) => (
							<Link
								key={question._id}
								to={props.createOptions ? "/" + cid + "/question/" + question._id + "/createOption" : "/" + cid + "/solve/" + question._id}>
									<QuizListContent 
										key={index}
										index={index+1}
										title={question.raw_string}
										options={question.options.length}
										date={question.updatedAt ? question.updatedAt : question.createdAt}
										type={index+1===questionList.length? 'End' : 'Content'}/></Link>
										))
										.reverse()}
        </BoxShadow>
    )
}

const BoxShadow = styled.div`
    box-shadow: 0px 0px 16px rgba(40, 40, 40, 0.12);
    border-radius: 8px;
`

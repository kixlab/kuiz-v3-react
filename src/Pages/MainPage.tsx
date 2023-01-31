import styled from '@emotion/styled';
import { QuizListContent } from '../Components/QuizListContent';
import { QuizListHeader } from '../Components/QuizListHeader';
import { useNavigate } from 'react-router-dom';
import { useParams,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../state/store';
import { useEffect, useState } from 'react';
import { Post } from '../utils/apiRequest';
import { qinfoType } from '../apiTypes/qinfo';
import { clusterType } from '../apiTypes/cluster';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export function MainPage() {
    const navigate = useNavigate();
	const cid = useParams().cid;
	const location = useLocation()
	const createOptions = location.pathname.includes('qlist')
	const uid = useSelector((state:RootState) => state.userInfo._id);
	const [questionList, setQuestionList] = useState<qinfoType[]>([]);
	const [validList, setValidList] = useState([false]);

	const getQuestionList = useCallback((cid:string) => {
			axios
				.get(`${process.env.REACT_APP_BACK_END}/question/list/load?cid=` + cid)
				.then(async (res) => {
					console.log(res)
					const valid = [false];

					await Promise.all(
						res.data.problemList.map(async (q:qinfoType, i:number) => {
							await axios
								.get(`${process.env.REACT_APP_BACK_END}/question/load/cluster?qid=` + q._id)
								.then(async (res2) => {
									const clusters = await res2.data.cluster;

									const ans = clusters.filter((c:clusterType) => c.representative.is_answer).length;
									const dis = clusters.filter((c:clusterType) => !c.representative.is_answer).length;

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

	interface PostInclassResponse{
		cid: string
		enrolled: true
		inclass: true
		valid: true
	}
	const checkValidUser = useCallback(() => {
		Post(`${process.env.REACT_APP_BACK_END}/auth/check/inclass`, {
				cid: cid,
				uid: uid,
			})
			.then((res:any) => {
				if (res.inclass) {
					getQuestionList(res.cid);
				} else {
					if (!res.enrolled) {
						navigate("/");
					} else {
						axios
							.get(`${process.env.REACT_APP_BACK_END}/auth/class/type?cid=` + res.cid)
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
						.filter((q:qinfoType, j:number) => validList[j])
						.map((question:qinfoType, index:number) => (
							<Link
								style={{ color: 'inherit', textDecoration: 'none' }}
								key={question._id}
								to={createOptions ? "/" + cid + "/question/" + question._id + "/createOption" : "/" + cid + "/solve/" + question._id}>
									<QuizListContent 
										key={index}
										index={index+1}
										title={question.raw_string}
										options={question.options.length}
										date={question.updatedAt ? new Date(question.updatedAt) : new Date(question.createdAt)}
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

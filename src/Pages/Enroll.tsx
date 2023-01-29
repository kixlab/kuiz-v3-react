import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { enroll, login } from '../state/features/userSlice';
import { RootState } from '../state/store';

export function Enroll() {
    const navigate = useNavigate();
	const dispatch = useDispatch();
	const [code, setCode] = useState<string>();
	const uid = useSelector((state:RootState) => state.userInfo._id);
	const email = useSelector((state:RootState) => state.userInfo.email);
	const detectChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};
	const userInfo = useSelector((state:RootState) => state.userInfo);

    useEffect(()=>{
        if(userInfo.classes.length>0){
            const cid = userInfo.classes[0]
            navigate("/"+cid)
        }
    },[])

	const onSubmit = () => {
		axios
			.post(`${process.env.REACT_APP_BACK_END}/auth/class/join`, {
				code: code,
				_id: uid,
				userEmail: email,
			})
			.then((res) => {
				dispatch(enroll({ cid: res.data.cid, cType: res.data.cType }));
				const newInfo = { ...userInfo };
				newInfo["classes"] = [res.data.cid];
				dispatch(login(newInfo));
				navigate("/" + res.data.cid);
			});
	};
    return (
        <CodeInputBox>
            <strong>Class code</strong>
            <ClassCodeInput type="text" placeholder='Enter code' onChange={detectChange}/>
            <EnrollBtn onClick={onSubmit}>Enter</EnrollBtn>
        </CodeInputBox>
    )
}

const CodeInputBox = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 100px 60px 30px 60px;
    box-sizing: border-box;
    font-size: 18px;
`

const ClassCodeInput = styled.input`
    width: 234px;
    padding: 16px;
    border-radius: 6px;
    border: 1px solid #cdcdcd;
    font-size: 16px;
    &:placeholder{
        color: #bdbdbd;
    }
    &:focus{
        outline: none;
        border: 1px solid #212121;
    }
`

const EnrollBtn = styled.button`
    width: 234px;
`

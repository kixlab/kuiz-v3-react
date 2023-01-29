import axios from 'axios'
import styled from '@emotion/styled'
import { MadeOption } from '../Components/MadeOption'
import { MadeStem } from '../Components/MadeStem'
import { googleLogout } from '@react-oauth/google'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback,useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../state/features/userSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { optionType } from '../apiTypes/option'
import { qinfoType } from '../apiTypes/qinfo'

interface optionWithQinfo extends optionType{
  qinfo: qinfoType
}

export function MyPage(props: { stemNum: number; optionNum: number }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const uid = useSelector((state: RootState) => state.userInfo?._id)
  const [madeStem, setMadeStem]=useState<qinfoType[]>([])
  const [madeOption, setMadeOption]=useState<optionWithQinfo[]>([])

  const getMadeStem = useCallback(() => {
		axios.post(`${process.env.REACT_APP_BACK_END}/question/made/stem`, { uid: uid }).then((res) => {
			setMadeStem(res.data.madeStem.reverse());
		});
	}, [uid]);

  const getMadeOption = useCallback(() => {
		axios.post(`${process.env.REACT_APP_BACK_END}/question/made/option`, { uid: uid }).then((res) => {
			axios
				.post(`${process.env.REACT_APP_BACK_END}/question/qstembyoption`, {
					qstems: res.data.madeOption.map((o:optionType) => o.qstem),
				})
				.then((res2) => {
					const optionList = res.data.madeOption;
					const qlist = res2.data.qstems.map((qstem:string) => {
						return { qinfo: qstem };
					});
					const newOptionList = optionList.map((option:optionType, index:number) => ({
						...option,
						...qlist[index],
					}));
					setMadeOption(newOptionList.reverse());
				});
		});
	}, [uid]);

  const signOut = useCallback(() => {
    googleLogout()
    dispatch(logout())
    navigate('/login')
  }, [])

  useEffect(() => {
		getMadeStem();
		getMadeOption();
	}, [getMadeOption, getMadeStem]);

  return (
    <div>
      <div>
        <DataLabel>
          <div style={{ color: '#212121' }}>Created Question Stems</div>
          {props.stemNum}
        </DataLabel>
        <MadeLists>
          {madeStem.map((stem:qinfoType)=>{
            return(
              <MadeStem key={stem._id}
                question={stem.raw_string}/>
            )
          })}
        </MadeLists>
      </div>
      <div>
        <DataLabel>
          <div style={{ color: '#212121' }}>Created Options</div>
          {props.optionNum}
        </DataLabel>
        <MadeLists>
          {madeOption.map((option:optionWithQinfo)=>{
            return(
              <MadeOption key={option._id} optionType={option.is_answer ? "Answer" : "Distractor"} question={option.qinfo.raw_string} option={option.option_text}/>
            )
          })}
        </MadeLists>
      </div>
      <StrokeBtn onClick={signOut}>Log Out</StrokeBtn>
    </div>
  )
}

const MadeLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`

const DataLabel = styled.div`
  color: #1f74ce;
  font-weight: 700;
  padding: 30px 0 16px;
  display: flex;
  gap: 10px;
`

const StrokeBtn = styled.button`
  width: 200px;
  color: #212121;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  margin-bottom: 30px;
  :hover {
    background-color: #e9eef4;
  }
  @media (max-width: 599px) {
    font-size: 14px;
  }
`

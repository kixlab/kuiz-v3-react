import styled from '@emotion/styled'
import { FillBtn } from '../Components/basic/button/Button'
import { TextEditor } from '../Components/TextEditor'
import { Label } from '../Components/basic/Label'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { palette } from '../styles/theme'
import ObjectID from 'bson-objectid';
import { Post } from '../utils/apiRequest';
import { TextInput } from '../Components/basic/InputBox'

export function CreateQuestion() {
  const navigate = useNavigate();
  const cid = useParams().cid;
  const uid = useSelector((state:RootState)=>state.userInfo._id)
  const [answer, setAnswer] = useState("");
  const [objective,setObjective] = useState("")
  const [explanation, setExplanation] = useState<EditorState>(() => EditorState.createEmpty());
  const [question, setQuestion] = useState<EditorState>(() => EditorState.createEmpty());

  function updateObjective(e:React.ChangeEvent<HTMLInputElement>){
    setObjective(e.target.value)
  }

  function updateAnswer(e:React.ChangeEvent<HTMLInputElement>){
    setAnswer(e.target.value)
  }

  function submitStem(){
		const qstemObj = {
			uid: ObjectID(uid),
			stem_text: JSON.stringify(convertToRaw(question.getCurrentContent())),
			raw_string: question.getCurrentContent().getPlainText("\u0001"),
			explanation: JSON.stringify(convertToRaw(explanation.getCurrentContent())),
			action_verb: [],
			keyword: [],
			cid: cid && ObjectID(cid),
			options: [],
			optionSets: [],
			learning_objective: objective,
		};

		const rawString = qstemObj.raw_string;
		const wordcount = rawString.split(" ").filter((word) => word !== "").length;
		if (rawString === null || wordcount < 1) {
			alert("Please enter a question.");
			return;
		}
		if (answer === null || answer.match(/^\s*$/) !== null) {
			alert("Please enter an answer.");
			return;
		}
		if (qstemObj.learning_objective === null) {
			alert("Please enter learning objective.");
			return;
		}

    Post(`${process.env.REACT_APP_BACK_END}/question/qstem/create`,{
      qstemObj: qstemObj,
      cid: cid,
      answer_text: answer,
    }).then((res:any) => {Post(`${process.env.REACT_APP_BACK_END}/question/option/create`,{
      optionData: {
        author: ObjectID(uid),
        option_text: answer,
        is_answer: true,
        class: cid && ObjectID(cid),
        qstem: ObjectID(res.data.data),
      },
      similarOptions: [],
    }).then(() => {
      navigate("/" + cid + "/question/" + res.data.data + "/createOption");
    })})
	}

  return (
    <CreateQBox>
      <div>
        <Label text="Learning Objective" color="blue" size={0} />
        <TextInput placeholder="Objective" onChange={updateObjective}/>
      </div>
      <div>
        <Label text="Question Stem" color="blue" size={0} />
        <TextEditor editorState={question} onChange={setQuestion}/>
      </div>
      <div>
        <Label text="Explanation" color="blue" size={0} />
        <TextEditor editorState={explanation} onChange={setExplanation}/>
      </div>
      <div>
        <Label text="Answer" color="blue" size={0} />
        <TextInput placeholder="Suggest an answer" onChange={updateAnswer}/>
      </div>
      <FillBtn onClick={submitStem} >Submit</FillBtn>
    </CreateQBox>
  )
}

const CreateQBox = styled.div`
  background-color: ${palette.common.white};
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0 30px 0;
`

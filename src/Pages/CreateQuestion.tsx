import styled from '@emotion/styled'
import { TextEditor } from '../Components/TextEditor'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import axios from 'axios';

const ObjectID = require("bson-objectid");

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
			cid: ObjectID(cid),
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
		axios
			.post(`${process.env.REACT_APP_BACK_END}/question/qstem/create`, {
				qstemObj: qstemObj,
				cid: cid,
				answer_text: answer,
			})
			.then((res) => {
				axios
					.post(`${process.env.REACT_APP_BACK_END}/question/option/create`, {
						optionData: {
							author: ObjectID(uid),
							option_text: answer,
							is_answer: true,
							class: ObjectID(cid),
							qstem: ObjectID(res.data.data),
						},
						similarOptions: [],
					})
					.then(() => {
						navigate("/" + cid + "/question/" + res.data.data + "/createOption");
					});
			});
	}

  return (
    <CreateQBox>
      <div>
        <QuestionLabel>Learning Objective</QuestionLabel>
        <Input type="text" placeholder="Objective" onChange={updateObjective}/>
      </div>
      <TextEditor title="Question Stem" editorState={question} onChange={setQuestion}/>
      <TextEditor title="Explanation" editorState={explanation} onChange={setExplanation}/>
      <div>
        <QuestionLabel>Answer</QuestionLabel>
        <Input type="text" placeholder="Suggest an answer" onChange={updateAnswer}/>
      </div>
      <button onClick={submitStem} >Submit</button>
    </CreateQBox>
  )
}

const CreateQBox = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0 30px 0;
`

const QuestionLabel = styled.div`
  color: #3d8add;
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 12px;
`

const Input = styled.input`
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #bdbdbd;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  &:placeholder {
    color: #b7bfc7;
  }
  &:focus {
    outline: none;
    border-color: #212121;
  }
`

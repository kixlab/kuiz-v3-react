import styled from '@emotion/styled';
import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface props{
  title: string
  editorState: EditorState
  onChange: (state:EditorState)=>void
}

export const TextEditor = (props:props) => {
    // const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
    // const onEditorStateChange = (editorState:EditorState) => {
    //   setEditorState(editorState);
    //   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // }

    return (
      <div>
        <QuestionLabel>{props.title}</QuestionLabel>
        <Editor
          editorState={props.editorState}
          editorStyle={editorStyle}
          onEditorStateChange={props.onChange}
          placeholder="Write down the content here"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </div>
    );
  }

const editorStyle = {
  border: '1px solid #dbdbdb',
  padding: '16px',
  borderRadius: '2px',
  height: '200px',
};

const QuestionLabel = styled.div`
  color: #3d8add;
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 12px;
`

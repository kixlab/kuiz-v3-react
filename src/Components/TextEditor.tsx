import styled from '@emotion/styled';
import { CSSProperties } from 'react'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { palette } from '../styles/theme'

interface propsType{
  title: string
  editorState: EditorState
  onChange: (state:EditorState)=>void
}

export const TextEditor = (props:propsType) => {
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

const editorStyle: CSSProperties = {
  border: `1px solid ${palette.grey[500]}`,
  padding: '16px',
  borderRadius: '6px',
  height: '200px',
}

const QuestionLabel = styled.div`
  color: #3d8add;
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 12px;
`

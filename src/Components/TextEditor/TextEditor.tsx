import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.scss';

const TextEditor = (props:{title:string}) => {
  
    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
    const onEditorStateChange = (editorState:EditorState) => {
      setEditorState(editorState);
    }
    return (
      <div>
        <div className="QuestionLabel">{props.title}</div>
        <Editor
          editorState={editorState}
          editorStyle={editorStyle}
          onEditorStateChange={onEditorStateChange}
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

export default TextEditor;
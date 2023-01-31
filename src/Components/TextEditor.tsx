import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { CSSProperties } from 'react'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { palette } from '../styles/theme'

interface Props{
  editorState: EditorState
  onChange: (state:EditorState)=>void
}

export const TextEditor = (props:Props) => {
    return (
        <Editor
          editorState={props.editorState}
          editorStyle={editorStyle}
          onEditorStateChange={props.onChange}
          placeholder="Write down the content here"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
          }}
        />
    );
  }

const editorStyle: CSSProperties = {
  border: `1px solid ${palette.grey[500]}`,
  padding: '16px',
  borderRadius: '6px',
  height: '200px',
}

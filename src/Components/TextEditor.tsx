import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { CSSProperties, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { palette } from '../styles/theme'

export const TextEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty())
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }
  return (
    <Editor
      editorState={editorState}
      editorStyle={editorStyle}
      onEditorStateChange={onEditorStateChange}
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
  )
}

const editorStyle: CSSProperties = {
  border: `1px solid ${palette.grey[500]}`,
  padding: '16px',
  borderRadius: '6px',
  height: '200px',
}

import { createReactEditorJS } from "react-editor-js";
import Paragraph from '@editorjs/paragraph'
import { useEffect } from 'react'

const EditorJs = createReactEditorJS()

const MyEditor = ({handleInitialize, onChange, defaultValue}: any) => {
  const EDITOR_JS_TOOLS = {
    paragraph: Paragraph
  }
  
  return (
    <EditorJs defaultValue={defaultValue} onChange={onChange} onInitialize={handleInitialize} />
  )
}

export default MyEditor;
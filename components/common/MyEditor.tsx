import { createReactEditorJS } from "react-editor-js";
import Paragraph from '@editorjs/paragraph'
import { useEffect } from 'react'

const EditorJs = createReactEditorJS()

const MyEditor = ({handleInitialize, onChange}: any) => {
  const EDITOR_JS_TOOLS = {
    paragraph: Paragraph
  }
  
  return (
    <EditorJs defaultValue={{
      time: 1635603431943,
      blocks: [
        {
          id: "12iM3lqzcm",
          type: "paragraph",
          data: {
            text:
              "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
          }
        }
      ]
    }} onChange={onChange} onInitialize={handleInitialize} />
  )
}

export default MyEditor;
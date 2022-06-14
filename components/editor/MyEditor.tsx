import { createReactEditorJS } from "react-editor-js"
import Table from '@editorjs/table'
import Image from '@editorjs/image'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { useEffect } from 'react'

const EditorJs = createReactEditorJS()

const MyEditor = ({handleInitialize, onChange, data}: any) => {
  const EDITOR_JS_TOOLS = {
    table: Table,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    image: Image,
    simpleImage: SimpleImage,
  }
  
  return (
    <EditorJs tools={EDITOR_JS_TOOLS} data={data} onChange={onChange} onInitialize={handleInitialize} />
  )
}

export default MyEditor;
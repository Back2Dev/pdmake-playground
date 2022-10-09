import { useState } from 'react'
import './App.css'
import Header from '../header/header'
import CodeEditor from '../code-editor/code-editor'
import Footer from '../footer/footer'

const App = () => {

  return (
    <>
      <Header />
      <CodeEditor />
      <Footer />
    </>
  )
}

export default App

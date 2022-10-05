import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Mainbody from './components/mainbody'
import Footer from './components/footer'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Mainbody />
      <Footer />
    </>
  )
}

export default App

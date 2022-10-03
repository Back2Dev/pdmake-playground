import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Mainbody from './components/Mainbody'
import Footer from './components/Footer'

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

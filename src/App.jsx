import { useState } from 'react'
import './App.css'
import SignUp from './components/signup'

function App() {

  const [formDate, setFormData] = useState([])
  
  const handleAdd = (data) => {
    return setFormData([...formDate,data])
  }

  return (
    <div className='w-screen h-screen bg-[#242424] flex justify-center items-center'>
      <SignUp handleAdd={handleAdd} />
    </div>
  )
}

export default App

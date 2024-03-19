import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [addNumber, setAddNumber] = useState(false)
  const [addChar, setAddChar] = useState(false)
  const [password, setPassword] = useState('')

  const generatePassword = useCallback(() =>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(addNumber) str += '0123456789'
    if(addChar) str += '!@#$%^&*()?~'

    for(let i = 1; i < length; i++) {
     const index = Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(index)
    }
    setPassword(pass)
  }, [length, addChar, addNumber])

  useEffect(() => {
    generatePassword()
  }, [length, addNumber, addChar])

  const passwordRef = useRef(null)
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()

  }
  return (
    <div className='password-container'>
      <h1 className='first-head'>Password Generator</h1>
      <div className='passwordfields'>
        <input type="text" 
        value={password} 
        placeholder='Password' 
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}>copy</button>
      </div>
      <div className='criteria'>
        <div className='checkbox'>
          <input 
          type="range" 
          min={8} 
          max={30} 
          value={length} 
          onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length:{length}</label>
        </div>
        <div className='checkbox'>
          <input 
          type="checkbox"
          name="" 
          id="" 
          defaultChecked={addNumber}
          onChange={() => { 
            setAddNumber((prev) => !prev)
          }}/>
          <label htmlFor="numbers">numbers</label>
        </div>
        <div className='checkbox'>
          <input 
          type="checkbox"
          name="" 
          id="" 
          defaultChecked={addChar}
          onChange={() => {
            setAddChar((prev) => !prev)
          }}/>
          <label htmlFor="character">character</label>
        </div>
      </div>
    </div>
  )
}

export default App

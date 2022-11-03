import React, { useEffect, useState } from 'react';
import './App.scss';
import { InputContainer } from './InputContainer';

function App() {
  const [to, setTo] = useState("");
  const [value, setValue] = useState(0);
  const [data, setData] = useState("");

  const handleSubmit = (e:any) => {
    console.log(e.target);
  }

  return (
    <div className="container">

      <InputContainer value={to} setter={setTo} type={"text"} label={"To"}/>

      <div>
        <input value={value} type="number" onChange={e => setValue(parseFloat(e.target.value))} /> ETH
      </div>
      <div>
        <input value={data} type="text" onChange={e => setData(e.target.value)}/>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App; 

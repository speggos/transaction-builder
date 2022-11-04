import React, { useEffect, useState } from 'react';
import './App.scss';
import { InputContainer } from './InputContainer';
import {ethers} from 'ethers';

function App() {
  const [to, setTo] = useState("");
  const [txValue, setTxValue] = useState(0);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const handleSubmit = async () => {
    setError("");

    connectToMetamask();

    const request = {
      from: await signer.getAddress(),
      to: to,
      value: ethers.utils.parseUnits(txValue.toString(), "ether"),
      //data: data
    }

    try {
      await signer.sendTransaction(request);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function connectToMetamask() {
    try {
      await signer.getAddress()
    }
    catch(err) {
      await provider.send("eth_requestAccounts", [])
    }
  }

  return (
    <div className="container">

      <InputContainer value={to} setter={setTo} type={"text"} label={"To"}/>

      <InputContainer value={txValue} setter={setTxValue} type={"number"} label={"Value (In ETH)"} />

      <InputContainer value={data} setter={setData} type={"text"} label={"Data"} />
  
      <button onClick={handleSubmit} className='submit'><div className='text'>Submit</div></button>

      { error && <div className="errorText">{error}</div> }

    </div>
  );
}

export default App; 

declare global {
  interface Window {
    ethereum: any
  }
}
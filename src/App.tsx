import React, { useEffect, useState } from 'react';
import './App.scss';
import { InputContainer } from './InputContainer';
import {ethers} from 'ethers';

function App() {
  const [to, setTo] = useState("");
  const [txValue, setTxValue] = useState(0);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  let signer: any, provider: any, hasProvider = true;
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  } catch {
    hasProvider = false;
  }


  const handleSubmit = async () => {
    setError("");

    connectToMetamask();

    const request = {
      from: await signer.getAddress(),
      to: to,
      value: ethers.utils.parseUnits(txValue.toString(), "ether"),
      data: ethers.utils.toUtf8Bytes(data)
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
    hasProvider 
      ? <div className="container">

        { error && <div className="errorText">Error: {error}</div> }

        <InputContainer value={to} setter={setTo} type={"text"} label={"To"}/>

        <InputContainer value={txValue} setter={setTxValue} type={"number"} label={"Value (In ETH)"} />

        <InputContainer value={data} setter={setData} type={"textArea"} label={"Data"} />
    
        <button onClick={handleSubmit} className='submit'><div className='text'>Submit</div></button>

      </div> 

      : <div className='container'><div className='errorText'>You must install metamask to use this app</div></div> 
  );
}

export default App; 

declare global {
  interface Window {
    ethereum: any
  }
}
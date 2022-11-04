import './App.scss';

export function InputContainer(props: InputContainerInterface) {
    return(
        <div style={{margin:'10px'}}>
            <div className='text'>{props.label}:</div> <br/>
            {props.type === "text" &&  <input value={props.value} type="text" onChange={e => props.setter(e.target.value)} className='input'/> }
            {props.type === "number" &&  <input value={props.value} type="number" onChange={e => props.setter(parseFloat(e.target.value))} className='input'/> }
      </div>
    )
}

interface InputContainerInterface {
    label: String,
    value: any,
    type: "text" | "number",
    setter: Function
}
export function InputContainer(props: InputContainerInterface) {
    return(
        <div style={{flexDirection: 'column'}}>
            {props.label} <br/>
            {props.type === "text" &&  <input value={props.value} type="text" onChange={e => props.setter(e.target.value)}/> }
            {props.type === "number" &&  <input value={props.value} type="number" onChange={e => props.setter(parseFloat(e.target.value))}/> }
      </div>
    )
}

// const styles = {
//     flexDirection: 'column'
// }

interface InputContainerInterface {
    label: String,
    value: any,
    type: "text" | "number",
    setter: Function
}
import React, { useReducer } from 'react'

const emptyObj = {
    name : "",
    password : "",
}

const reducer = (data , action) => {
    return {...data , [action.type]  : action.val}
}

const UseReducerForm = () => {

    const [state , dispatch] = useReducer(reducer , emptyObj);

    console.log("check data :" , state)
  return (
    <div>
      <h1>Use Reducer</h1>
      <input type="text" placeholder='Enter name' onChange={(e) => {dispatch({val : e.target.value , type : "name" })}} />
      <br />
      <br />
      <input type="text" placeholder='Enter password'  onChange={(e) => {dispatch({val : e.target.value , type : "password" })}} />
      <br />
      <br />
      <button>Add Details</button>
    </div>
  )
}

export default UseReducerForm

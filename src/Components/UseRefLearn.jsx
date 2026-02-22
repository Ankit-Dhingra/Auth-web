import React, { useRef } from "react";

const UseRefLearn = () => {
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  console.log("Component Rendered");
  const handleForm = (e) => {
    e.preventDefault();
    console.log("check :", userRef);
    let formValue = {
      name: userRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("cjec : " , formValue)
  };

  const getValue =() => {
    console.log(userRef.current.value)
  }
  return (
    <div>
      <h1>Uncontrolled Component</h1>
      <form onSubmit={handleForm}>
        <br />
        <input
          type="text"
          id="user"
          placeholder="Enter your name"
          ref={userRef}
          onChange={getValue}
        />
        <br />
        <br />
        <input
          type="password"
          ref={passwordRef}
          id="password"
          placeholder="Enter your password"
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UseRefLearn;

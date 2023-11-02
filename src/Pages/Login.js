import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
// import { useDispatch } from "react-redux";
// import { addUserData } from "../Slices/UserSlice";

const Login = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
    };
    // const addUser = (name, email) => {
    //   navigate('/');
    //   // console.log('Input Value:', name, " ", email, " ", dob);
    // //   dispatch(addUserData(name, email, dateOfBirth));
    // };
  return (
    <div className="formParent">
      <Container className="formParent-container" style={{'display':'flex','justifyContent': 'center'}}>
        <Form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={inputEmail}
              onChange={(e)=>setInputEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={inputName}
              onChange={(e)=>setInputName(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ margin: "20px" }}
            // onClick={() => addUser(inputName, inputEmail, dateOfBirth)}
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Login

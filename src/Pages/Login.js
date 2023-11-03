import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { DoLogin } from "../Authentication";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoginStatus } from "../Slices/loginSlice";
import {jwtDecode} from 'jwt-decode';
// import { useDispatch } from "react-redux";
// import { addUserData } from "../Slices/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginDetails);
    dispatch(getLoginStatus(loginDetails))
      .then((data) => {
        if (data != undefined) {
          DoLogin(data, () => {
            console.log("Login details is saved to localStorage", data);
          });
          notify();

          const data2 = localStorage.getItem('data');
          const parsedData = JSON.parse(data2);
          const decodedToken = jwtDecode(parsedData.jwtToken);
          const role = decodedToken.role;

          if(role == "ROLE_ADMIN"){
            navigate("/admin/hierarchy");
          }
          else {
            navigate("/users/dashboard");
          }
          
        }
        else {
          // setShowAlert(true);
          toast.error("Login failed! Invalid Credentials.");
        }
      });
  };

  const notify = () => toast.success("Login Success..");

  const handleChange = (e, field) => {
    let actualValue = e.target.value;

    setLoginDetails({
      ...loginDetails,
      [field]: actualValue
    })
  }


  return (
    <div className="formParent">
      <Container className="formParent-container" style={{ 'display': 'flex', 'justifyContent': 'center' }}>
        <Form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">Email address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={loginDetails.email}
              onChange={(e) => handleChange(e, 'email')}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={loginDetails.password}
              onChange={(e) => handleChange(e, 'password')}
              required
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ margin: "20px" }}
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Login

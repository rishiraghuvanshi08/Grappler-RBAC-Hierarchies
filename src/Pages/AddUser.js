import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { useDispatch } from "react-redux";
import { addUserData } from "../Slices/UserSlices";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [reporting, setReporting] = useState("");
  const [role, setRole] = useState("");
  // const [isInputEmpty, setIsInputEmpty] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    addUser(
      inputName,
      inputEmail,
      designation,
      inputPassword,
      reporting,
      role
    )
  };
  const addUser = (name, email, designation, password, reportingID, role) => {
    navigate('/users');
    // console.log('Input Value:', name, " ", email, " ", dob);
    let user = {
      name,
      email,
      designation,
      password,
      reportingUser: {
        id: reportingID,
      },
      role: {
        role,
      },
    };
    dispatch(addUserData(user));
  };
  return (
    <div className="formParent">
      <Container
        className="formParent-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text-center">Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDesignation">
            <Form.Label className="text-center">Designation</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicReportingId">
            <Form.Label className="text-center">Reporting ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Reporting ID"
              value={reporting}
              required
              onChange={(e) => setReporting(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select
            placeholder="Select Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >  
              <option>Select Role</option>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </Form.Select>
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ margin: "20px" }}
            // onClick={() =>
              
            // }
          >
            ADD USER
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddUser;

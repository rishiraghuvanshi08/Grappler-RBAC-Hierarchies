import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getUsersDataId } from "../Slices/UserSlices";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserIdData } from "../Slices/UserSlices";
import UserNavbar from "../Components/UserNavbar";
const UsersDashboard = () => {
  const { users, isLoading, error } = useSelector((state) => state.userList);
  console.log("users", users);
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setdesignation] = useState("");
  const [uid, setUId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  // console.log(users);
  const updateUser = (uid, name, email, designation) => {
    // const emailExists = users.some((user) => user.email === email && user.id !== id);
    // if (emailExists) {
    //   alert("Email already exists");
    //   return;
    // }
    console.log(uid, name, email, designation);
    dispatch(updateUserIdData(uid, name, email, designation));
    handleClose();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleButtonClick = (item) => {
    setName(item.name);
    setEmail(item.email);
    setUId(item.id);
    setdesignation(item.designation);
    setShow(true);
  };
  useEffect(() => {
    // console.log("hello");
    dispatch(getUsersDataId(id));
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <UserNavbar/>
      <>
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Edit</th>
            </tr>
            <tr>
              <th>{users.id}</th>
              <th>{users.name}</th>
              <th>{users.email}</th>
              <th>{users.designation}</th>
              <th><button style={{ "backgroundColor": "blue" }} className="tableButton" onClick={() => handleButtonClick(users)}>Edit</button>
              </th>
            </tr>
          </thead>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    defaultValue={name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-center">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    defaultValue={email || " "}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  controlId="dob"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="test"
                    defaultValue={designation}
                    placeholder="Update designation"
                    disabled="true"
                    onChange={(e) => setdesignation(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ margin: "20px" }}
                  onClick={() => updateUser(uid, name, email, designation)}
                // onClick={handleClose}
                >
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Table>
      </>
    </div>
  )
}
export default UsersDashboard
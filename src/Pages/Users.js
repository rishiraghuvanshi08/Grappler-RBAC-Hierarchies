import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
  import {  getUsersData, deleteUserData } from "../Slices/UserSlices";
import Button from "react-bootstrap/Button"; 
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../Slices/UserSlices";
import Swal from "sweetalert2";

const Users = () => {
    const {users, isLoading, error}  = useSelector((state) => state.userList);
    console.log("users", users);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setdesignation] = useState("");

  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  // console.log(users);
  const deleteUser = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserData(index));
        // Swal.fire(
        //   'Deleted!',
        //   'Your Project has been deleted.',
        //   'success'
        //   )
        }
      })
  };

  const updateUser = () => {
    // const emailExists = users.some((user) => user.email === email && user.id !== id);
    // if (emailExists) {
    //   alert("Email already exists");
    //   return;
    // }
    dispatch(updateUserData(id, name, email, designation));
    handleClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (item) => {
    setName(item.name);
    setEmail(item.email);
    setId(item.id);
    setdesignation(item.designation);
    setShow(true);
  };

  useEffect(() => {
    // console.log("hello");
    dispatch(getUsersData());
  },[dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <>
        <Table striped bordered hover variant="success">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Heirachy</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
            {users !== undefined &&
              users.map((item, index) => (
                // <div>{item.name}</div>
                // {item !== undefined}
                <tr key={index}>
                  <th>{item.id}</th>
                  <th>{item.name}</th>
                  <th>{item.email}</th>
                  <th>{item.designation}</th>
                  <th>
                    <button className="tableButton"
                    onClick={()=>navigate(`/admin/users/hierarchy/reporting/${item.id}`)}>View</button>
                  </th>
                  <th>
                    <button
                      className="tableButton"
                      onClick={() => deleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </th>
                  <th>{item.id=== 1?(<><button disabled = "true" style={{"backgroundColor":"blue"}} className="tableButton"onClick={() => handleButtonClick(item)}>Edit</button></>):(<><button className="tableButton"onClick={() => handleButtonClick(item)}>Edit</button></>)}
                  </th>
                </tr>
              ))}
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
                    onChange={(e) => setdesignation(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ margin: "20px" }}
                  onClick={() => updateUser(id, name, email, designation)}
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
        <Button
            variant="primary"
            type="submit"
            style={{ margin: "20px" }}
            onClick={() => navigate('/admin/users/addUser')}
          >
            ADD USER
          </Button>
      </>
    </div>
  )
}

export default Users

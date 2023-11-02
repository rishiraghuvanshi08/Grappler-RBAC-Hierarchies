import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getTeamMemberData, addTeamMemberData } from '../Slices/TeamMemberSlice';
import { getUsersData } from '../Slices/UserSlices';
const TeamMember = () => {
  const { teamMember } = useSelector((state) => state.teaMemberList);
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTeamMemberData(id));
    dispatch(getUsersData());
  },[])

  const [uId, setuId] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const addUserToTeam = (uid) =>{
    dispatch(addTeamMemberData(id, uId))
    handleClose();
  }
  // const deletePost = (index) => {
  //   dispatch(deletePostData(index, id));
  // };

  // const updatePost = (index, description, id) => {
  //   dispatch(updatePostData(index, description, id));
  //   handleClose();
  // }

  // const handleEditClick = (item) => {
  //   setpId(item.id);
  //   setShow(true);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }
  return (
    <div>
      <Table striped bordered hover variant="primary">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Delete</th>
            </tr>
            {teamMember !== undefined &&
              teamMember.map((item, index) => (
                // <div>{item.name}</div>
                // {item !== undefined}
                <tr key={index}>
                  <th>{item.id}</th>
                  <th>{item.name}</th>
                  <th>{item.email}</th>
                  <th>{item.designation}</th>
                  <th>
                    <button
                      className="tableButton"
                      // onClick={() => deletePost(item.id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
          </thead>

        </Table>
      <div style={{'marginTop': "20px", "display":"flex", "justifyContent":"center","width":"100%"}}><Button variant='primary' onClick={()=>setShow(true)}>ADD TEAM MEMBER</Button></div>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="id">
                  <Form.Label>UserId</Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Enter UserId"
                    onChange={(e) => setuId(e.target.value)}
                  />
                </Form.Group>                
                <Button
                  variant="primary"
                  type="submit"
                  style={{ margin: "20px" }}
                  onClick={() => addUserToTeam(uId)}
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
    </div>
  )
}

export default TeamMember
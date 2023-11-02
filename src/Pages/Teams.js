import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getTeamData, deleteTeamData, updateTeamData} from "../Slices/TeamSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Teams = () => {
    const { teams , isTeamsLoading, teamsError } = useSelector((state) => state.teamsList);
    console.log(teams);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  // console.log(users);
//   const deleteProject = (index) => {
//     dispatch(deleteProjectData(index));
//   };

//   const deleteTeam = (index) => {
//     dispatch(deleteProjectTeamData(index));
//   };

//   const updateProject = (id, name,) => {
//     console.log(name)
//     dispatch(updateProjectData(id, name));
//     handleClose();
//   }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (item) => {
    
    setName(item.name);
    // setTeams(item.team);
    // setProjectId(item.id);
    setShow(true);
  };
  const teamMember = (IdTeam) =>{
    navigate(`/teams/${IdTeam}/teamDetails`)
  }
  useEffect(() => {
    // console.log("hello");
    dispatch(getTeamData());
  },[dispatch]);

//   if (isProjectLoading) {
//     return <div>Loading...</div>;
//   }

//   if (projectError) {
//     return <div>Error: {projectError.message}</div>;
//   }
  return (
    <div>
    <>
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Teams Members</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {teams !== undefined &&
            teams.map((item, index) => (
              // <div>{item.name}</div>
              // {item !== undefined}
              <tr key={index}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th><button className="tableButton"onClick={() => teamMember(item.id)}>View Teams</button></th>
                <th>
                  <button
                    className="tableButton"
                    // onClick={() => deleteProject(item.id)}
                  >
                    Delete
                  </button>
                </th>
                <th>
                  <button className="tableButton"onClick={() => handleButtonClick(item)}>Edit</button>
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
              <Button
                variant="primary"
                type="submit"
                style={{ margin: "20px" }}
                // onClick={() => updateProject(projectId, name)}
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
            onClick={() => navigate('/teams/addTeam')}
          >
            ADD TEAM
          </Button>
    </>
  </div>
  )
}

export default Teams

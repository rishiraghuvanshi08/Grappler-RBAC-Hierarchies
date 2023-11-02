import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getProjectData, deleteProjectData, updateProjectData, deleteProjectTeamData} from "../Slices/ProjectSlices";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const { projects , isProjectLoading, projectError } = useSelector((state) => state.projectList);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // const [teamId, setTeamId] = useState("");
  const [projectInd, setProjectInd] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const handleClose = () => setShow(false);
  const closeHandle = () => setView(false);
  const dispatch = useDispatch();
  // console.log(users);
  const deleteProject = (index) => {
    dispatch(deleteProjectData(index));
  };

  const deleteTeam = (index) => {
    dispatch(deleteProjectTeamData(index));
  };

  const updateProject = (id, name,) => {
    console.log(name)
    dispatch(updateProjectData(id, name));
    handleClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (item) => {
    
    setName(item.name);
    // setTeams(item.team);
    setProjectId(item.id);
    setShow(true);
  };
  const handleTeamsClick = (teamsId, index) =>{
    console.log(teamsId, index)
    setView(true);
    setProjectInd(index);
    setProjectId(teamsId);
    // console.log("Clicked")
  }
  const teamMember = (IdTeam, projectId) =>{
    navigate(`/teams/${IdTeam}/teamDetails`)
  }
  useEffect(() => {
    // console.log("hello");
    dispatch(getProjectData());
  },[dispatch]);

  if (isProjectLoading) {
    return <div>Loading...</div>;
  }

  if (projectError) {
    return <div>Error: {projectError.message}</div>;
  }
  return (
    <div>
    <>
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Teams</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {projects !== undefined &&
            projects.map((item, index) => (
              // <div>{item.name}</div>
              // {item !== undefined}
              <tr key={index}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th><button className="tableButton"onClick={() => handleTeamsClick(item.id, index)}>View Teams</button></th>
                <th>
                  <button
                    className="tableButton"
                    onClick={() => deleteProject(item.id)}
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
                onClick={() => updateProject(projectId, name)}
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
        <Modal show={view} onHide={closeHandle}>
          <Modal.Header closeButton>
            <Modal.Title>View</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table striped bordered hover variant="success">
          <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Delete</th>
            <th>Team Details</th>
          </tr>
          {/* {console.log(teamId)} */}
          {projects[projectInd]?.teams?.map((elem, index)=>(
            <tr key={index}>
            <th>{elem.id}</th>
            <th>{elem.name}</th>
            <th><button className="tableButton" onClick={() => deleteTeam(elem.id)}>Delete</button></th>
            <th><button className="tableButton"  onClick={() => teamMember(elem.id, projectId)}>View Members</button></th>
            </tr>
          ))}
          </thead>
          </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeHandle}>
              ADD TEAM 
            </Button>
          </Modal.Footer>
        </Modal>
      </Table>
      <Button
            variant="primary"
            type="submit"
            style={{ margin: "20px" }}
            onClick={() => navigate('/projects/addProject')}
          >
            ADD PROJECT
          </Button>
    </>
  </div>
  )
}

export default Project

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { getTeamData, deleteTeamData, updateTeamData, addTeamData } from "../Slices/TeamSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { updateProjectData } from "../Slices/ProjectSlices";
import { getUsersData, deleteUserData } from "../Slices/UserSlices";
import { toast } from "react-toastify";
import Select from 'react-select';

const Teams = () => {
  const { teams, isTeamsLoading, teamsError } = useSelector((state) => state.teamsList);
  console.log(teams);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [view, setView] = useState(false);
  const [userIds, setUserIds] = useState([""]);
  const [numUserIds, setNumUserIds] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users, isLoading, error } = useSelector((state) => ({
    users: Array.isArray(state.userList.users) ? state.userList.users : [],
    isLoading: state.userList.isLoading,
    error: state.userList.error,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ced4da",
      borderRadius: "4px",
      width: "100%",
    }),
  };

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const handleClose = () => {
    setShow(false);
    setAddShow(false);
    setUserIds([""]);
  };
  const dispatch = useDispatch();

  const updateTeam = (name) => {
    console.log("update team details ", name, teamId);
    const teamNameExists = teams.some((team) => team.name === name);
    if (teamNameExists) {
      notify("Team with the same name already exists");
    }
    else if (name) {
      dispatch(updateTeamData(teamId, name));
      handleClose();
    }
  };

  const notify = (msg) => {
    toast(msg);
  };

  const addTeam = (name) => {
    if (!selectedUsers || selectedUsers.length === 0) {
      notify("At least one team member should be selected");
      return;
    }

    const teamNameExists = teams.some((team) => team.name === name);
    if (teamNameExists) {
      notify("Team with the same name already exists");
      return;
    }

    if (name) {
      const teamData = {
        id: "",
        name: name,
        teamMembers: selectedUsers.map((userId) => ({ user: { id: userId } })),
      };
      dispatch(addTeamData(teamData));
      handleClose();
    }
  };

  const addUserIdField = () => {
    setUserIds([...userIds, ""]);
    setNumUserIds(numUserIds + 1);
  };

  const removeUserIdField = () => {
    if (numUserIds > 1) {
      setUserIds(userIds.slice(0, numUserIds - 1));
      setNumUserIds(numUserIds - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (item) => {
    setName(item.name);
    setTeamId(item.id);
    setShow(true);
  };

  const handleAddButtonClick = (item) => {
    setAddShow(true);
  };

  const teamMember = (IdTeam) => {
    navigate(`/admin/teams/${IdTeam}/teamDetails`)
  };

  useEffect(() => {
    dispatch(getTeamData());
    dispatch(getUsersData(false));
  }, [dispatch]);

  if (isTeamsLoading) {
    return <div>Loading...</div>;
  }

  if (teamsError) {
    return <div>Error: {teamsError.message}</div>;
  }

  return (
    <div>
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Teams Members</th>
            <th>Edit</th>
          </tr>
          {teams !== undefined &&
            teams.map((item, index) => (
              <tr key={index}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th><button className="tableButton" onClick={() => teamMember(item.id)}>View Members</button></th>
                <th><button className="tableButton" onClick={() => handleButtonClick(item)}>Edit</button></th>
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
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ margin: "20px" }}
                onClick={() => updateTeam(name)}
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
        <Modal show={addShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New Team Name"
                defaultValue={""}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userDropdown">
              <Form.Label>User</Form.Label>
              <Select
                styles={customStyles}
                isMulti
                value={selectedUsers.map((userId) => userOptions.find((user) => user.value === userId))}
                onChange={(selected) => setSelectedUsers(selected.map((user) => user.value))}
                options={userOptions}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: "20px" }}
              onClick={() => addTeam(name)}
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
        onClick={handleAddButtonClick}
      >
        ADD TEAM
      </Button>
    </div>
  );
};

export default Teams;
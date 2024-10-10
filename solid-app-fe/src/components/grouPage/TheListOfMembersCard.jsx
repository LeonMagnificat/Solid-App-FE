import * as React from "react";
import { Typography, Box, Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import addsm from "../../icons/addsm.svg";
import add from "../../icons/add.svg";
import edit from "../../icons/editlg.svg";
import deleteIcon from "../../icons/delete.svg";
import emptyContact from "../../icons/nocontact.svg";
import GroupMemberCard from "./GroupMemberCard.jsx";
import AddMemberModel from "./AddMemberModel.jsx";
import DeleteGroupModel from "./DeleteGroupModal.jsx";
import EditGroupModel from "./EditGroupModal.jsx";
import { useSelector } from "react-redux";

const AddButton = styled(Button)({
  height: "35px",
  width: "35px",
  borderRadius: "50px",
  textTransform: "capitalize",
  boxShadow: "none",
  minWidth: "0",
});

const AddContactButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  boxShadow: "none",
});

export default function TheListOfMembersCard(props) {
  const user = useSelector((state) => state.user.UserData);
  const AddeduserId = user._id;
  const darkMode = useSelector((state) => state.user.darkMode);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const updatedMembersArray = props.group.members;

  const content = false;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const GroupBox = styled(Box)({
    backgroundColor: "white",
    borderRadius: "20px",
    paddingInline: "30px",
    paddingBlock: "20px",
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
      transition: "all 0.4s ease",
    },
    "&:hover .icons-box": {
      display: props.group.admins.includes(user._id) ? "flex" : "none",
      transition: "all 0.4s ease",
    },
    "&:hover .infos-box": {
      display: props.group.admins.includes(user._id) ? "none" : "flex",
    },
  });

  const updatedMembers = updatedMembersArray.reduce((acc, member) => {
    if (member._id === AddeduserId) {
      acc.unshift(member); // add the matching member to the start of the array
    } else {
      acc.push(member); // add other members to the end of the array
    }
    return acc;
  }, []);

  return (
    <>
      <GroupBox
        sx={{ backgroundColor: darkMode ? "black" : "", minHeight: "258px" }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBlockEnd: "20px",
            minHeight: "50px",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <Box>
            <Typography>{props.group.name}</Typography>
          </Box>
          <Box
            className="icons-box"
            sx={{
              display: "none",
              width: "120px",
              justifyContent: "space-between",
            }}
          >
            <Tooltip arrow title="Add a member to this Group">
              <AddButton
                variant="outlined"
                color="secondary"
                onClick={handleOpen}
              >
                <img src={addsm} alt="" />
              </AddButton>
            </Tooltip>
            <Tooltip arrow title="Edit this Group information">
              <AddButton
                variant="outlined"
                color="orange"
                onClick={handleOpenEdit}
              >
                <img src={edit} alt="" />
              </AddButton>
            </Tooltip>
            <Tooltip arrow title="Delete this Group">
              <AddButton
                variant="outlined"
                color="delete"
                onClick={handleOpenDelete}
              >
                <img src={deleteIcon} alt="" />
              </AddButton>
            </Tooltip>
          </Box>
          <Box
            className="infos-box"
            sx={{
              display: "flex",
              transition: "all 0.6s ease",
              width: "120px",
              justifyContent: "flex-end",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <Typography sx={{ fontSize: ".8em", color: "#9a9a9a" }}>
              <span style={{ color: darkMode ? "#fff" : "#000" }}>
                {props.group.members.length}
              </span>{" "}
              {props.group.members.length > 1 ? "members" : "member"}
            </Typography>
          </Box>
        </Box>
        <Box>
          {!content ? (
            <Box>
              {props.group &&
                updatedMembers.map((member) => {
                  return (
                    <GroupMemberCard
                      member={member}
                      key={member._id}
                      group={props.group}
                      setMessage={props.setMessage}
                      setInfoText={props.setInfoText}
                      setColor={props.setColor}
                      setSeverity={props.setSeverity}
                    />
                  );
                })}
            </Box>
          ) : (
            <Box
              sx={{
                display: " flex",
                flexDirection: "column",
                alignItems: "center",
                height: "250px",
                justifyContent: "space-around",
                textAlign: "center",
              }}
            >
              <Box sx={{ width: "100px" }}>
                <img style={{ width: "100%" }} src={emptyContact} alt="" />
              </Box>
              <Box>
                <Typography>
                  There are no members in this group; click the button below to
                  add members.
                </Typography>
              </Box>
              <Box>
                <AddContactButton
                  variant="contained"
                  color="secondary"
                  onClick={handleOpen}
                >
                  <img className="mr-3" src={add} alt="" /> Add Member
                </AddContactButton>
              </Box>
            </Box>
          )}
        </Box>
      </GroupBox>
      <AddMemberModel
        open={open}
        handleClose={handleClose}
        groupId={props.group._id}
        setMessage={props.setMessage}
        setInfoText={props.setInfoText}
      />
      <EditGroupModel
        open={openEdit}
        handleClose={handleCloseEdit}
        group={props.group}
        setMessage={props.setMessage}
        setInfoText={props.setInfoText}
      />
      <DeleteGroupModel
        open={openDelete}
        handleClose={handleCloseDelete}
        group={props.group}
        user={props.user}
        key={props.group._id}
        setMessage={props.setMessage}
        setInfoText={props.setInfoText}
      />
    </>
  );
}

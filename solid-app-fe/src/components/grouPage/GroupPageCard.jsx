import * as React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Snackbar,
  Alert,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import add from "../../icons/add.svg";
import CreateGroupModel from "../Group/CreateGroupModel.jsx";
import TheListOfMembersCard from "./TheListOfMembersCard.jsx";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";

const GroupBox = styled(Box)({
  height: "70px",
  backgroundColor: "white",
  borderRadius: "20px",
  marginBlockEnd: "15px",
  paddingInline: "30px",
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const AddButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  background: "rgb(224, 155, 45)",
  boxShadow: "none",
});

export default function GroupPageCards(props) {
  const user = useSelector((state) => state.user.UserData);
  const groups = useSelector((state) => state.user.groups);
  const darkMode = useSelector((state) => state.user.darkMode);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [infoText, setInfoText] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupsdrag, setGroupsdrag] = useState(groups);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setGroupsdrag(groups);
  }, [groups]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(groupsdrag);
    const [removedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removedItem);

    setGroupsdrag(reorderedItems);
  };

  const getHighlightedText = (text, search) => {
    if (search.trim() === "") {
      return text;
    }

    const regex = new RegExp(search, "gi");
    const parts = text.split(regex);
    return parse(
      parts
        .map((part, index) =>
          index % 2 !== 0 ? `<mark>${search}</mark>` + part : part
        )
        .join("")
    );
  };

  const searchResults = groupsdrag
    .filter((group) => {
      const hasMatchingName = group.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const hasMatchingCurrency = group.currency
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const hasMatchingMemberName = group.members.some((member) =>
        `${member.firstName} ${member.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      return hasMatchingName || hasMatchingCurrency || hasMatchingMemberName;
    })
    .map((group) => {
      const highlightedGroup = { ...group };
      const highlightedMembers = group.members.map((member) => {
        const fullName = `${member.firstName} ${member.lastName}`;
        const highlightedFullName = getHighlightedText(fullName, searchTerm);
        return { ...member, fullName: highlightedFullName };
      });
      highlightedGroup.members = highlightedMembers;
      highlightedGroup.name = getHighlightedText(group.name, searchTerm);
      highlightedGroup.currency = getHighlightedText(
        group.currency,
        searchTerm
      );
      return highlightedGroup;
    });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <GroupBox sx={{ backgroundColor: darkMode ? "#000" : "#fff" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <Box>
              <Typography>All Groups ({groups && groups.length})</Typography>
            </Box>
            <Box>
              {/* <TextField
                className="TextField-border-radius"
                placeholder="Search form group or member…"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "20em" }}
              /> */}
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  width: "300px",
                  color: darkMode ? "#fff" : "#000",
                }}
                placeholder="Search by group or member…"
                inputProps={{ "aria-label": "Search by group or member…" }}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
              </IconButton>
            </Box>
            <Box>
              <AddButton variant="contained" onClick={handleOpen}>
                <img className="mr-3" src={add} alt="" /> Create Group
              </AddButton>
            </Box>
          </Box>
        </GroupBox>
        <Box sx={{ height: "85vh", overflow: "auto", borderRadius: "20px" }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="searchResults">
              {(provided) => (
                <Grid
                  container
                  spacing={2}
                  columns={12}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {searchResults.map((group, index) => (
                    <Draggable
                      key={group._id}
                      draggableId={group._id}
                      index={index}
                    >
                      {(provided) => (
                        <Grid
                          className={isVisible ? "fade-in" : ""}
                          item
                          xs={12}
                          sm={6}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <TheListOfMembersCard
                            group={group}
                            user={user}
                            setGroupsFunction={props.setGroupsFunction}
                            setMessage={setMessage}
                            setInfoText={setInfoText}
                          />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>

        <CreateGroupModel
          open={open}
          handleClose={handleClose}
          user={user}
          setMessage={setMessage}
          setInfoText={setInfoText}
        />
      </Box>
      <Snackbar
        open={message}
        autoHideDuration={7000}
        onClose={handleCloseSnack}
      >
        <Alert
          severity="info"
          onClose={handleCloseSnack}
          sx={{ width: "100%" }}
        >
          {infoText}
        </Alert>
      </Snackbar>
    </>
  );
}

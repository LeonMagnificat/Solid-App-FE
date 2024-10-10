import * as React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Tab,
  Tabs,
  Button,
  AccordionSummary,
  Snackbar,
  Alert,
  AccordionDetails,
  styled,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import calendar from "../../icons/calendar.svg";
import ActiveGroupMembers from "./ActiveGroupMembers.jsx";
import AddMemberModel from "../grouPage/AddMemberModel.jsx";
import AddTaskModel from "./AddTaskModel.jsx";
import add from "../../icons/add.svg";
import emptyContact from "../../icons/nocontact.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  GroupBox,
  AddButton,
  AddContactButton,
  AccordionBox,
} from "./groupDataStyle.jsx";
import { colorsMix } from "./profilesArray.js";
import addTask from "../../icons/addTask.svg";
import deleteTask from "../../icons/deleteTask.svg";
import { editTask, deleteTaskAction } from "../../redux/actions/index.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function GroupWithcontent(props) {
  const user = useSelector((state) => state.user.UserData);
  const groups = useSelector((state) => state.user.groups);
  const tasksArray = useSelector((state) => state.user.tasks);
  const dispatch = useDispatch();
  //const userGroup = props.user.group;
  const [value, setValue] = useState(0);
  const [groupId, setGroupId] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(false);
  const [infoText, setInfoText] = useState(false);
  const [tasks, setTasks] = useState(tasksArray);
  //const [tasksdrag, settasksdrag] = useState([tasksArray]);
  const darkMode = useSelector((state) => state.user.darkMode);

  React.useEffect(() => {
    setTasks(tasksArray);
  }, [tasksArray]);

  const content = groups.length > 0 ? true : false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleUpdateTask = async (taskId, data) => {
    const response = await dispatch(editTask(taskId, data));
    if (response.status) {
      setEditing(null);
      //setTasks(response.data.group.map((group) => group.tasks));
    }
  };
  const handleDeleteTask = async (taskId) => {
    const response = await dispatch(deleteTaskAction(taskId));
    if (response.status) {
      //setTasks(response.data.group.map((group) => group.tasks));
      setEditing(null);
    }
  };

  const TaskElement = styled(AccordionDetails)({
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.7s",
    backgroundColor: darkMode ? "#2d2d2d" : "#f9f9f9",
    color: darkMode ? "#f9f9f9" : "#2d2d2d",
    paddingBlock: "5px",
    paddingInlineStart: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "30px",

    "&:hover": {
      transition: "all 0.3s",
      backgroundColor: darkMode ? "#181818" : "#ffff",
    },
  });

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(tasksArray);
    const [removedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removedItem);

    setTasks(reorderedItems);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%" }}>
          <GroupBox sx={{ backgroundColor: darkMode ? "black" : "#fff" }}>
            <Box sx={{ borderBottom: "none" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {groups &&
                  groups.map((group, index) => {
                    const currentGroupId = group._id;
                    return (
                      <Tab
                        sx={{ color: darkMode ? "#fff" : "black" }}
                        label={group.name}
                        {...a11yProps(0)}
                        key={index}
                        onClick={() => {
                          setGroupId(currentGroupId);
                        }}
                      />
                    );
                  })}
              </Tabs>
            </Box>
          </GroupBox>
          {groups.map((group, index) => {
            const dateTimeString = group.createdAt;
            const dateTimeStringUpdate = group.updatedAt;
            const dateTime = new Date(dateTimeString);
            const dateTimeUpdate = new Date(dateTimeStringUpdate);
            const options = {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            };
            const formattedDateTime = dateTime.toLocaleString("en-US", options);
            const formattedDateTimeUpdate = dateTimeUpdate.toLocaleString(
              "en-US",
              options
            );

            return (
              <TabPanel value={value} index={index}>
                <GroupBox
                  sx={{
                    padding: "30px",
                    backgroundColor: darkMode ? "black" : "#fff",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      color: darkMode ? "#fff" : "black",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "16px", marginBlockEnd: "10px" }}
                    >
                      Total Contributed
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        marginBlockEnd: "10px",
                        color: "grey",
                      }}
                    >
                      {formattedDateTime}
                    </Typography>
                    <div>
                      <AccordionBox
                        defaultExpanded
                        sx={{
                          "&:hover": {
                            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                            backgroundColor: darkMode ? "#292929" : "#fafafa",
                            transition: ".5s",
                            padding: "10px",
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              sx={{ color: darkMode ? "#70edf5" : "" }}
                            />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{ height: "20px", padding: "0px" }}
                        >
                          <Typography
                            color="primary"
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              fontSize: "40px",
                              fontWeight: "bold",
                              marginBlock: "0px",
                            }}
                          >
                            <Box sx={{ color: darkMode ? "#70edf5" : "" }}>
                              <span>
                                {group.total
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                              </span>{" "}
                              <span></span>
                              <span>
                                {group.currency === "USD"
                                  ? "$"
                                  : group.currency === "EUR"
                                  ? "€"
                                  : group.currency === "PLN"
                                  ? "zł"
                                  : ""}
                              </span>
                            </Box>
                            <Button
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                minWidth: "50px",
                                height: "50px",
                                backgroundColor: darkMode
                                  ? "#2d2d2d"
                                  : "#f4f4f4",
                                marginInlineEnd: "23px",
                                visibility: group.admins.includes(user._id)
                                  ? "visible"
                                  : "hidden",
                              }}
                              onClick={() => {
                                handleOpen2();
                                setGroupId(group._id);
                              }}
                            >
                              <img
                                src={addTask}
                                alt="calendar"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </Button>
                          </Typography>
                        </AccordionSummary>

                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId={group._id}>
                            {(provided, snapshot) => (
                              <Grid
                                container
                                spacing={1}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {tasks.map((task, index) => {
                                  if (task.group === group._id) {
                                    return (
                                      <Draggable
                                        draggableId={task._id}
                                        index={index}
                                        key={task._id}
                                      >
                                        {(provided, snapshot) => (
                                          <Grid
                                            className="fade-in"
                                            item
                                            xs={12}
                                            md={6}
                                            xl={4}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <TaskElement
                                              sx={{
                                                "&:hover > div": {
                                                  visibility: "visible",
                                                  opacity: 1,
                                                },
                                              }}
                                              onDoubleClick={() => {
                                                group.admins.includes(user._id)
                                                  ? setEditing(task._id)
                                                  : console.log("not admin");
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <Box
                                                  sx={{
                                                    backgroundColor:
                                                      colorsMix[
                                                        index % colorsMix.length
                                                      ],
                                                    width: "10px",
                                                    height: "10px",
                                                    borderRadius: "5px",
                                                    marginInlineEnd: "8px",
                                                  }}
                                                ></Box>
                                                {editing === task._id &&
                                                group.admins.includes(
                                                  user._id
                                                ) ? (
                                                  <form
                                                    onSubmit={() =>
                                                      handleUpdateTask(
                                                        task._id,
                                                        title
                                                      )
                                                    }
                                                  >
                                                    <TextField
                                                      className="inputRounded"
                                                      variant="outlined"
                                                      defaultValue={task.title}
                                                      InputProps={{
                                                        style: {
                                                          color: darkMode
                                                            ? "white"
                                                            : "black",
                                                          borderColor: "#000",
                                                          "&:hover": {
                                                            borderColor:
                                                              "rgba(255, 255, 255, 0.7)",
                                                          },
                                                        },
                                                      }}
                                                      type="text"
                                                      onBlur={(e) => {
                                                        setEditing(null);
                                                      }}
                                                      size="small"
                                                      onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                          e.preventDefault();
                                                          setTitle(
                                                            e.target.value
                                                          );
                                                          handleUpdateTask(
                                                            task._id,
                                                            e.target.value
                                                          );
                                                          setEditing(null);
                                                        }
                                                      }}
                                                    />
                                                  </form>
                                                ) : (
                                                  <Typography
                                                    onClick={() => {
                                                      setEditing(task._id);
                                                      setTitle(task.title);
                                                    }}
                                                    onBlur={() => {
                                                      setEditing(null);
                                                    }}
                                                    sx={{
                                                      marginInlineEnd: "8px",
                                                      width: "150px",
                                                      whiteSpace: "nowrap",
                                                      overflow: "hidden",
                                                      textOverflow: "ellipsis",
                                                    }}
                                                  >
                                                    {task.title}
                                                  </Typography>
                                                )}
                                              </Box>

                                              <Box
                                                sx={{
                                                  visibility: "hidden",
                                                  alignItems: "center",
                                                  transition:
                                                    "opacity .6s ease-in-out",
                                                  opacity:
                                                    editing === task._id
                                                      ? 1
                                                      : 0,
                                                }}
                                              >
                                                <Button
                                                  color="delete"
                                                  sx={{
                                                    minWidth: "15px",
                                                    padding: "7px 7px",
                                                    borderRadius: "50%",
                                                    visibility:
                                                      group.admins.includes(
                                                        user._id
                                                      )
                                                        ? "visible"
                                                        : "hidden",
                                                  }}
                                                  onClick={() => {
                                                    handleDeleteTask(task._id);
                                                  }}
                                                >
                                                  <img
                                                    src={deleteTask}
                                                    alt=""
                                                  />
                                                </Button>
                                              </Box>
                                            </TaskElement>
                                          </Grid>
                                        )}
                                      </Draggable>
                                    );
                                  } else {
                                    return null;
                                  }
                                })}
                                {provided.placeholder}
                              </Grid>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </AccordionBox>
                    </div>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBlockStart: "15px",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <img
                          style={{ width: "16px", marginInlineEnd: "10px" }}
                          src={calendar}
                          alt=""
                        />
                        <Typography sx={{ fontSize: "14px" }}>
                          Last updated, <span>{formattedDateTimeUpdate}</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </GroupBox>

                {content ? (
                  <>
                    <GroupBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "70px",
                        paddingInline: "20px",
                        backgroundColor: darkMode ? "black" : "#fff",
                      }}
                    >
                      <Box sx={{ color: darkMode ? "#fff" : "black" }}>
                        <Typography>Group Members</Typography>
                      </Box>
                      <AddButton
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          handleOpen();
                          setGroupId(group._id);
                        }}
                        sx={{
                          visibility: group.admins.includes(user._id)
                            ? "visible"
                            : "hidden",
                        }}
                      >
                        <img className="mr-3" src={add} alt="" /> Add Member
                      </AddButton>
                    </GroupBox>
                    <GroupBox
                      sx={{
                        maxHeight: "60vh",
                        overflow: "auto",
                        backgroundColor: darkMode ? "black" : "#fff",
                      }}
                    >
                      <ActiveGroupMembers group={group} />
                    </GroupBox>
                  </>
                ) : (
                  <Box>
                    <GroupBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingInline: "20px",
                      }}
                    >
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
                          <img
                            style={{ width: "100%" }}
                            src={emptyContact}
                            alt=""
                          />
                        </Box>
                        <Box sx={{ width: "350px" }}>
                          <Typography>
                            There are no members in this group; click the button
                            below to add members.
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
                    </GroupBox>
                  </Box>
                )}
              </TabPanel>
            );
          })}
        </Box>
        <AddTaskModel
          open={open2}
          handleClose={handleClose2}
          groupId={groupId}
          setTasks={setTasks}
          setMessage={setMessage}
          setInfoText={setInfoText}
        />

        <AddMemberModel
          open={open}
          groupId={groupId}
          handleClose={handleClose}
          setMessage={setMessage}
          setInfoText={setInfoText}
        />
      </Box>

      <Snackbar
        open={message}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          sx={{ width: "100%" }}
          color="secondary"
        >
          {infoText}
        </Alert>
      </Snackbar>
    </>
  );
}

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
  Tooltip,
  Fade,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import update from "../../icons/update.svg";
import deleteIcon from "../../icons/delete.svg";
import MemberContributionCard from "../grouPage/MemberContributionCard.jsx";
import TotalContributionMemberCard from "../grouPage/TotalContributionMemberCard.jsx";
import UpdateContributionModel from "../grouPage/UpdateContributionModel.jsx";
import DeleteUserModel from "../grouPage/DeleteUserModel.jsx";
import { useSelector } from "react-redux";

export default function GroupMemberCard(props) {
  //const contributions = useSelector((state) => state.contribution.contributionMember);
  const user = useSelector((state) => state.user.UserData);
  const darkMode = useSelector((state) => state.user.darkMode);
  //const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
  const AddeduserId = user._id;

  const filteredContribution = props.member.contributions.filter(
    (contribution) => contribution.group === props.group._id
  );
  const memberTotal = filteredContribution.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const formattedAmount = memberTotal.toFixed(2);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [deletemodel, setDeletemodel] = useState(false);
  const handleOpenDelete = () => {
    setDeletemodel(true);
  };
  const handleCloseDelete = () => {
    setDeletemodel(false);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const AccordionBox = styled(Accordion)({
    backgroundColor: "#fbfbfb",
    boxShadow: "none",
    borderRadius: "15px !important",
    marginBlockEnd: "10px",
    justifyContent: "space-between",
    transition: ".5s",
    "&:hover": {
      backgroundColor: darkMode ? "#694581" : "#f5e6ff",
      transition: ".5s",
    },
    "&:hover .cards-icons": {
      display: "flex",
      transition: "all .5s ease",
    },
    "&:hover .cards-infos ": {
      display: props.group.admins.includes(user._id) ? "none" : "flex",
    },
    gridColumn: "1 / -1",
    position: "relative",
  });
  const AccordionContent = styled(AccordionDetails)({
    maxHeight: "400px",
    overflow: "scroll",
  });

  const TopButton = styled(Button)({
    height: "35px",
    width: "35px",
    borderRadius: "50px",
    textTransform: "capitalize",
    boxShadow: "none",
    minWidth: "0",
    marginRight: "10px",
  });

  return (
    <div>
      <AccordionBox
        disableGutters={true}
        TransitionProps={{ unmountOnExit: true }}
        sx={{
          justifyContent: "space-between",
          backgroundColor: darkMode
            ? props.member._id === AddeduserId
              ? "#0a282a"
              : "#2d2d2d"
            : props.member._id === AddeduserId
            ? "#e4f0f1"
            : "#fbfbfb",
        }}
      >
        <AccordionSummary
          className="flex-space-btn"
          expandIcon={
            <ExpandMoreIcon sx={{ color: darkMode ? "#FFF3DF" : "" }} />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <Avatar
              {...stringAvatar(
                `${props.member.firstName} ${props.member.lastName}`
              )}
              className={darkMode ? "upper-caseDark" : "upper-case"}
            />
            <Tooltip
              title={props.member.firstName + " " + props.member.lastName}
              arrow
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 700 }}
            >
              <Typography
                sx={{
                  marginInlineStart: "10px",
                  width: "130px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                noWrap
              >
                {props.member._id === AddeduserId ? (
                  "You"
                ) : (
                  <span>
                    {props.member.firstName} {props.member.lastName}{" "}
                  </span>
                )}
              </Typography>
            </Tooltip>
          </Box>
          <Box
            className="cards-icons"
            sx={{
              display: "none",
              justifyContent: "flex-end",
              width: "100%",
              transition: "opacity .5s ease",
            }}
          >
            <Tooltip arrow title="Update member's contribution">
              <TopButton
                sx={{
                  display: props.group.admins.includes(user._id)
                    ? "flex"
                    : "none",
                }}
                variant="outlined"
                color="orange"
                onClick={handleOpen}
              >
                <img src={update} alt="" />
              </TopButton>
            </Tooltip>
            <Tooltip arrow title="Delete member">
              <TopButton
                sx={{
                  display: props.group.admins.includes(user._id)
                    ? "flex"
                    : "none",
                }}
                variant="outlined"
                color="delete"
                onClick={handleOpenDelete}
              >
                <img src={deleteIcon} alt="" />
              </TopButton>
            </Tooltip>
          </Box>
          <Box
            className="cards-infos"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                width: "8em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "black",
                textAlign: "end",
                color: darkMode ? "#fff" : "#000",
              }}
            >
              {formattedAmount} {props.group.currency}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionContent>
          {filteredContribution &&
            filteredContribution.map((contribution, index) => {
              if (contribution.user === props.member._id) {
                return (
                  <MemberContributionCard
                    contribution={contribution}
                    index={index}
                    key={contribution._id}
                    currency={props.group.currency}
                  />
                );
              } else {
                return null;
              }
            })}
          <TotalContributionMemberCard
            total={memberTotal}
            currency={props.group.currency}
          />
        </AccordionContent>
      </AccordionBox>
      <UpdateContributionModel
        open={open}
        handleClose={handleClose}
        user={props.member}
        group={props.group}
        total={formattedAmount}
        setMessage={props.setMessage}
        setInfoText={props.setInfoText}
      />
      <DeleteUserModel
        open={deletemodel}
        handleClose={handleCloseDelete}
        user={props.member}
        groupId={props.group._id}
        setMessage={props.setMessage}
        setInfoText={props.setInfoText}
      />
    </div>
  );
}

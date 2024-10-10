import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import MemberContributionCard from "../grouPage/MemberContributionCard.jsx";
import TotalContributionMemberCard from "../grouPage/TotalContributionMemberCard.jsx";
import { useSelector } from "react-redux";

export default function ActiveGroupMembers(props) {
  const user = useSelector((state) => state.user.UserData);
  const darkMode = useSelector((state) => state.user.darkMode);

  const AddeduserId = user._id;
  const updatedMembersArray = props.group.members;

  const updatedMembers = updatedMembersArray.reduce((acc, member) => {
    if (member._id === AddeduserId) {
      acc.unshift(member); // add the matching member to the start of the array
    } else {
      acc.push(member); // add other members to the end of the array
    }
    return acc;
  }, []);

  const AccordionBox = styled(Accordion)({
    boxShadow: "none",
    borderRadius: "15px !important",
    marginBlockEnd: "10px",
    justifyContent: "space-between",
    transition: ".5s",
    "&:hover": {
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      backgroundColor: darkMode ? "#694581" : "#f5e6ff",
      transition: ".5s",
    },
  });

  const AccordionContent = styled(AccordionDetails)({
    maxHeight: "400px",
    overflow: "scroll",
  });

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

  return (
    <div sx={{ marginBlockEnd: "30px" }}>
      {updatedMembers.map((member, index) => {
        const filteredContr = member.contributions.filter(
          (contribution) => contribution.group === props.group._id
        );
        const totalUser = filteredContr.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );

        return (
          <>
            <AccordionBox
              sx={{
                backgroundColor: darkMode
                  ? member._id === AddeduserId
                    ? "#0a282a"
                    : "#2d2d2d"
                  : member._id === AddeduserId
                  ? "#e4f0f1"
                  : "#fbfbfb",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    marginInlineEnd: "55px",
                    color: darkMode ? "#fff" : "#000",
                  }}
                >
                  <Avatar
                    {...stringAvatar(`${member.firstName} ${member.lastName}`)}
                    className={darkMode ? "upper-caseDark" : "upper-case"}
                  />

                  <Typography
                    sx={{
                      marginBlockStart: "8px",
                      marginInlineStart: "10px",
                      textTransform: "capitalize",
                    }}
                  >
                    {member._id === AddeduserId ? (
                      "You"
                    ) : (
                      <span>
                        {member.firstName} {member.lastName}{" "}
                      </span>
                    )}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionContent>
                {filteredContr &&
                  filteredContr.map((contribution, index) => {
                    if (contribution.user === member._id) {
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
                  total={totalUser}
                  currency={props.group.currency}
                />
              </AccordionContent>
            </AccordionBox>
          </>
        );
      })}
    </div>
  );
}

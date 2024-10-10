import * as React from "react";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Tooltip, Fade, Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { colors, colorsDark } from "../Group/profilesArray.js";
import { useSelector } from "react-redux";
import { deleteContribution } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import deleteIcon from "../../icons/delete.svg";

export default function MemberContributionCard(props) {
  const dispatch = useDispatch();
  const randomProfile = colors[Math.floor(Math.random() * colors.length)];
  const darkMode = useSelector((state) => state.user.darkMode);
  const dateTimeString = props.contribution.createdAt;
  const dateTime = new Date(dateTimeString);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDateTime = dateTime.toLocaleString("en-US", options);

  const formattedAmount = props.contribution.amount
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const AccordionBox = styled(Box)({
    backgroundColor: darkMode ? "black" : "white",
    color: darkMode ? "white" : "black",
    boxShadow: "none",
    borderRadius: "15px !important",
    paddingInline: "20px",
    marginBottom: "10px",
  });

  const AccordionMemberBox = styled(Box)({
    display: "flex",
    alignItems: "center !important",
    justifyContent: "space-between",
    height: "65px",
  });
  const NumberingBox = styled(Box)({
    backgroundColor: randomProfile,
    minWidth: "40px",
    minHeight: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colorsDark[colors.indexOf(randomProfile)],
  });

  const CustomButton = styled(Button)({
    height: "30px",
    width: "30px",
    borderRadius: "50px",
    boxShadow: "none",
    minWidth: "0",
    marginInlineStart: "10px",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AccordionBox>
        <AccordionMemberBox
          expandIcon={
            <ExpandMoreIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <NumberingBox>
            <Typography sx={{ fontWeight: "bold" }}>
              {props.index + 1}{" "}
            </Typography>
          </NumberingBox>
          <Tooltip
            title={formattedDateTime}
            placement="top"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 700 }}
            arrow
          >
            <Typography
              sx={{
                marginInlineStart: "10px",
                fontSize: "13px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {" "}
              {formattedDateTime}{" "}
            </Typography>
          </Tooltip>
          <Tooltip
            title={formattedAmount}
            placement="top"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 700 }}
            arrow
          >
            <Typography
              sx={{
                marginInlineStart: "10px",
                color: darkMode
                  ? randomProfile
                  : colorsDark[colors.indexOf(randomProfile)],
                fontSize: "16px",
                fontWeight: "bold",
                width: "15em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "end",
              }}
            >
              <span>{formattedAmount}</span>
              <span>
                {props.currency === "USD"
                  ? "$"
                  : props.currency === "EUR"
                  ? "€"
                  : props.currency === "PLN"
                  ? "zł"
                  : ""}
              </span>
              <CustomButton
                variant="outlined"
                color="delete"
                onClick={() => {
                  dispatch(deleteContribution(props.contribution._id));
                  console.log(props.contribution._id, "props.contribution._id");
                }}
              >
                <img src={deleteIcon} alt="" />
              </CustomButton>
            </Typography>
          </Tooltip>
        </AccordionMemberBox>
      </AccordionBox>
    </div>
  );
}

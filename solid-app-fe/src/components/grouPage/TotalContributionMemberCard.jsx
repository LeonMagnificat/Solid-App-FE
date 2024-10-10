import * as React from "react";
import { Box, Tooltip, Fade } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { colors, colorsDark } from "../Group/profilesArray.js";
import { useSelector } from "react-redux";

export default function TotalContributionMemberCard(props) {
  const randomProfile = colors[Math.floor(Math.random() * colors.length)];
  const formattedAmount = props.total
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const darkMode = useSelector((state) => state.user.darkMode);

  const AccordionBox = styled(Box)({
    backgroundColor: darkMode ? "#c8c8c8" : "black",
    boxShadow: "none",
    borderRadius: "15px !important",
    paddingInline: "20px",
    marginBottom: "10px",
    color: darkMode ? "black" : "white",
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

  return (
    <div>
      <Tooltip
        title={formattedAmount}
        placement="top-end"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 700 }}
        arrow
      >
        <AccordionBox>
          <AccordionMemberBox
            expandIcon={
              <ExpandMoreIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <NumberingBox
              sx={{
                backgroundColor: darkMode ? "#000" : "#fff",
                color: darkMode ? "#fff" : "#000",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>T</Typography>
            </NumberingBox>
            <Typography
              sx={{
                marginInlineStart: "10px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {" "}
              Total Contribution{" "}
            </Typography>
            <Typography
              sx={{
                marginInlineStart: "10px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "15em",
                textAlign: "end",
              }}
            >
              {formattedAmount}{" "}
              <span>
                {props.currency === "USD"
                  ? "$"
                  : props.currency === "EUR"
                  ? "€"
                  : props.currency === "PLN"
                  ? "zł"
                  : ""}
              </span>
            </Typography>
          </AccordionMemberBox>
        </AccordionBox>
      </Tooltip>
    </div>
  );
}

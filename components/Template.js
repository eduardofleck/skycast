import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";

const ChildrenOuterGrid = styled.div`
  margin: 50px;
`;

export default function Template(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SkyCast
          </Typography>
        </Toolbar>
      </AppBar>
      <ChildrenOuterGrid>{props.children}</ChildrenOuterGrid>
    </Box>
  );
}

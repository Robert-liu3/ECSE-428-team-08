import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


function createData(name) {
  return { name};
}

const rows = [
  createData("Noah Ye"),
  createData("Robert Liu"),
  createData("Arturo M"),
  createData("Danny tu"),
  createData("Abiola O"),
  createData("Abiola O"),
  createData("Abiola O"),
];

export default function FriendList() {
  return (
    <Box>
      <Typography
        style={{
          fontSize: "40px",
          letterSpacing: "2px",
        }}
      >
        {" "}
        Social Page
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography
            style={{
              fontSize: "20px",
              position: "relative",
              right: "30%",
              marginTop: "5%",
              fontSize: "25px",
              right: "30%",
            }}
          >
            {" "}
            Add Friend
          </Typography>

          <TextField
            label="Search"
            style={{
              position: "aboslute",
              marginTop: "10px",
              right: "25%",
              backgroundColor: "#D3D3D3",
              color: "black",
              width: "35%",
              right: "30%",
            }}
          >
            Search
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <Typography
            style={{
              fontSize: "20px",
              position: "relative",
              right: "40%",
              marginTop: "5%",
              fontSize: "25px",
            }}
          >
            {" "}
            Friend List
          </Typography>

          <TableContainer
            style={{
              width: "55%",
              position: "absolute",
              left: "40%",
              height: 400,
            }}
            component={Paper}
          >
            <Table
              sx={{
                minWidth: 650,
              }}
              aria-label="simple table"
            >
              <TableHead></TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        style={{
                          color: "red",
                          borderColor: "red",
                        }}
                      >
                        REMOVE
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={5}>
          <Button
            variant="outlined"
            style={{
              right: "18%",
              position: "aboslute",
              borderRadius: "25px",
              borderColor: "black",
              color: "white",
              backgroundColor: "blue",
              width: "20%",
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

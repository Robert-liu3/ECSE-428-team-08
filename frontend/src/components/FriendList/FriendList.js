import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
//import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useState} from 'react'

const usernames = [
  {name:"NoahYe123"},
  {name:"Danny2"},
  {name:"Arturo007"},
  {name:"BigBiola4"},
  {name:"TopGG"},
  {name:"NoahBoa"},
  {name:"qwerty"},
];

const Row = (props) => {
  const {name, delRow, index} = props
  return(<tr>
    <td>{name}</td>
    <td><button onClick = {
      () => {delRow(index)}
    }>Remove</button></td>
  </tr>)
}

const Table = (props) => {
  const {data, delRow} = props
  return(<table>
    <tbody>
      {data.map((row, index) =>
        <Row key = {`key-${index}`}
         name = {row.name}
         delRow = {delRow}
         index = {index} />)}
    </tbody>
  </table>)
}

function AddList({setList}){
  function handleSubmit(event){
    event.preventDefault();
    const name = event.target.elements.name.value;
    const newlist ={
      id: 8,
      name,
    }
    setList((prevList)=> {
      return prevList.concat(newlist)
    })
  }
  return(
    <form className='addForm' onSubmit={handleSubmit}>
      <input type = "text" username="username" placeholder="Enter Name" />
      <button type = "submit">Add</button>
    </form>
  )
}

function FriendList(){
  const [rows,setRows] = useState(usernames)

  const deleteRow = (number) => {
    let copy = [...rows]
    copy = copy.filter(
      (item, index) => number != index
    )
    setRows(copy)
  }

  return (
    <div className = "FriendList">
      <AddList />
      <Table data = {rows}
      delRow = {deleteRow} />
    </div>
  )
}

export default FriendList;



// export default function FriendList() {
//   return (
//     <Box>
//       <Typography
//         style={{
//           fontSize: "40px",
//           letterSpacing: "2px",
//         }}
//       >
//         {" "}
//         Social Page
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={8}>
//           <Typography
//             style={{
//               fontSize: "20px",
//               position: "relative",
//               right: "30%",
//               marginTop: "5%",
//               fontSize: "25px",
//               right: "30%",
//             }}
//           >
//             {" "}
//             Add Friend
//           </Typography>

//           <TextField
//             label="Search"
//             style={{
//               position: "aboslute",
//               marginTop: "10px",
//               right: "25%",
//               backgroundColor: "#D3D3D3",
//               color: "black",
//               width: "35%",
//               right: "30%",
//             }}
//           >
//             Search
//           </TextField>
//         </Grid>
//         <Grid item xs={4}>
//           <Typography
//             style={{
//               fontSize: "20px",
//               position: "relative",
//               right: "40%",
//               marginTop: "5%",
//               fontSize: "25px",
//             }}
//           >
//             {" "}
//             Friend List
//           </Typography>

//           <TableContainer
//             style={{
//               width: "55%",
//               position: "absolute",
//               left: "40%",
//               height: 400,
//             }}
//             component={Paper}
//           >
//             <Table
//               sx={{
//                 minWidth: 650,
//               }}
//               aria-label="simple table"
//             >
//               <TableHead></TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <TableRow
//                     key={row.name}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell component="th" scope="row">
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="right">
//                       <Button
//                         variant="outlined"
//                         style={{
//                           color: "red",
//                           borderColor: "red",
//                         }}
//                       >
//                         REMOVE
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Grid>
//         <Grid item xs={5}>
//           <Button
//             variant="outlined"
//             style={{
//               right: "18%",
//               position: "aboslute",
//               borderRadius: "25px",
//               borderColor: "black",
//               color: "white",
//               backgroundColor: "blue",
//               width: "20%",
//             }}
//           >
//             Add
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
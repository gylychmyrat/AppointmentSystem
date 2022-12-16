import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { providerList } from "../assets/data/providers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@material-ui/core";
import moment from "moment";
import Footer from "./Footer";
import Navbar from "./Navbar";

const theme = createTheme();

export default function Dashboard() {

  const [value, setValue] = React.useState("");
  const [startTime, setstartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  const userId = sessionStorage.getItem("userId");

  const provider = providerList.find((a) => a.userId == userId);

  const [schedule, setSchedule] = useState(provider?.schedule || []);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleStartTime = (newValue) => {
    setstartTime(newValue);
  };

  const handleEndTime = (newValue) => {
    setEndTime(newValue);
  };

  const addSchedule = () => {
    const aptDate = moment(new Date(value)).format("MM/DD/YYYY");
    const newScheulde = [
      ...schedule,
      {
        date: aptDate,
        startTime: dayjs(startTime).format("HH:mm"),
        endTime: dayjs(endTime).format("HH:mm"),
      },
    ];
    setSchedule(newScheulde);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <DesktopDatePicker
                      label="Select Date"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) => {
                        handleStartTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => {
                        handleEndTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  onClick={addSchedule}
                  disabled={!value}
                >
                  Add Schedule
                </Button>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>SR#</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Start Time</TableCell>
                  <TableCell align="right">End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row, key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{key + 1}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.startTime}</TableCell>
                    <TableCell align="right">{row.endTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      <Footer />
    </ThemeProvider>
  );
}

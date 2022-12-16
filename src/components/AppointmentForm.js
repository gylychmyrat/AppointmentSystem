import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import moment from "moment/moment";
import { Box} from "@material-ui/core";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";

function getTimeStops(start, end) {
  var startTime = moment(start, "HH:mm");
  var endTime = moment(end, "HH:mm");

  if (endTime.isBefore(startTime)) {
    endTime.add(1, "day");
  }

  var timeStops = [];

  while (startTime <= endTime) {
    timeStops.push(new moment(startTime).format("HH:mm"));
    startTime.add(15, "minutes");
  }
  return timeStops;
}

export default function AppointmentForm({
  provider,
  appointmentInfo,
  setAppointmentInfo,
}) {
  const [value, setValue] = React.useState("");
  const [timeStops, settimeStops] = React.useState([]);
  const today = new Date();
  today.setDate(today.getDate() + 1);


  const handleChange = (newValue) => {
    setValue(newValue);
    const aptDate = moment(new Date(newValue)).format("MM/DD/YYYY");
    const scheduleDate = provider.schedule.find((a) => a.date == aptDate);
    if (scheduleDate) {
      var slots = getTimeStops(scheduleDate.startTime, scheduleDate.endTime);
      settimeStops(slots);
    }else{
      settimeStops([]);
    }

    setAppointmentInfo({
      ...appointmentInfo,
      appointmentDate: aptDate,
    });
  };
  let [selectedSlot, setSelectedSlot] = useState("");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select your Date & Slot
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} marginTop={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Select Date"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                minDate={today}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>

        <Grid
          style={{ display: "flex", flexWrap: "wrap" }}
          item
          xs={12}
          md={12}
        >
          {timeStops.map((slot) => (
            <Box
              onClick={() => {
                setSelectedSlot(slot);
                setAppointmentInfo({
                  ...appointmentInfo,
                  appointmentSlot: slot,
                });
              }}
              style={{
                color: "red",
                fontWeight: "bold",
                margin: "10px",
                backgroundColor: slot === selectedSlot ? "green" : "lightblue",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {slot}
            </Box>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

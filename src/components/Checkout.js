import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactForm from "./ContactForm";
import AppointmentForm from "./AppointmentForm";
import Review from "./Review";
import { useParams } from "react-router-dom";
import { providerList } from "../assets/data/providers";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTimer, setTimer } from "../action/appointmentAction";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Personal Info", "Appointment Details", "Confirm"];

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [personalInfo, setPersonalInfo] = React.useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });
  const [appointmentInfo, setAppointmentInfo] = React.useState({
    appointmentDate: "",
    appointmentSlot: "",
  });

  let { id } = useParams();
  const { isTimerSet, timer } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  useEffect(() => {

    if(!isTimerSet && timer){
      alert('cleariing....')
      clearTimeout(timer)
    }
  }, [isTimerSet]);

  useEffect(() => {
    if (activeStep == steps.length) {
      dispatch(clearTimer());
    } else if (activeStep === 2) {
      var countdown = 30 * 60 * 1000;
      let timer1 = setTimeout(() => {
        alert("Booking time has expired");
        setActiveStep(0);
      }, 5000);
      dispatch(setTimer(timer1));
    } else {
    }
  }, [activeStep]);

  const provider = providerList.find((a) => a.providerId == id);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>

         
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for booking appointment.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed you appointment
                details.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <ContactForm
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                />
              )}
              {activeStep === 1 && (
                <AppointmentForm
                  provider={provider}
                  appointmentInfo={appointmentInfo}
                  setAppointmentInfo={setAppointmentInfo}
                />
              )}
              {activeStep === 2 && (
                <Review
                  personalInfo={personalInfo}
                  appointmentInfo={appointmentInfo}
                />
              )}
              {/* {getStepContent(activeStep)} */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  disabled={
                    activeStep == 1
                      ? !appointmentInfo.appointmentSlot
                      : null || activeStep == 0
                      ? !personalInfo.firstName
                      : null
                  }
                >
                  {activeStep === steps.length - 1
                    ? "Confirm your Booking"
                    : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

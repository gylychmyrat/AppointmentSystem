import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function ContactForm({personalInfo,setPersonalInfo}) {
  
    const {firstName, lastName, mobile, email}  = personalInfo;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName}
            onChange={(e)=>{
                setPersonalInfo({
                    ...personalInfo,
                    firstName: e.target.value
                })
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
        
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            onChange={(e)=>{
                setPersonalInfo({
                    ...personalInfo,
                    lastName: e.target.value
                })
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobileNo"
            name="mobileNo"
            label="Mobile No"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={mobile}
            onChange={(e)=>{
                setPersonalInfo({
                    ...personalInfo,
                    mobile: e.target.value
                })
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="emailAddress"
            name="emailAddress"
            label="Email Address"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e)=>{
                setPersonalInfo({
                    ...personalInfo,
                    email: e.target.value
                })
            }}
          />
        </Grid>
      
      </Grid>
    </React.Fragment>
  );
}
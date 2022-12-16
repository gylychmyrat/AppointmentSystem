import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];


export default function Review({ personalInfo, appointmentInfo }) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Booking summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="First Name"
            secondary={personalInfo.firstName}
          />
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Last Name" secondary={personalInfo.lastName} />
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Mobile" secondary={personalInfo.mobile} />
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Email" secondary={personalInfo.email} />
        </ListItem>

        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Date" secondary={appointmentInfo.appointmentDate} />
        </ListItem>


        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Time Slot" secondary={appointmentInfo.appointmentSlot} />
        </ListItem>

      </List>
    </React.Fragment>
  );
}

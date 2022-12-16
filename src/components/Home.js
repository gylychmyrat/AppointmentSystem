import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom/dist";
import { providerList } from "../assets/data/providers";
import Footer from "./Footer";
import Navbar from "./Navbar";

const theme = createTheme();

export default function Home() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
     
     <Navbar />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {providerList.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={
                      {
                        // 16:9
                      }
                    }
                    image="https://img.freepik.com/free-vector/woman-booking-appointment-calendar_23-2148562875.jpg?w=2000"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card?.providerName}
                    </Typography>
                    <Typography>{card?.providerDes}</Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={() => {
                        navigate(`/checkout/${card.providerId}`);
                      }}
                      variant="contained"
                      color="primary"
                      size="medium"
                    >
                      Book Appointment
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
     
      <Footer />
    </ThemeProvider>
  );
}

import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
} from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom/dist";


const Navbar = () => {
  const navigate = useNavigate();

  const firstName = sessionStorage.getItem("firstName");

  if(!firstName) navigate('/login')

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Appointment Booking
            </Typography>
          </Toolbar>

          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="inherit" noWrap>
              {firstName}
            </Typography>

            <LogoutIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/login");
              }}
            />
          </Box>
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
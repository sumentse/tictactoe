import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useContext, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import useStyles from "./auth.styles";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const { authenticated, initalizing, handleSignUp, error } = useContext(AuthContext);
  const location = useLocation();

  const classes = useStyles();

  const handleFormSubmit = (event, email) => {
    event.preventDefault();
    handleSignUp(email);
  };

  if (initalizing) return null;

  return authenticated ? (
    <Redirect to={{ pathname: location?.state?.from?.pathname ?? "/game" }} />
  ) : (
    <Container maxWidth="xs" className={classes.container}>
      <Box mb={3}>
        <Typography variant="h5" align="center">
          Signup now to play AI Games
        </Typography>
      </Box>
      <form onSubmit={(event) => handleFormSubmit(event, email)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <FormControl fullWidth>
                <InputLabel htmlFor="email-address">Email Address *</InputLabel>
                <Input
                  id="email-address"
                  type="email"
                  required
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </div>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;

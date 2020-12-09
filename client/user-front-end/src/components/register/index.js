import React, { useEffect, useState } from "react";
import clsx from "clsx";

//Material-ui
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import FacebookIcon from "@material-ui/icons/Facebook";
import EmailIcon from "@material-ui/icons/Email";

import Grid from "@material-ui/core/Grid";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";

//CSS
import "./index.css";
import {
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Divider,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { lightBlue, indigo, red, grey } from "@material-ui/core/colors";
import useStyles from "./muiStyle";

import userApi from "../../api/userApi";
import cookieService from "../../service/cookieService";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledButton = ({ children, backgroundColor, textColor, ...prop }) => {
  const ColorButton = withStyles(() => ({
    root: {
      color: textColor,
      backgroundColor: backgroundColor[500],
      "&:hover": {
        backgroundColor: backgroundColor[700],
      },
    },
  }))(Button);
  return <ColorButton {...prop}>{children}</ColorButton>;
};

function Register() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);
  let history = useHistory();

  const register = async (event) => {
    if (confirmPassword !== password) {
      setError("Confirm password don't match");
    } else {
      try {
        setFetching(true);
        await userApi.register(username, password, name, email);
        setFetching(false);
        history.push("/login");
      } catch (err) {
        console.log(err.response);
        if (!err.response) setError("Server is closed");
        else setError(err.response.data);
        setFetching(false);
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid
        container
        xs={12}
        sm={8}
        md={6}
        elevation={6}
        square
        alignItems="center"
        direction="column"
        justify="center"
      >
        {error ? <Alert severity="error">{error}</Alert> : null}
        <div className="login-container">
          <div className="input">
            <div className="input-label">
              <PersonIcon />
            </div>
            <OutlinedInput
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={classes.input}
            />
          </div>
          <div className="input">
            <div className="input-label">
              <VpnKeyIcon />
            </div>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => setShowPassword(!showPassword)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              className={classes.input}
            />
          </div>
          <div className="input">
            <div className="input-label">
              <VpnKeyIcon />
            </div>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={classes.input}
            />
          </div>
          <div className="input">
            <div className="input-label">
              <PersonIcon />
            </div>
            <OutlinedInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className={classes.input}
            />
          </div>
          <div className="input">
            <div className="input-label">
              <EmailIcon />
            </div>
            <OutlinedInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={classes.input}
            />
          </div>
          <div className="register-button">
            <a href="/login" id="register">
              Already have an account?
            </a>
            {fetching ? (
              <StyledButton
                variant="contained"
                className={classes.button}
                backgroundColor={lightBlue}
                textColor="white"
                disabled
              >
                <CircularProgress />
              </StyledButton>
            ) : (
              <StyledButton
                variant="contained"
                className={classes.button}
                backgroundColor={lightBlue}
                textColor="white"
                onClick={register}
              >
                REGISTER
              </StyledButton>
            )}
          </div>
        </div>
      </Grid>

      <Grid item xs={false} sm={4} md={6} className={classes.image} />
    </Grid>
  );
}

export default Register;

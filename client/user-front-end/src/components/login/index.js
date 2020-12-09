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

import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ "aria-label": "decorative checkbox" }}
      {...props}
    />
  );
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

function Login() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);
  let history = useHistory();

  const login = async (event) => {
    try {
      setFetching(true);
      const res = await userApi.login(username, password);
      cookieService.set("access_token", res);
      setFetching(false);
      console.log(res);
      history.push("/");
    } catch (err) {
      console.log(err.response);
      if (!err.response) setError("Server is closed");
      else setError(err.response.data);
      setFetching(false);
    }
  };

  const responseGoogle = async (response) => {
    console.log(response);
    try {
      const res = await userApi.loginGoogle(response.tokenId);
      cookieService.set("access_token", res);
      history.push("/");
    } catch (err) {
      console.log(err.response);
      if (!err.response) setError("Server is closed");
      else setError(err.response.data);
    }
  };

  const responseFacebook = async (response) => {
    console.log();
    try {
      const res = await userApi.loginFacebook(
        response.userID,
        response.accessToken
      );
      cookieService.set("access_token", res);
      history.push("/");
    } catch (err) {
      console.log(err.response);
      if (!err.response) setError("Server is closed");
      else setError(err.response.data);
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
          <div className="login-button">
            <FormControlLabel
              control={<StyledCheckbox />}
              label="Remember me"
              className={classes.checkboxLabel}
            />
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
                  onClick={login}
                >
                  LOGIN
                </StyledButton>
              )}
          </div>
          <div className="register-button">
            <a href="/register" id="register">
              Register now
            </a>
            <a href="" id="forgot-password">
              Forgot password?
            </a>
          </div>

          <div className="divider">
            <hr class="solid" />
            <span>or</span>
            <hr class="solid" />
          </div>

          <div className="input">
            <div className="input-label facebook-button">
              <FacebookIcon style={{ color: grey[200] }} />
            </div>

            <FacebookLogin
              appId={`${process.env.REACT_APP_FACEBOOK_CLIENT_ID}`}
              autoLoad={false}
              callback={responseFacebook}
              render={(renderProps) => (
                <StyledButton
                  className={classes.input}
                  variant="contained"
                  backgroundColor={indigo}
                  textColor="white"
                  onClick={renderProps.onClick}
                >
                  LOGIN WITH FACEBOOK
                </StyledButton>
              )}
            />
          </div>

          <div className="input">
            <div className="input-label google-button">
              <img src="/google.png" alt="" srcset="" />
            </div>

            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
              onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <StyledButton
                  className={classes.input}
                  variant="contained"
                  backgroundColor={red}
                  textColor="white"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  LOGIN WITH GOOGLE
                </StyledButton>
              )}
            />
          </div>
        </div>
      </Grid>

      <Grid item xs={false} sm={4} md={6} className={classes.image} />
    </Grid>
  );
}

export default Login;

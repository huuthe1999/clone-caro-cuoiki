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

function Active({ match }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  let history = useHistory();

  const active = async (event) => {
    try {
      //setFetching(true);
      const res = await userApi.active(match.params.token);
      //cookieService.set("access_token", res);
      //setFetching(false);
      console.log(res);
      setMessage(res.message);
      //history.push("/");
    } catch (err) {
      console.log(err.response);
      if (!err.response) setMessage("Server is closed");
      else setMessage(err.response.data);
      setFetching(false);
    }
  };

  useEffect(() => {
    active();
  }, []);

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
        {message ? <Alert severity="success">{message}</Alert> : null}
      </Grid>

      <Grid item xs={false} sm={4} md={6} className={classes.image} />
    </Grid>
  );
}

export default Active;

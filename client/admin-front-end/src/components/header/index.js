import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Auth from "../common/router/auth";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TextField } from "@material-ui/core";
import adminApi from "../../api/adminApi";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
    width: "50%",
    marginTop: 30,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Header({}) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState({});
  let history = useHistory();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const user = await adminApi.getProfile();
        setUser(user);
        setNewName(user.name);
        setNewEmail(user.email);
      } catch (err) {
        console.log("header: Failed to get profile: ", err);
      }
    };
    getProfile();
  }, []);

  const classes = useStyles();

  //Dialog Profile control

  const [openProfile, setOpenProfile] = useState(false);

  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleProfileClose = () => {
    setOpenProfile(false);
    setNewName(user.name);
    setNewEmail(user.email);
  };

  const handleProfileSave = async () => {
    setError("");
    if (newName === "" || newEmail === "") {
      setOpenProfile(false);
    } else {
      try {
        const user = await adminApi.updateProfile(newName, newEmail);
        setUser(user);
        setOpenProfile(false);
        setNewName(user.name);
        setNewEmail(user.email);
        setError("");
      } catch (err) {
        console.log("header: Failed to update profile: ", err);
        if (!err.response) setError("Server is closed");
        else setError(err.response.data);
      }
    }
  };

  //Dialog Change Password control

  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleClickOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleChangePasswordClose = () => {
    setOpenChangePassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
  };

  const handleChangePasswordDone = async () => {
    setError("");
    if (newPassword !== confirmNewPassword)
      setError("Confirm password don't match!");
    else {
      try {
        await adminApi.changePassword(oldPassword, newPassword);
        handleChangePasswordClose();
      } catch (err) {
        if (!err.response) setError("Server is closed");
        else setError(err.response.data);
      }
    }
  };

  //Menu control

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClickOpenProfile();
    handleMenuClose();
  };

  const handleChangePassword = () => {
    handleClickOpenChangePassword();
    handleMenuClose();
  };

  const handleLogout = () => {
    handleMenuClose();
    Auth.logout();
    history.push("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "darkblue",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        boxSizing: "border-box",
        color: "white",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          color: "white",
        }}
        onClick={() => history.push("/")}
      >
        SPRINT RETROSPECTIVE
      </Button>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>{user.name}</div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MenuIcon style={{ color: "white" }} />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <Dialog
        fullScreen
        open={openProfile}
        onClose={handleProfileClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleProfileClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Profile
            </Typography>
            <Button autoFocus color="inherit" onClick={handleProfileSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField
            className={classes.textField}
            label="Name"
            variant="outlined"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
        </div>
      </Dialog>
      <Dialog
        fullScreen
        open={openChangePassword}
        onClose={handleChangePasswordClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleChangePasswordClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ChangePassword
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleChangePasswordDone}
            >
              done
            </Button>
          </Toolbar>
        </AppBar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField
            className={classes.textField}
            label="Old Password"
            variant="outlined"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            type="password"
          />
          <TextField
            className={classes.textField}
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            type="password"
          />
          <TextField
            className={classes.textField}
            label="Confirm New Password"
            variant="outlined"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            type="password"
          />
        </div>
      </Dialog>
    </div>
  );
}

export default Header;

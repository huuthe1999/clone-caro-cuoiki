import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  input: {
    borderRadius: "0px 4px 4px 0px",
    width: 250,
    height: 56,
  },
  button: { color: "white", height: 60, width: 80 },
  checkboxLabel: { color: "#888" },
}));

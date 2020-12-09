import cookieService from "../../../service/cookieService";

const Auth = {
  getAccessToken: function () {
    return cookieService.get("access_token");
  },
  isAuthenticated: function () {
    return cookieService.get("access_token") ? true : false;
  },
  logout: function () {
    return cookieService.remove("access_token");
  },
};

export default Auth;

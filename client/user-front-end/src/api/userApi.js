import axiosClient from "./axiosClient";

const userApi = {
  login: (username, password) => {
    const url = "/user/login";
    return axiosClient.post(url, { username: username, password: password });
  },

  register: (username, password, name, email) => {
    const url = "/user/register";
    return axiosClient.post(url, {
      username: username,
      password: password,
      name: name,
      email: email,
    });
  },

  updateProfile: (newName, newEmail) => {
    const url = `/user/update`;
    return axiosClient.post(url, {
      newName: newName,
      newEmail: newEmail,
    });
  },

  getProfile: () => {
    const url = `/user/profile`;
    return axiosClient.get(url);
  },

  changePassword: (oldPassword, newPassword) => {
    const url = `/user/changePassword`;
    return axiosClient.post(url, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  },

  loginGoogle: (id_token) => {
    const url = "/user/google_login";
    return axiosClient.post(url, {
      id_token: id_token,
    });
  },

  loginFacebook: (user_id, access_token) => {
    const url = "/user/facebook_login";
    return axiosClient.post(url, {
      user_id: user_id,
      access_token: access_token,
    });
  },

  active: (token) => {
    const url = "/user/active";
    return axiosClient.post(url, { token: token });
  },
};

export default userApi;

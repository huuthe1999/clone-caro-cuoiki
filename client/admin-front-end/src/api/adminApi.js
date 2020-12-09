import axiosClient from "./axiosClient";

const adminApi = {
  login: (username, password) => {
    const url = "/admin/login";
    return axiosClient.post(url, { username: username, password: password });
  },

  updateProfile: (newName, newEmail) => {
    const url = `/admin/update`;
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
    const url = `/admin/changePassword`;
    return axiosClient.post(url, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  },
};

export default adminApi;

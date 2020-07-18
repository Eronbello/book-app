import api from "../../../api/index";
export default {
  setUserData: (context, data) => {
    context.commit("setUserData", data);
  },
  setUserByID: context => {
    return new Promise((resolve, reject) => {
      const id = sessionStorage.getItem("id");
      api
        .get(`/api/v1/user/${id}`)
        .then(response => {
          resolve(response.data.data);
          context.commit("setUserData", response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

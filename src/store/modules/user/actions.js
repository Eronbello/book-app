import axios from "axios";

export default {
  setUserData: (context, data) => {
    context.commit("setUserData", data);
  },
  setUserByID: context => {
    return new Promise((resolve, reject) => {
      const id = sessionStorage.getItem("id");
      axios
        .get(`http://localhost:3000/api/v1/user/${id}`, {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response.data.data);
          resolve(response.data.data);
          context.commit("setUserData", response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

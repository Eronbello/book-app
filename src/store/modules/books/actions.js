import axios from "axios";

export default {
  setData: context => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://192.168.0.14:3000/api/v1/book", {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response.data.data);
          resolve(response.data.data);
          context.commit("setData", response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

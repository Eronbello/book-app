import api from "../../../api/index";

export default {
  setData: context => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/v1/book?page=1")
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

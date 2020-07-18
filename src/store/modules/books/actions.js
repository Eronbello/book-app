import api from "../../../api/index";

export default {
  setData: context => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/v1/book?page=1")
        .then(response => {
          resolve(response.data.data);
          context.commit("setData", response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setDataByCategory: (context, category_id) => {
    return new Promise((resolve, reject) => {
      api
        .get(`/api/v1/book?page=1&category_id=${category_id}`)
        .then(response => {
          resolve(response.data.data);
          context.commit("setData", response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

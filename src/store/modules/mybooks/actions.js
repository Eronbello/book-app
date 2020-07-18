import api from "../../../api/index";
export default {
  setDataMyBooks: context => {
    return new Promise((resolve, reject) => {
      const id = sessionStorage.getItem("id");
      api
        .get(`/api/v1/book?page=1&user_id=${id}`)
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

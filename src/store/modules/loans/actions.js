import api from "../../../api/index";
export default {
  setDataLoan: context => {
    return new Promise((resolve, reject) => {
      const id = sessionStorage.getItem("id");
      api
        .get(`/api/v1/book?page=1&borrowed_by=${id}`)
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

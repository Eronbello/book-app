import api from "../../../api/index";

export default {
  setData: context => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/v1/book?page=1")
        .then(response => {
          context.commit("setData", response.data.data);
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setDataAvailables: context => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/v1/books/availables?page=1")
        .then(response => {
          context.commit("setData", response.data.data);
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setDataBorroweds: context => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/v1/books/borroweds?page=1")
        .then(response => {
          context.commit("setData", response.data.data);
          resolve(response.data.data);
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
  },
  borrowBook: (context, id) => {
    const user_id = sessionStorage.getItem("id");
    return new Promise((resolve, reject) => {
      api
        .post("/api/v1/loans", {
          id,
          user_id
        })
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

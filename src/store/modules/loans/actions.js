import axios from "axios";

export default {
  setDataLoan: context => {
    return new Promise((resolve, reject) => {
      const id = sessionStorage.getItem("id");
      axios
        .get(`http://192.168.0.14:3000/api/v1/loans?user_id=${id}`, {
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

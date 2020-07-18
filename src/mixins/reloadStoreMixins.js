import { mapActions } from "vuex";
const reloadStoreMixins = {
  methods: {
    ...mapActions("books", ["setData"]),
    ...mapActions("loans", ["setDataLoan"]),
    ...mapActions("mybooks", ["setDataMyBooks"]),
    refreshStore() {
      this.setData();
      this.setDataLoan();
      this.setDataMyBooks();
    }
  }
};

export default reloadStoreMixins;

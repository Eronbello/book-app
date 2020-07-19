import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import MyButton from "../components/MyButton.vue";

export default {
  component: MyButton,
  title: "Button"
};

export const withText = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action("clicked") },
  props: {
    color: {
      type: String,
      default: "Success"
    },
    message: {
      type: String,
      default: "sadsad"
    },
    closeAutomatically: {
      type: Boolean,
      default: true,
      required: false
    }
  }
});

export const withSomeEmoji = () => ({
  components: { MyButton },
  template: "<my-button>😀 😎 👍 💯</my-button>"
});

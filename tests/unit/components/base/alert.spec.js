import { shallowMount } from "@vue/test-utils";
import Alert from "../../../../src/components/base/Alert";

describe("Alert.vue", () => {
  it("renders props.msg when passed", () => {
    const message = "message";
    const wrapper = shallowMount(Alert, {
      propsData: { message }
    });
    expect(wrapper.text()).toMatch(message);
  });
});

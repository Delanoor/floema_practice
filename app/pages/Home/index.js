import Button from "classes/Button";
import Page from "classes/Page";

export default class extends Page {
  constructor() {
    super({
      id: "home",

      classes: {
        active: "home--active",
      },

      element: ".home",
      elements: {
        wrapper: ".home__wrapper",

        navigation: document.querySelector(".navigation"),
        link: ".home__link",
      },
    });
  }

  create() {
    super.create();

    this.link = new Button({
      element: this.elements.link,
    });
  }

  update() {
    super.update();
  }

  destroy() {
    super.destroy();
  }
}

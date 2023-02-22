import Button from "classes/Button";
import Page from "classes/Page";
import { mapEach } from "utils/dom";

import Detail from "./Detail";

export default class extends Page {
  constructor() {
    super({
      id: "details",

      classes: {
        active: "details--active",
      },

      element: ".details",
      elements: {
        details: ".detail",
      },
    });
  }

  create() {
    super.create();

    this.details = mapEach(this.elements.details, (element) => {
      return new Detail({ element });
    });
  }

  async show(url) {
    this.element.classList.add(this.classes.active);

    return super.show(url);
  }

  destroy() {
    super.destroy();

    mapEach(this.details, (element) => {
      element.destroy();
    });
  }
}

import gsap from "gsap";
import Link from "animations/Link";

import Component from "../classes/Component";
import { COLOR_BRIGHT_GRAY, COLOR_QUARTER_SPANISH_WHITE } from "utils/colors";
import { mapEach } from "utils/dom";

export default class extends Component {
  constructor({ template }) {
    super({
      element: ".navigation",
      elements: {
        items: ".navigation__list__item",
        links: ".navigation__list__link",
      },
    });

    this.links = mapEach(this.elements.links, (element) => {
      return new Link({
        element,
      });
    });

    this.onChange(template);
  }

  onChange(template) {
    if (template === "/about") {
      gsap.set(this.element, {
        color: COLOR_BRIGHT_GRAY,
      });

      gsap.set(this.elements.items[0], { autoAlpha: 1 });
      gsap.set(this.elements.items[1], { autoAlpha: 0 });
    } else {
      gsap.set(this.element, {
        color: COLOR_QUARTER_SPANISH_WHITE,
      });

      gsap.set(this.elements.items[0], { autoAlpha: 0 });
      gsap.set(this.elements.items[1], { autoAlpha: 1 });
    }
  }
}

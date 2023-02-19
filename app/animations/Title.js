import gsap from "gsap";
import each from "lodash/each";
import Animation from "../classes/Animation";

import { calculate, split } from "utils/text";

export default class Title extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });

    split({
      element: this.element,
      append: true,
    });
    split({
      element: this.element,
      append: true,
    });

    this.elementLinesSpans = this.element.querySelectorAll("span span");
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.5,
    });

    this.timelineIn.set(this.element, {
      autoAlpha: 1,
    });

    each(this.elementsLines, (line, index) => {
      this.timelineIn.fromTo(
        line,
        {
          y: "100%",
        },
        {
          delay: index * 0.2,
          duration: 1.3,
          ease: "expo.out",
          y: "0%",
        },
        0
      );
    });

    // this.timelineIn.fromTo(
    //   this.elementLines,
    //   {
    //     y: "100%",
    //   },
    //   {
    //     duration: 1.3,
    //     stagger: {
    //       each: 1.1,
    //       axis: "y",
    //       from: "start",
    //     },
    //     ease: "expo.out",
    //     y: "0%",
    //   }
    // );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0,
    });
  }

  onResize() {
    this.elementsLines = calculate(this.elementLinesSpans);
  }
}

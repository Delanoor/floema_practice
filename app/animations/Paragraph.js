import gsap from "gsap";
import Animation from "../classes/Animation";
import each from "lodash/each";

import { calculate, split } from "utils/text";

export default class Praragraph extends Animation {
  constructor({ element, elements }) {
    super({ element, elements });

    this.elementLinesSpans = split({
      append: true,
      element: this.element,
    });
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.5,
    });

    this.timelineIn.to(this.element, {
      autoAlpha: 1,
      duration: 1,
    });

    //   each(this.elementsLines, (line, index) => {
    //     this.timelineIn.fromTo(
    //       line,
    //       {
    //         autoAlpha: 0,
    //         y: "100%",
    //       },
    //       {
    //         autoAlpha: 1,
    //         delay: index * 0.2,
    //         duration: 1.3,
    //         ease: "expo.out",
    //         y: "0%",
    //       },
    //       0
    //     );
    //   });
  }

  aniamteOut() {
    gsap.set(this.element, {
      autoAlpha: 0,
    });
  }

  // onResize() {
  //   this.elementsLines = calculate(this.elementLinesSpans);
  // }
}

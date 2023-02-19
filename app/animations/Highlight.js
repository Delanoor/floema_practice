import gsap from "gsap";
import Animation from "../classes/Animation";

export default class Highlight extends Animation {
  constructor({ element, elements }) {
    super({ element, elements });
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.5,
    });

    this.timelineIn.fromTo(
      this.element,
      {
        autoAlpha: 0,
        scale: 1.2,
      },
      {
        autoAlpha: 1,
        duration: 1.4,
        ease: "expo.out",
        scale: 1,
      }
    );
  }

  aniamteOut() {
    gsap.set(this.element, {
      autoAlpha: 0,
    });
  }
}

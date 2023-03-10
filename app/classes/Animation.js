import autoBind from "auto-bind";
import Prefix from "prefix";

export default class {
  constructor({ element, elements }) {
    const { animationDelay, animationTarget } = element.dataset;

    autoBind(this);

    this.delay = animationDelay;

    this.element = element;
    this.elements = elements;

    this.target = animationTarget ? element.closest(animationTarget) : element;
    this.transformPrefix = Prefix("transform");

    this.isVisible = false;

    if ("IntersectionObserver" in window) {
      this.createObserver();

      this.animateOut();
    } else {
      this.animateIn;
    }
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn();
        } else {
          this.animateOut();
        }
      });
    }).observe(this.target);
  }

  animateIn() {
    this.isVisible = true;
  }

  animateOut() {
    this.isVisible = false;
  }
}

import autoBind from "auto-bind";
import EventEmitter from "events";
import gsap from "gsap";
import Prefix from "prefix";
import each from "lodash/each";
import map from "lodash/map";

import Button from "animations/Button";
import Link from "animations/Link";
import Label from "../animations/Label";
import Title from "../animations/Title";
import Parallax from "animations/Parallax";
import Paragraph from "../animations/Paragraph";
import Highlight from "../animations/Highlight";

import AsyncLoad from "./Asyncload";

import { mapEach } from "utils/dom";

export default class extends EventEmitter {
  constructor({ classes, element, elements, id }) {
    super();

    autoBind(this);

    this.classes = {
      ...classes,
    };

    this.selectors = {
      element,
      elements: {
        preloaders: "[data-src]",

        animationsButtons: '[data-animation="button"]',
        animationsLinks: '[data-animation="link"]',
        animationsParallaxes: '[data-animation="parallax"]',
        animationHighlights: '[data-animation="highlight"]',
        animationLabels: '[data-animation="label"]',
        animationTitles: '[data-animation="title"]',
        animationParagraphs: '[data-animation="paragraph"]',

        ...elements,
      },
    };

    this.scroll = {
      ease: 0.07,
      position: 0,
      current: 0,
      target: 0,
      limit: 0,
    };

    this.id = id;

    this.transformPrefix = Prefix("transform");

    this.create();
  }

  create() {
    this.animations = [];

    this.element = document.querySelector(this.selectors.element);
    this.elements = {};

    each(this.selectors.elements, (selector, key) => {
      if (
        selector instanceof window.HTMLElement ||
        selector instanceof window.NodeList ||
        Array.isArray(selector)
      ) {
        this.elements[key] = selector;
      } else {
        this.elements[key] = this.element.querySelectorAll(selector);

        // if empty NodeList
        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.element.querySelector(selector);
        }
      }
    });

    this.createAnimations();
    this.createObserver();
    this.createPreloader();
  }

  createAnimations() {
    /**
     * Buttons.
     */
    this.animationsButtons = mapEach(
      this.elements.animationsButtons,
      (element, index) => {
        return new Button({
          element,
        });
      }
    );

    this.animations.push(...this.animationsButtons);

    /**
     * Links.
     */
    this.animationsLinks = mapEach(
      this.elements.animationsLinks,
      (element, index) => {
        return new Link({
          element,
        });
      }
    );

    this.animations.push(...this.animationsLinks);

    // Highlights
    this.animationHighlights = map(
      this.elements.animationHighlights,
      (element) => {
        return new Highlight({ element });
      }
    );

    this.animations.push(...this.animationHighlights);

    // Titles
    this.animationTitles = map(this.elements.animationTitles, (element) => {
      return new Title({ element });
    });

    this.animations.push(...this.animationTitles);

    /**
     * Parallaxes.
     */
    this.animationsParallaxes = mapEach(
      this.elements.animationsParallaxes,
      (element) => {
        return new Parallax({ element });
      }
    );

    this.animations.push(...this.animationsParallaxes);

    // Paragraphs
    this.animationParagraphs = map(
      this.elements.animationParagraphs,
      (element) => {
        return new Paragraph({ element });
      }
    );

    this.animations.push(...this.animationParagraphs);

    // Label
    this.animationLabels = map(this.elements.animationLabels, (element) => {
      return new Label({ element });
    });

    this.animations.push(...this.animationLabels);
  }

  createObserver() {
    this.observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        window.requestAnimationFrame(() => {
          this.scroll.limit =
            this.elements.wrapper.clientHeight - window.innerHeight;
        });
      }
    });

    this.observer.observe(this.elements.wrapper);
  }

  createPreloader() {
    this.preloaders = map(this.elements.preloaders, (element) => {
      return new AsyncLoad({ element });
    });
  }

  /**
   * Animations
   */

  reset() {
    this.scroll = {
      ease: 0.07,
      position: 0,
      current: 0,
      target: 0,
      limit: 0,
    };
  }

  set(value) {
    this.scroll.current = this.scroll.target = this.scroll.last = value;

    this.transform(this.elements.wrapper, this.scroll.current);
  }

  show(url) {
    this.reset();

    this.isVisible = true;

    this.addEventListeners();

    gsap.set(document.documentElement, {
      backgroundColor: this.element.getAttribute("data-background"),
      color: this.element.getAttribute("data-color"),
    });

    return Promise.resolve();
  }

  hide(url) {
    this.isVisible = false;

    this.removeEventListeners();

    return Promise.resolve();
    // return new Promise((resolve) => {
    //   this.destroy();

    //   this.animationOut = gsap.timeline();
    //   this.animationOut.to(this.element, {
    //     autoAlpha: 0,
    //     onComplete: resolve,
    //   });
    // });
  }

  transform(element, y) {
    element.style[this.transformPrefix] = `translate3d(0, ${-Math.round(
      y
    )}px, 0)`;
  }

  /**
   * Events
   */

  onResize() {
    if (!this.elements.wrapper) return;

    window.requestAnimationFrame(() => {
      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight;

      each(
        this.animations,
        (animation) => animation.onResize && animation.onResize()
      );
    });
  }

  onWheel(normalizedWheel) {
    const speed = normalizedWheel.pixelY;

    this.scroll.target += speed;

    return speed;
  }

  /**
   * Loops
   */

  update() {
    this.scroll.target = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.elements.wrapper) {
      this.transform(this.elements.wrapper, this.scroll.current);
    }

    each(this.animations, (animation) => {
      animation.update && animation.update(this.scroll);
    });

    this.scroll.last = this.scroll.current;
  }

  /**
   * Listeners
   */

  addEventListeners() {}

  removeEventListeners() {}
}

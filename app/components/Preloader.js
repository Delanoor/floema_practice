import { Texture } from "ogl";
import gsap from "gsap";

import Component from "../classes/Component";

import each from "lodash/each";

import { split } from "utils/text";

export default class Preloader extends Component {
  constructor({ canvas }) {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        numberText: ".preloader__number__text",
      },
    });

    this.canvas = canvas;

    window.TEXTURES = {};

    this.elements.titleSpans = split({
      append: true,
      element: this.elements.title,
      expression: "<br>",
    });

    each(this.elements.titleSpans, (element) => {
      split({
        append: false,
        element,
        expression: "",
      });
    });

    this.length = 0;

    this.createLoader();
  }

  createLoader() {
    this.animateIn = gsap.timeline();

    this.animateIn.set(this.elements.title, {
      autoAlpha: 1,
    });

    this.animateIn.call(() => {
      window.ASSETS.forEach((image) => {
        const texture = new Texture(this.canvas.gl, {
          generateMipmaps: false,
        });

        const media = new window.Image();

        media.crossOrigin = "anonymous";
        media.src = image;

        media.onload = (_) => {
          texture.image = media;

          this.onAssetLoaded();
        };

        window.TEXTURES[image] = texture;
      });
    });
  }

  onAssetLoaded() {
    this.length++;

    const percentage = Math.round((this.length / window.ASSETS.length) * 100);
    this.elements.numberText.innerHTML = `${percentage} %`;

    if (percentage === 100) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.emit("completed");

      this.animateOut = gsap.timeline({
        delay: 1,
      });

      this.animateOut.to(this.elements.titleSpans, {
        duration: 1.5,
        ease: "expo.out",
        y: "100%",
        stagger: 0.1,
      });

      this.animateOut.to(
        this.elements.numberText,
        {
          duration: 1.5,
          ease: "expo.out",
          y: "100%",
          stagger: 0.1,
        },
        "-=1.4"
      );

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
      });

      this.animateOut.call((_) => {
        this.destroy();
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}

import { Plane, Transform } from "ogl";
import gsap from "gsap";
import Prefix from "prefix";

import map from "lodash/map";

import Media from "./Media";

export default class {
  constructor({ gl, scene, sizes }) {
    // this.id = "discography";

    this.gl = gl;
    this.scene = scene;
    this.sizes = sizes;

    this.transformPrefix = Prefix("transform");

    this.group = new Transform();

    this.galleryElement = document.querySelector(".discography__gallery");

    this.galleryWrapperElement = document.querySelector(
      ".discography__gallery__wrapper"
    );

    this.titlesElement = document.querySelector(".discography__titles");

    this.discographyElements = document.querySelectorAll(
      ".discography__article"
    );
    this.discographyElementsActive = "discography__article--active";

    this.mediasElements = document.querySelectorAll(
      ".discography__gallery__media"
    );

    this.scroll = {
      current: 0,
      start: 0,
      target: 0,
      lerp: 0.1,
      velocity: 1,
    };

    this.createGeometry();
    this.createGallery();

    this.onResize({
      sizes: this.sizes,
    });

    this.group.setParent(this.scene);

    this.show();
  }

  createGeometry() {
    this.geometry = new Plane(this.gl);
  }

  createGallery() {
    this.medias = map(this.mediasElements, (element, index) => {
      return new Media({
        element,
        geometry: this.geometry,
        index,
        scene: this.group,
        gl: this.gl,
        sizes: this.sizes,
      });
    });
  }

  // Animations

  show() {
    map(this.medias, (media) => media.show());
  }

  hide() {
    map(this.medias, (media) => media.hide());
  }

  onResize(e) {
    this.sizes = e.sizes;

    this.bounds = this.galleryWrapperElement.getBoundingClientRect();

    this.scroll.last = this.scroll.target = 0;

    map(this.medias, (media) => media.onResize(e, this.scroll));

    this.scroll.limit = this.bounds.width - this.medias[0].element.clientWidth;
  }

  onTouchDown({ x, y }) {
    this.scroll.last = this.scroll.current;
  }

  onTouchMove({ x, y }) {
    const distance = x.start - x.end;

    this.scroll.target = this.scroll.last - distance;
  }

  onTouchUp({ x, y }) {}

  onWheel({ pixelY }) {
    this.scroll.target += pixelY;
  }

  onChange(index) {
    this.index = index;

    const selectedDiscography = parseInt(
      this.mediasElements[this.index].getAttribute("data-index")
    );

    map(this.discographyElements, (element, elementIndex) => {
      if (elementIndex === selectedDiscography) {
        element.classList.add(this.discographyElementsActive);
      } else {
        element.classList.remove(this.discographyElementsActive);
      }
    });

    // link
    this.titlesElement.style[this.transformPrefix] = `translateY(-${
      25 * selectedDiscography
    }%) translate(-50%, -50%) rotate(-90deg)`;
  }

  /**
   * Update
   */
  update() {
    this.scroll.target = gsap.utils.clamp(
      -this.scroll.limit,
      0,
      this.scroll.target
    );

    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      this.scroll.lerp
    );

    this.galleryElement.style[
      this.transformPrefix
    ] = `translateX(${this.scroll.current}px)`;

    if (this.scroll.last < this.scroll.current) {
      this.scroll.direction = "right";
    } else if (this.scroll.last > this.scroll.current) {
      this.scroll.direction = "left";
    }

    this.scroll.last = this.scroll.current;

    const index = Math.floor(
      Math.abs(this.scroll.current / this.scroll.limit) *
        (this.medias.length - 1)
    );

    if (this.index !== index) {
      this.onChange(index);
    }

    map(this.medias, (media, index) => {
      media.update(this.scroll.current, this.index);
      // media.mesh.rotation.z =
      //   Math.abs(
      //     gsap.utils.mapRange(0, 1, -0.2, 0.2, index / (this.medias.length - 1))
      //   ) - 0.1;

      // media.mesh.position.y +=
      //   Math.cos((media.mesh.position.x / this.sizes.width) * Math.PI * 0.1) *
      //     40 -
      //   40;
    });
  }

  destroy() {
    this.scene.removeChild(this.group);
  }
}

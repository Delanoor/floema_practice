import { Plane, Transform } from "ogl";
import gsap from "gsap";

import map from "lodash/map";
import Media from "./Media";

export default class {
  constructor({ gl, scene, sizes }) {
    this.gl = gl;
    this.scene = scene;
    this.sizes = sizes;

    this.group = new Transform();

    this.galleryElement = document.querySelector(".home__gallery");
    this.mediaElements = document.querySelectorAll(
      ".home__gallery__media__image"
    );

    this.y = {
      current: 0,
      target: 0,
      lerp: 0.1,
    };

    this.scrollCurrent = {
      x: 0,
      y: 0,
    };

    this.scroll = {
      x: 0,
      y: 0,
    };

    this.speed = {
      current: 0,
      target: 0,
      lerp: 0.1,
    };

    this.velocity = 2;

    this.createGeometry();
    this.createGallery();

    this.onResize({
      sizes: this.sizes,
    });
  }

  createGeometry() {
    this.geometry = new Plane(this.gl, {
      heightSegments: 20,
      widthSegments: 20,
    });
  }

  createGallery() {
    this.medias = map(this.mediaElements, (element, index) => {
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

  show(isPreloaded) {
    this.group.setParent(this.scene);

    map(this.medias, (media) => media.show(isPreloaded));
  }

  hide() {
    this.group.setParent(null);

    map(this.medias, (media) => media.hide());
  }

  onResize(e) {
    this.galleryBounds = this.galleryElement.getBoundingClientRect();

    this.sizes = e.sizes;

    this.gallerySizes = {
      width: (this.galleryBounds.width / window.innerWidth) * this.sizes.width,
      height:
        (this.galleryBounds.height / window.innerHeight) * this.sizes.height,
    };

    this.scroll.y = this.y.target = 0;

    map(this.medias, (media) => media.onResize(e, this.scroll));
  }

  onTouchDown({ x, y }) {
    this.scrollCurrent.x = this.scroll.x;
    this.scrollCurrent.y = this.scroll.y;
  }

  onTouchMove({ x, y }) {
    const yDistance = y.start - y.end;

    this.y.target = this.scrollCurrent.y - yDistance;
  }

  onTouchUp({ x, y }) {}

  onWheel({ pixelX, pixelY }) {
    this.y.target += pixelY;

    this.velocity = pixelY > 0 ? 2 : -2;
  }

  /**
   * Update
   */
  update() {
    this.y.target += this.velocity;

    this.speed.target = (this.y.target - this.y.current) * 0.001;
    this.speed.current = gsap.utils.interpolate(
      this.speed.current,
      this.speed.target,
      this.speed.lerp
    );

    this.y.current = gsap.utils.interpolate(
      this.y.current,
      this.y.target,
      this.y.lerp
    );

    if (this.scroll.y < this.y.current) {
      this.y.direction = "top";
    } else if (this.scroll.y > this.y.current) {
      this.y.direction = "bottom";
    }

    this.scroll.y = this.y.current;

    map(this.medias, (media, index) => {
      const offsetY = this.sizes.height * 0.5;
      const scaleY = media.mesh.scale.y / 2;

      if (this.y.direction === "top") {
        const y = media.mesh.position.y + scaleY;

        if (y < -offsetY) {
          media.extra.y += this.gallerySizes.height;
        }
      } else if (this.y.direction === "bottom") {
        const y = media.mesh.position.y - scaleY;

        if (y > offsetY) {
          media.extra.y -= this.gallerySizes.height;
        }
      }

      media.update(this.scroll, this.speed.current);
    });
  }

  destroy() {
    this.scene.removeChild(this.group);
  }
}

import { Camera, Renderer, Transform } from "ogl";

import About from "./About";
import Home from "./Home";
import Discography from "./Discography";

export default class Canvas {
  constructor({ template }) {
    this.template = template;

    this.x = {
      start: 0,
      distance: 0,
      end: 0,
    };
    this.y = {
      start: 0,
      distance: 0,
      end: 0,
    };

    this.createCamera();
    this.createRenderer();
    this.createScene();

    this.onResize();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
    });

    this.gl = this.renderer.gl;

    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);

    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new Transform();
  }

  createHome() {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes,
    });
  }

  destroyHome() {
    if (!this.home) return;

    this.home.destroy();
    this.home = null;
  }

  createAbout() {
    this.about = new About({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes,
    });
  }

  destroyAbout() {
    if (!this.about) return;

    this.about.destroy();
    this.about = null;
  }

  createDiscography() {
    this.discography = new Discography({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes,
    });
  }

  destroyDiscography() {
    if (!this.discography) return;

    this.discography.destroy();
    this.discography = null;
  }

  /**
   * Events
   */

  onPreloaded() {
    this.onChangeEnd(this.template);
  }

  onChangeStart() {
    if (this.home) {
      this.home.hide();
    }
    if (this.about) {
      this.about.hide();
    }
    if (this.discography) {
      this.discography.hide();
    }
  }

  onChangeEnd(template) {
    if (template === "about") {
      this.createAbout();
    } else if (this.about) {
      this.destroyAbout();
    }

    if (template === "home") {
      this.createHome();
    } else {
      this.destroyHome();
    }

    if (template === "discography") {
      this.createDiscography();
    } else if (this.discography) {
      this.destroyDiscography();
    }
  }

  onTouchDown(e) {
    this.isDown = true;

    this.x.start = e.touches ? e.touches[0].clientX : e.clientX;
    this.y.start = e.touches ? e.touches[0].clientY : e.clientY;

    const values = {
      x: this.x,
      y: this.y,
    };

    if (this.about) {
      this.about.onTouchDown(values);
    }

    if (this.home) {
      this.home.onTouchDown(values);
    }

    if (this.discography) {
      this.discography.onTouchDown(values);
    }
  }

  onTouchMove(e) {
    if (!this.isDown) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    this.x.end = x;
    this.y.end = y;

    const values = {
      x: this.x,
      y: this.y,
    };

    if (this.home) {
      this.home.onTouchMove(values);
    }

    if (this.about) {
      this.about.onTouchMove(values);
    }

    if (this.discography) {
      this.discography.onTouchMove(values);
    }
  }

  onTouchUp(e) {
    this.isDown = false;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    this.x.end = x;
    this.y.end = y;

    const values = {
      x: this.x,
      y: this.y,
    };

    if (this.about) {
      this.about.onTouchUp(values);
    }

    if (this.home) {
      this.home.onTouchUp(values);
    }

    if (this.discography) {
      this.discography.onTouchUp(values);
    }
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      apsect: window.innerWidth / window.innerHeight,
    });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.sizes = {
      height,
      width,
    };

    if (this.about) {
      this.about.onResize({
        sizes: this.sizes,
      });
    }

    if (this.home) {
      this.home.onResize({
        sizes: this.sizes,
      });
    }

    if (this.discography) {
      this.discography.onResize({
        sizes: this.sizes,
      });
    }
  }

  onWheel(e) {
    if (this.home) {
      this.home.onWheel(e);
    }

    if (this.discography) {
      this.discography.onWheel(e);
    }
  }

  update(scroll) {
    if (this.about) {
      this.about.update(scroll);
    }
    if (this.discography) {
      this.discography.update();
    }
    if (this.home) {
      this.home.update();
    }

    this.renderer.render({
      camera: this.camera,
      scene: this.scene,
    });
  }
}

import normalizeWheel from "normalize-wheel";
import each from "lodash/each";

import Canvas from "./components/Canvas";

import Preloader from "./components/Preloader";
import About from "pages/About";
import Discography from "pages/Discography";
import Detail from "pages/Detail";
import Home from "pages/Home";
import Navigation from "./components/Navigation";

import Transition from "./components/Transition";

class App {
  constructor() {
    this.template = window.location.pathname;

    this.createCanvas();
    // this.createContent();
    this.createPreloader();
    this.createTransition();
    this.createNavigation();
    this.createPages();

    this.addEventListeners();
    this.addLinkListeners();

    this.onResize();

    this.update();
  }

  createNavigation() {
    this.navigation = new Navigation({
      template: this.template,
    });
  }

  createPreloader() {
    this.preloader = new Preloader({ canvas: this.canvas });
    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  createCanvas() {
    this.canvas = new Canvas({
      template: this.template,
    });
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createTransition() {
    this.transition = new Transition();
  }

  createPages() {
    this.about = new About();
    this.discography = new Discography();
    this.home = new Home();

    this.pages = {
      "/": this.home,
      "/about": this.about,
      "/discography": this.discography,
    };

    this.page = this.pages[this.template];

    // this.page.create();
  }

  /***
   *  Listeners
   */

  onPreloaded() {
    this.onResize();

    this.canvas.onPreloaded();

    this.page.show();
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false,
    });
  }

  // when change in page

  async onChange({ url, push = true }) {
    url = url.replace(window.location.origin, "");

    const page = this.pages[url];

    await this.transition.show({
      color: page.element.getAttribute("data-color"),
    });

    if (push) {
      window.history.pushState({}, "", url);
    }

    this.template = window.location.pathname;

    this.page.hide();

    this.navigation.onChange(this.template);
    this.canvas.onChange(this.template);

    this.page = page;
    this.page.show();

    this.onResize();

    this.transition.hide();

    // this.canvas.onChangeStart(this.template, url);
    // await this.page.hide();

    // const res = await window.fetch(url);

    // if (res.status === 200) {
    //   // get the page
    //   const html = await res.text();
    //   const div = document.createElement("div");

    //   if (push) {
    //     window.history.pushState({}, "", url);
    //   }

    //   div.innerHTML = html;

    //   const divContent = div.querySelector(".content");
    //   this.template = divContent.getAttribute("data-template");

    //   this.navigation.onChange(this.template);

    //   this.content.setAttribute("data-template", this.template);
    //   this.content.innerHTML = divContent.innerHTML;

    //   this.canvas.onChangeEnd(this.template);

    //   this.page = this.pages[this.template];
    //   this.page.create();

    //   this.onResize();

    //   this.page.show();

    //   this.addLinkListeners();
    // } else {
    //   console.error("Error");
    // }
  }

  /**
   * Events
   */

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }

    window.requestAnimationFrame(() => {
      if (this.canvas && this.canvas.onResize) {
        this.canvas.onResize();
      }
    });
  }

  onTouchDown(e) {
    if (this.canvas && this.canvas.onTouchDown) {
      this.canvas.onTouchDown(e);
    }

    if (this.page && this.page.onTouchDown) {
      this.page.onTouchDown(e);
    }
  }

  onTouchMove(e) {
    if (this.canvas && this.canvas.onTouchMove) {
      this.canvas.onTouchMove(e);
    }

    if (this.page && this.page.onTouchMove) {
      this.page.onTouchMove(e);
    }
  }

  onTouchUp(e) {
    if (this.canvas && this.canvas.onTouchUp) {
      this.canvas.onTouchUp(e);
    }

    if (this.page && this.page.onTouchUp) {
      this.page.onTouchUp(e);
    }
  }

  onWheel(e) {
    const normalizedWheel = normalizeWheel(e);

    if (this.canvas && this.canvas.onWheel) {
      this.canvas.onWheel(normalizedWheel);
    }

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel);
    }
  }

  /***
   *  Loop
   */

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    if (this.canvas && this.canvas.update) {
      this.canvas.update(this.page.scroll);
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  /***
   *  Listeners
   */
  addEventListeners() {
    window.addEventListener("popstate", this.onPopState.bind(this));
    window.addEventListener("mousewheel", this.onWheel.bind(this));

    window.addEventListener("mousedown", this.onTouchDown.bind(this));
    window.addEventListener("mousemove", this.onTouchMove.bind(this));
    window.addEventListener("mouseup", this.onTouchUp.bind(this));

    window.addEventListener("touchstart", this.onTouchDown.bind(this));
    window.addEventListener("touchmove", this.onTouchMove.bind(this));
    window.addEventListener("touchend", this.onTouchUp.bind(this));

    window.addEventListener("resize", this.onResize.bind(this));
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      const isLocal = link.href.indexOf(window.location.origin) > -1;

      const isNotEmail = link.href.indexOf("mailto") === -1;
      const isNotPhone = link.href.indexOf("tel") === -1;

      if (isLocal) {
        link.onclick = (event) => {
          event.preventDefault();

          this.onChange({
            url: link.href,
          });
        };

        link.onmouseenter = (event) => this.onLinkMouseEnter(link);
        link.onmouseleave = (event) => this.onLinkMouseLeave(link);
      } else if (isNotEmail && isNotPhone) {
        link.rel = "noopener";
        link.target = "_blank";
      }
    });
  }
}

new App();

require("dotenv").config();

const fetch = require("node-fetch");
const path = require("path");
const express = require("express");

const app = express();
const errorHandler = require("errorhandler");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const logger = require("morgan");
const port = 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(errorHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));

const Prismic = require("@prismicio/client");
const PrismicH = require("@prismicio/helpers");
const UAParser = require("ua-parser-js");

// const client = (req) => {
//   return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
//     fetch,
//     accessToken: process.env.PRISMIC_ACCESS_TOKEN,
// req,
//     routes: { type: "about", path: "/about" },
//   });
// };
const routes = [
  {
    type: "about",
    path: "/about",
  },
  {
    type: "meta",
    path: "/meta",
  },
];

const client = Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
  fetch,
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  routes,
  // req,
});

const handleLinkResolver = (doc) => {
  // console.log("🚀 ~ file: app.js:50 ~ handleLinkResolver ~ doc", doc);
  if (doc.type == "album") {
    return `/detail/${doc.slug}`;
  }

  if (doc.type === "discographies") {
    return "/discography";
  }

  if (doc.type == "about") {
    return "/about";
  }

  // return "/";
};

app.use((req, res, next) => {
  const ua = UAParser(req.headers["user-agent"]);

  res.locals.isDesktop = ua.device.type === undefined;
  res.locals.isPhone = ua.device.type === "mobile";
  res.locals.isTablet = ua.device.type === "tablet";

  res.locals.ctx = {
    PrismicH,
  };

  res.locals.Link = handleLinkResolver;
  res.locals.PrismicH = PrismicH;
  res.locals.Numbers = (index) => {
    return index == 0
      ? "One"
      : index == 1
      ? "Two"
      : index == 2
      ? "Three"
      : index == 3
      ? "Four"
      : "";
  };

  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const handleRequest = async () => {
  const [about, home, meta, navigation, preloader, discography] =
    await Promise.all([
      client.getSingle("about"),
      client.getSingle("home"),
      client.getSingle("meta"),
      client.getSingle("navigation"),
      client.getSingle("preloader"),
      client.getAllByType("discography", { fetchLinks: "album.image" }),
    ]);

  const assets = [];

  // load images

  home.data.gallery.forEach((item) => {
    assets.push(item.image.url);
  });

  about.data.gallery.forEach((item) => {
    assets.push(item.image.url);
  });

  about.data.body.forEach((section) => {
    if (section.slice_type === "gallery") {
      section.items.forEach((item) => {
        assets.push(item.image.url);
      });
    }
  });

  discography.forEach((item) => {
    item.data.albums.forEach((album) => {
      assets.push(album.discography_album.data.image.url);
    });
  });

  // console.log(assets);

  return {
    assets,
    meta,
    home,
    discography,
    about,
    navigation,
    preloader,
  };
};

app.get("/", async (req, res) => {
  const defaults = await handleRequest();
  // const discography = await client.getAllByType("discography", {
  //   fetchLinks: "album.image",
  // });
  res.render("pages/home", {
    ...defaults,
  });
});

app.get("/about", async (req, res) => {
  const defaults = await handleRequest();
  const about = await client.getSingle("about");
  // console.log("🚀 ~ file: app.js:155 ~ app.get ~ about", about.data.body);

  res.render("pages/about", {
    ...defaults,
    about,
  });
});

app.get("/discography", async (req, res) => {
  const defaults = await handleRequest();

  // const home = await client.getSingle("home");

  // const discography = await client.getAllByType("discography", {
  //   fetchLinks: "album.image",
  // });

  res.render("pages/discography", {
    ...defaults,
  });
});

app.get("/detail/:uid", async (req, res) => {
  const defaults = await handleRequest();
  const album = await client.getByUID("album", req.params.uid, {
    fetchLinks: "discography.title",
  });

  res.render("pages/detail", {
    ...defaults,
    album,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

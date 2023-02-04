import express from "express";
import hbs from "express-handlebars";
import path from "path";
import fs from "fs";
let context = { folders: [], files: [] };

const app = express();
const PORT = 3000;

app.use(express.static("static"));
app.use(express.json());

app.set("views", path.join(__dirname, "views")); // ustalamy katalog views
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main.hbs",
    extname: ".hbs",
    partialsDir: "views/partials",
  })
);
app.set("view engine", "hbs");

app.post("/createFolder", function (req, res) {
  console.log(req.body.dirName);
  let dirName = req.body.dirName;
  let finalDirName = dirName;
  const files = fs.readdirSync(__dirname + "/upload");
  if (files && files.length > 0) {
    files.forEach((file) => {
      if (file === dirName) {
        let time = new Date().getTime();
        finalDirName = dirName + time;
      }
    });
    fs.mkdirSync(__dirname + "/upload/" + finalDirName);
  }
  res.send({ message: "ok" });
});

app.get("/", (req, res) => {
  res.redirect("/filemanager");
});

app.get("/filemanager", function (req, res) {
  context = { folders: [], files: [] };
  const files = fs.readdirSync(__dirname + "/upload");
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const stats = fs.statSync(__dirname + "/upload/" + file);
    if (stats.isDirectory()) {
      context.folders.push({
        name: file,
        type: "folder",
        path: __dirname + "/upload/" + file,
      });
    } else {
      let ext: string;
      switch (file.split(".")[1]) {
        case "jpg":
          ext = "/gfx/jpg.png";
          break;
        case "txt":
          ext = "/gfx/txt.png";
          break;
        case "pdf":
          ext = "/gfx/pdf.png";
          break;
        default:
          ext = "/gfx/default.png";
          break;
      }
      context.files.push({
        name: file,
        type: "file",
        path: __dirname + "/upload/" + file,
        ext: ext,
      });
    }
  }
  res.render("filemanager.hbs", context);
});

app.post("/createFile", function (req, res) {
  console.log(req.body.fileName);
  let fileName = req.body.fileName;
  let finalFileName = fileName;
  const files = fs.readdirSync(__dirname + "/upload");
  if (files && files.length > 0) {
    files.forEach((file) => {
      if (file === fileName) {
        let time = new Date().getTime();
        finalFileName = fileName + time;
        console.log(typeof (__dirname + "/upload/" + finalFileName));
      }
    });
    fs.writeFileSync(__dirname + "/upload/" + finalFileName, "test");
  }
  res.send({ message: "ok" });
});

app.post("/delete", function (req, res) {
  console.log(req.body.path);
  let path = req.body.path.split("/upload/");
  path.shift();
  console.log(path);
  if (fs.existsSync(__dirname + "/upload/" + path[0])) {
    console.log(__dirname);
    fs.lstat(__dirname + "/upload/" + path[0], (err, stats) => {
      if (stats.isDirectory()) {
        fs.rmdirSync(__dirname + "/upload/" + path[0], { recursive: true });
      } else {
        fs.rmSync(__dirname + "/upload/" + path[0]);
      }
    });
  }
  res.send({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import hbs from "express-handlebars";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.static("static"));
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

app.get("/", (req, res) => {
  res.render("filemanager.hbs");
});

app.listen(PORT, () => {
  console.log("Serwer działa na porcie " + PORT);
});

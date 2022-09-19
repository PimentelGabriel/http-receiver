import express from "express";
import exphbs from "express-handlebars";
import multer from "multer";

import info from "./services/info-cli/index.mjs";

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//Config Multer
const storage = multer.diskStorage({
    destination: function(req, file, callBack) {
        callBack(null, "uploads/");
    },
    filename: function(req, file, callBack) {
        callBack(null, file.originalname);
    }
})

const upload = multer({ storage });

info();


app.get("/", (req, res) => {

    const params = {
        metaData: {
            title: "Web-Box"
        },
        user: {
            id: Math.ceil(Math.random() * 100)
        }
    }

    return res.render("home", params);
})

app.post("/uploads/",
    upload.single("file"),
    (req, res) => {
        return res.send("Arquivo recebido")
    }
);

app.listen(
    3000,
    () => { console.log("\n\nStarted"); }
);
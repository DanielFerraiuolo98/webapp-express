const express = require("express");
const server = express();
const port = process.env.PORT || 3000;

const errorsHandler = require("./middlewares/errorsHandles");
const notFound = require("./middlewares/notFound");
const corsPolicy = require("./middlewares/corspolicy");
const movie = require("./routes/movie");

server.use(express.static("public"));

server.get("/", (req, res) => {
    res.send("Server attivo");
});

server.use(corsPolicy);

server.use(express.json());

server.use("/movies", movie);

server.use(errorsHandler);

server.use(notFound);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
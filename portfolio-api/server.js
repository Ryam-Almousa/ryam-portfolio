// server.js في مجلد portfolio-api
import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("data/db.json");
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter({
  "/api/*": "/$1",
});

server.use(cors());
server.use(middlewares);
server.use(rewriter);

// هنا /projects و /api/projects الاثنين يشتغلون
server.use(router);

const PORT = process.env.PORT || 5174;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

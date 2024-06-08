import express, { Request, Response, NextFunction, RequestHandler } from 'express';


const app = express();
const port = process.env.PORT || 3000;

const getHandler: RequestHandler = (req, res, next) => {
  return res.send("Express + TypeScript Server hhrkeh");
}

app.get("/", getHandler);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

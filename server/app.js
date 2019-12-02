import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import routes from './routes/index';
import * as Response from './utils/reponse'


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('pub'));
app.use(cors());

app.get('home', (req, res) => {
  fs.readFile('./templates/home.html', (err, result) => {
    res.send(result.toString());
  });
});


routes(app);

app.use(function(req, res, next){
  return Response.pageNotFoundError(res, 'Page not found');
});

app.use((err, req, res, next) => res.status(err.status || 500).send(err.error_message));


app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

export default app;

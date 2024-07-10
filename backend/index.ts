import express, { Application } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { rootRouter } from './src/routes';
import closeWithGrace from 'close-with-grace';
import { getSequelize } from './src/config/db';

const app: Application = express();

const port = process.env.PORT || 8000;

app.disable('x-powered-by');
app.use(express.json());
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.redirect('/api');
});
app.use('/api', rootRouter);

closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
  console.log(signal, manual);
  if (err) {
    console.error(err);
  }
  await getSequelize().close();
  console.log('Conexión a DB cerrada');
});

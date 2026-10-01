import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { connectDB } from './config/db.js';
import routerAPI from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use( express.urlencoded() );
app.use( express.json());
app.use(  express.static('public')  );

const port = process.env.PORT;
connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

routerAPI(app);

app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  });
});

app.listen( port, () => {
    console.log( chalk.green(`Servidor escuchando en http://localhost:${port}`));
})
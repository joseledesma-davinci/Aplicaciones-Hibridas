import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { connectDB } from './config/db.js';
import routerAPI from './routes/index.js';

dotenv.config();

const app = express();
app.use( express.urlencoded() );
app.use( express.json());
app.use(  express.static('public')  );

const port = process.env.PORT;
connectDB();


app.get('/', (request, response) => {
    count++;
    console.log(`Cliente conectado`);
    response.send(`<h1>Hola desde Express.js👋</h1> 
                    <ul>
                        <li><a href='/subjects'> Listado de materias </a> </li>
                        <li><a href='api/users'> Listado de usuarios </a> </li>
                        <li><a href='/register'> Registro </a> </li>
                        <li><a href='/contact'> Contactos </a> </li>
                    </ul>`);
})

routerAPI(app);

app.listen( port, () => {
    console.log( chalk.green(`Servidor Web en el Puerto ${port}`) );
    // Detenemos el proceso con Ctrl + c
})
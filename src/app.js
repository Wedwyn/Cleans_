import app from './routes.js';
import 'dotenv/config';

app.set('view engine', 'pug');
app.set('views', './src/views');

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log('Server started on port 3000');
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressHbrs = require('express-handlebars');


const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorsController = require('./controllers/errors');





const app = express();

// app.engine('handlebars', expressHbrs({ layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'handlebars' }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use(errorsController.error404);



app.listen(3000);
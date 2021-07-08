const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressHbrs = require('express-handlebars');

const sequelize = require('./utils/database');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorsController = require('./controllers/errors');



const app = express();

// app.engine('handlebars', expressHbrs({ layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'handlebars' }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// db.execute('select * from products')
// .then(result =>{
//     console.log(result[0], result[1]);
// })
// .catch( err =>{
//     console.log(err);
// });

app.use('/admin', adminRoutes);
app.use(shopRouter); 

app.use(errorsController.error404);

sequelize.sync()
.then(result => {
    //console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});




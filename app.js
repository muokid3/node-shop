const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressHbrs = require('express-handlebars');

const sequelize = require('./utils/database');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorsController = require('./controllers/errors');

const User = require('./models/user');
const Product = require('./models/product');

const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');



const app = express();

// app.engine('handlebars', expressHbrs({ layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'handlebars' }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})



app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use(errorsController.error404);


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
//User.hasMany(Product);

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, { through: CartItem });

// sequelize.sync({force: true})
 sequelize.sync()
    .then(result => {
        return User.findByPk(1);

    })
    .then(user => {
        if (!user) {
            return User.create({ name: "Dennis", email: "muokid3@gmail.com" });
        }
        return user;
    })
    .then(user => {
        //console.log(user);
        return user.createCart();
    })
    .then(cart =>{
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });




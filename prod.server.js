const express = require('express')
const port = 8088;

const app = express();

const router = express.Router();
router.get('/', (req, res, next) => {
    req.url = '/index.html'
    next();
})

app.use(router);

// Interface
// 1. Get json data
var goods = require('./data/goods.json')
var ratings = require('./data/ratings.json')
var seller = require('./data/seller.json')

// 2. Routing
var routes = express.Router();

// 3 Define interface
routes.get('/goods', (req, res) => {
  // Return json data to client side
  res.json(goods);
})

routes.get('/ratings', (req, res) => {
  // Return json data to client side
  res.json(ratings);
})

routes.get('/seller', (req, res) => {
  // Return json data to client side
  res.json(seller);
})

// app.use('/api', routes);
// Define static directories to /dist
app.use(express.static('./dist'));

module.express = app.listen(port, (err) => {
    if(err) {
      console.error(err);
        return;  
    } else {
        console.log('http://localhost' + port + '\n');
    }
    
})
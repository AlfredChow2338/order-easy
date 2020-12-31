
const express = require('express')

const app = express()

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

// 4. Middleware
app.use('/api', routes);

const devWebpackConfig = {
  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app){
      app.get('/goods', (req,res) => {
        res.json(goods);
      }),
      app.get('/ratings', (req,res) => {
        res.json(ratings);
      }),
      app.get('/seller', (req,res) => {
        res.json(seller);
      })
    }
  }
}

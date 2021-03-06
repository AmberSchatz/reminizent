var express = require('express');
var router = express.Router();
const campaignSentController = require('../controllers/campaignsent-controller');

var configjs = require('../config/config');
var jwt = require('jsonwebtoken'); 
var app = express();
app.set('superSecret', configjs.secret);

// route middleware to verify a token
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });

router.get('/', campaignSentController.index );
router.get('/id/:id', campaignSentController.getById);
router.get('/campaign/:id', campaignSentController.getByCampaignId);
router.get('/customer/:id', campaignSentController.getByCustomerId);

router.post('/', campaignSentController.create);

router.put('/:id', campaignSentController.update);

router.delete('/:id', campaignSentController.destroy);

module.exports = router;
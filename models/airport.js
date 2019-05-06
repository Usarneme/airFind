var mongoose = require('mongoose')

State = require('./state')

var airportSchema = mongoose.Schema({
  loc: {
    type: {
      type: String
    },
    coordinates: {
      type: Array
    },
    name: {
      type: String
    },
    code: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
})

var Airport = module.exports = mongoose.model('Airport', airportSchema)

// Get all airports
module.exports.getAirports = function(callback, limit) {
  Airport.find(callback)
}

// Get Airport by State
module.exports.getAirportByState = function(stateCode, callback, limit) {
  State.findOne({code: stateCode}, function(err, state) {
    var state = state
    Airport.find({
      loc: {
        $geoWithin: {
          $geometry: state.loc
        }
      }
    }, {
      name: 1,
      type: 1,
      code: 1,
      _id: 0
    }, callback).limit(limit).sort([['name', 'ascending']])
  })
}

// Get Airport by Proximity
module.exports.getAirportByProximity = function(location, callback, limit) {
  Airport.find({
    loc: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [ location.lon, location.lat ]
        },
        $maxDistance: location.distance * 1000
      }
    }
  },
  {
    name: 1,
    code: 1,
    _id: 0
  }, callback).limit(limit)
}
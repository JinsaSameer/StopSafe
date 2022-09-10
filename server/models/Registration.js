const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model
const registrationSchema = new Schema({
  expirationDate: {
    type: Number,
    required: true,
  },
  vehicleMake: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
});

module.exports = registrationSchema;

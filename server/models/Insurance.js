const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model
const insuranceSchema = new Schema({
  policyId: {
    type: String,
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

module.exports = insuranceSchema;

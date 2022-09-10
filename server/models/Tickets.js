const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model
const ticketsSchema = new Schema({
  ticketId: {
    type: String,
    required: true,
  },
  description: {
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

module.exports = ticketsSchema;

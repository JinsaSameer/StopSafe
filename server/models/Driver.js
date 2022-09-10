const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schemas
const insuranceSchema = require('./Insurance');
const registrationSchema = require('./Registration');
const ticketsSchema = require('./Tickets');

const driverSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    insuranceInfo: {
      type: Schema.Types.ObjectId,
      reference:'Insurance'
    },
    registrationInfo: [registrationSchema],
    ticketsInfo: [ticketsSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
driverSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
driverSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// returns number of tickets
driverSchema.virtual('ticketCount').get(function () {
  return this.ticketsInfo.length;
});

const Driver = model('User', driverSchema);

module.exports = Driver;

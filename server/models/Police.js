const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const policeSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    agencyAffiliation: {
      type: String,
      required: true,
      unique: true,
  },
  supervisor: {
    type: String,
    required: true,
    unique: false,
    },
    
    badgeNumber: {
      type: String,
      required: false,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: false,
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
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
policeSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
policeSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Police = model('Police', policeSchema);

module.exports = Police;

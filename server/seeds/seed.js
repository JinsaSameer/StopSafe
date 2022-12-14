const db = require('../config/connection');
const { Police } = require('../models');
const profileSeeds = require('./profileSeeds.json');

db.once('open', async () => {
  try {
    await Police.deleteMany({});
    await Police.create(profileSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

const { Police } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single police by either their id or their badgeNumber
  async getSinglePolice({ police = null, params }, res) {
    const foundPolice = await Police.findOne({
      $or: [{ _id: police ? police._id : params.id }, { badgeNumber: params.badgeNumber }],
    });

    if (!foundPolice) {
      return res.status(400).json({ message: 'Cannot find a police with this id!' });
    }

    res.json(foundPolice);
  },
  // create a police, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createPolice({ body }, res) {
    const police = await Police.create(body);

    if (!police) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(police);
    res.json({ token, police });
  },
  // login a police, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    const police = await Police.findOne({ $or: [{ badgeNumber: body.badgeNumber }, { email: body.email }] });
    if (!police) {
      return res.status(400).json({ message: "Can't find this police" });
    }

    const correctPw = await police.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(police);
    res.json({ token, police });
  },
};
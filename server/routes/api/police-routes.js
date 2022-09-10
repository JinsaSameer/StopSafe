const router = require('express').Router();
const {
  createPolice,
  getSinglePolice,
  saveTicket,
  deleteTicket,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createPolice).put(authMiddleware, saveTicket);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSinglePolice);

router.route('/ticket/:ticketId').delete(authMiddleware, deleteTicket);

module.exports = router;
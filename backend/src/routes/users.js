const router = express.Router();
const { User, validate } = require('../models/user');

/** Get User info */
router.get('/self', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

/** Create new User */
router.post('/', async (req, res) => {

});

/** Remove User */
router.delete('/', async (req, res) => {

});

module.exports = router;
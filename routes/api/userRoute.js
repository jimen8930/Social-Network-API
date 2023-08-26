const router = require('express').Router();
const {
  getAllUsers,
  getOneUserById,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:Id
router.route('/:id').get(getOneUserById).put(updateUser).delete(deleteUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
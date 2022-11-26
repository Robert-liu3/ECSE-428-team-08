import user from "../models/user.js";
import User from "../models/user.js";

// For testing since cant access database
const users = [];
/**
 *
 * @param {*} req
 * @param {*} res
 *
 * functions to get all users
 */
export const getUsers = async (req, res) => {
  await User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json("Error: " + err));
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * function to get a specific user by username
 */
export const getUser = async (req, res) => {
  console.log(req.params.username);
  await User.findById(req.params.username)
    .then((specificUser) => res.send(specificUser))
    .catch((err) => res.json("Error: " + err));
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * function to register an user
 */
export const createUser = async (req, res) => {
  console.log(req.body);
  const userInfo = req.body;
  const newUser = new User(req.body);
  newUser
    .save()
    .then(() => res.send("user added"))
    .catch((err) => res.json("Error:" + err));
};
/**
 *
 * @param {*} req
 * @param {*} res
 *
 * function to get check the login credentials of a user
 */
export const login = async (req, res) => {
  console.log("I am loginf")
  // console.log(req.params)
  const userId = req.params.username;

  console.log(userId)



  User.find({ userId })
    .then((info) => {
       console.log(info)
      if (info[1].password == req.params.password) {
        res.send("Correct "+ userId);
      } else {
        res.send("Wrong password or Username");
      }
    })
    .catch((err) => res.json("Error: " + err ));
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * function to check to follow a user
 */
export const followUser = async (req, res, next) => {
  var profileId = req.params.username;

  await User.findById(req.body._id)
    .then(async (user) => {
      if (!user) {
        res.send(404, "user is not found");
      }

      await User.findById(profileId)
        .then((currentUser) => {
          console.log(currentUser.following.length);
          // make sure user can follow the same user twice
          if (currentUser.following.includes(user._id)) {
            return res.sendStatus(401);
          }
          currentUser.follow(user);
          return res.send("follow " + req.body._id + " successfully");
        })
        .catch(next);
    })
    .catch(next);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * function to unfollow a user
 */
export const unfollowUser = async (req, res, next) => {
  var profileId = req.profile._id;

  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.unfollow(profileId).then(function () {
        return res.json({ profile: req.profile.toProfileJSONFor(user) });
      });
    })
    .catch(next);
};

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
  console.log(req.params.username, req.params.password);
  const userId = req.params.username;
  await User.find({ userId })
    // console.log(User.find({ userId }));
    .then((info) => {
      console.log(info[0].password);
      if (info[0].password == req.params.password) {
        res.send("Correct " + userId);
      } else {
        res.send("Wrong password or Username");
      }
    })
    .catch((err) => res.json("Error: " + err));
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
        return res.send(404, "user is not found");
      }

      await User.findById(profileId)
        .then((currentUser) => {
          console.log(currentUser.following.length);
          // make sure user can follow the same user twice
          if (currentUser.isFollowing(user)) {
            return res.sendStatus(401);
          }
          currentUser.follow(user);
          return res.send("followed " + req.body._id + " successfully");
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
  var profileId = req.params.username;

  User.findById(req.body._id)
    .then(async (user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      await User.findById(profileId)
        .then((currentUser) => {
          currentUser.unfollow(user);
          return res.send("unfollowed " + req.body._id + " successfully");
        })
        .catch(next);
    })
    .catch(next);
};

export const addToWatchList = async (req, res) => {
  console.log(req.params.username, req.params.ticker);
  const ticker = req.params.ticker;
  const userToUpdate = await user.findById(req.params.username);

  if (userToUpdate === null)
    res.json("Error: could not find a user with the provided id.");
  else {
    // add to watchList (string)
    console.log("Inside add to watchlist, found user");
    userToUpdate.addToWatchList(ticker);
    res.json(userToUpdate);
    console.log("Stock successfully added to watchList.");
  }
};

// Provided user id and stock id
export const removeFromWatchList = async (req, res) => {
  console.log(req.params.username, req.params.ticker);
  const ticker = req.params.ticker;
  const userToUpdate = await user.findById(req.params.username);

  if (userToUpdate === null)
    res.json("Error: could not find a user with the provided id.");
  else {
    // Remove reference of stock
    console.log("Stock to be removed from watchList.");
    userToUpdate.removeFromWatchList(ticker);
    res.json(userToUpdate);
  }
};

import user from "../models/user.js";

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
  await user
    .find()
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
  await user
    .findById(req.params.username)
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
  const newUser = new user(req.body);
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
  // console.log(req.params)
  const id = req.params.username;

  // console.log(req.params.password)

  user
    .find({ id })
    .then((info) => {
      if (info[1].password == req.params.password) {
        res.json("Correct");
      } else {
        res.json("Wrong password or Username");
      }
    })
    .catch((err) => res.json("Error: " + err + "dasdadasd"));
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * function to check if follow a user
 */
export const followUser = async (req, res, next) => {
  var profileId = req.params.username;

  await user
    .findById(profileId)
    .then((User) => {
      if (!User) {
        console.log("null");
      }

      res.send("dasda");
      return User.follow(req.body._id);
    })
    .catch(next);
};

// export const followUser = async (req, res, next) => {

//   var profileId = req.params.username;

//    user.findById(req.body._id).then(User=>{
//      if (!User) { console.log("null") }

//    return User.follow(User)
//    }).catch(next);

// };

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * function to check if unfollow a user
 */
export const unfollowUser = async (req, res, next) => {
  var profileId = req.profile._id;

  user
    .findById(req.payload.id)
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

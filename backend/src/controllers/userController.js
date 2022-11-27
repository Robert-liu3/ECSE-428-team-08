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
  user
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
  try {
    console.log("From the backend start: " + req.params);
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == req.params.username) {
        res.send({
          username: users[i].username,
          image: users[i].image,
          profileBio: users[i].profileBio,
          password: users[i].password,
          watchList: users[i].watchList,
        });
        break;
      }
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * function to register an user
 */
export const createUser = async (req, res) => {
  const userInfo = req.body;
  console.log(req.body);
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

// Provided user id and stock id
export const addToWatchList = async (req, res) => {
  const ticker = req.query["ticker"];
  const userToUpdate = await user.findById(req.query["userId"]);

  if (userToUpdate === null)
    res.json("Error: could not find a user with the provided id.");
  else {
    // add to watchList (string)
    userToUpdate.addToWatchList(ticker);
    res.json(userToUpdate);
    console.log("Stock successfully added to watchList.");
  }
};

// Provided user id and stock id
export const removeFromWatchList = async (req, res) => {
  const ticker = req.query["ticker"];
  const userToUpdate = await user.findById(req.query["userId"]);

  if (userToUpdate === null)
    res.json("Error: could not find a user with the provided id.");
  else {
    // Remove reference of stock
    userToUpdate.removeFromWatchList(ticker);
    res.json(userToUpdate);
    console.log("Stock successfully removed from watchList.");
  }
};

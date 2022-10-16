import user from "../models/user.js";

// For testing since cant access database
const users = [];

export const getUser = async (req, res) => {
  try {
    res.json({users})
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const userInfo  = req.body;
  console.log(userInfo);
  users.push({image: userInfo.image, profileBio: userInfo.profileBio});
  console.log(users)

  const newUser = new user(userInfo);

  try {
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

import { User } from "discord.js";
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
  user.find()
    .then(users => res.json(users))
    .catch(err => res.json("Error: " + err))
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
    for (let i = 0; i < users.length; i++) {
      console.log(i)
      if(users[i].username == req.params.username){
      res.send({ username: users[i].username, image: users[i].image, profileBio: users[i].profileBio, password: users[i].password });
      break;
      }
      break;
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
  console.log(req.body)
  const newUser = new user(req.body);
  newUser.save()
    .then(() => res.json("user added"))
    .catch(err => res.json("Error:" + err))


  // const newUser = new user(userInfo);

  // try {
  //   console.log("here");
  //   users.push({username: userInfo.username, image: userInfo.image, profileBio: userInfo.profileBio, password: userInfo.password});
  //   console.log(users);
  //   await newUser.save();
  //   res.send(newUser);
  // } catch (error) {
  //   res.send({ message: error.message });
  // }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * function to get check the login credentials of a user
 */
export const login = async (req, res) => {
  console.log("HELLO");
  console.log(req.params)
  const id = req.params.username;
  // user.find({id}, (error, data) =>{
  //   if(error){
  //     console.log(error)
  //   }else{
  //     console.log(data[1].password)
  //   }
  // })

  console.log(req.params.password)

  user.find({id})
    .then(info => {
      if(info[1].password == req.params.password){
        res.json("Correct")
      }
      else{
        res.json("Wrong password or Username")
      }
    })
    .catch(err => res.json("Error: " + err + "dasdadasd"))
    

  // try {
  //   for (let i = 0; i < users.length; i++) {
  //     if(users[i].username == req.params.username && users[i].password == req.params.password){
  //     res.send({ username: users[i].username, image: users[i].image, profileBio: users[i].profileBio, password: users[i].password });
  //     }
  //   }
  // } catch (error) {
  //   res.send({ message: error.message + "here" });
  // }
};


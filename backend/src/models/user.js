import mongoose from "mongoose";

let UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    _id: String,
    profileBio: String,
    image: String,
    password: String,
    status: Boolean, // true-> login, false-> not login
    following: [{ type: mongoose.Schema.Types.String, ref: "User" }],
  },

  {
    timestamps: true,
  }
);

UserSchema.methods.toProfileJSONFor = function () {
  return {
     test : this.email,
     firstName: this.firstName,
     lastName: this.lastName,
     email: this.email,
     _id: this._id,
     profileBio: this.profileBio,
     image: this.image,
     status: this.status,
     following: user ? user.isFollowing(this._id) : false
  };
};

// Follow a user with id 'id' NOTE: cannot use arrow function because of this property
UserSchema.methods.follow = async function (id) {
  this.following.push(id);
  return await this.save();
};

// Unfollow a user with id 'id'
UserSchema.methods.unfollow = function (id) {
  this.following.remove(id._id);

  return this.save();
};

// Whether this user is following some other user
UserSchema.methods.isFollowing = function (id) {
  return this.following.some((followingId) => {
    return followingId === id._id;
  });
};

const user = mongoose.model("User", UserSchema);
export default user;

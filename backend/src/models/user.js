import mongoose from "mongoose";

let UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    _id: String,
    profileBio: String,
    image: String,
    username: String,
    password: String,
    watchList: [String],
    status: Boolean, // true-> login, false-> not login
    following: [{ type: mongoose.Schema.Types.String, ref: "User" }],
  },

  {
    timestamps: true,
  }
);

UserSchema.method.toProfileJSONFor = (user) => {
  return {
    username: this.username,
    profileBio: this.profileBio,
    image: this.image,
    watchList: this.watchList,
    following: user ? user.isFollowing(this._id) : false,
  };
};

UserSchema.methods.toProfileJSONFor = (user) => {
  return {
    username: this.username,
    bio: this.bio,
    image:
      this.image || "https://static.productionready.io/images/smiley-cyrus.jpg",
    watchList: this.watchList,
    following: user ? user.isFollowing(this._id) : false,
  };
};

// Follow a user with id 'id'
UserSchema.methods.follow = (id) => {
  this.following.add(id);

  return this.save();
};

// Unfollow a user with id 'id'
UserSchema.methods.unfollow = (id) => {
  this.following.remove(id);

  return this.save();
};

// Whether this user is following some other user
UserSchema.methods.isFollowing = (id) => {
  return this.following.some((followingId) => {
    return followingId.toString === id.toString;
  });
};

// Add an article with specified id to the list of favourites
UserSchema.methods.addFavouriteArticle = function (id) {
  this.likedArticles.push(id);
  return this.save();
};

// Remove an article from favourites list
UserSchema.methods.removeFavouriteArticle = function (id) {
  const indexOfId = this.likedArticles.indexOf(id);
  this.likedArticles.splice(indexOfId, 1);
  return this.save();
};

// Add a Stock ticker string to the watch list
UserSchema.methods.addToWatchList = function (ticker) {
  const indexOfId = this.watchList.indexOf(ticker);
  if (indexOfId === -1) {
    this.watchList.push(ticker);
  }
  console.log("Watchlist from addToWatchList:");
  console.log(this.watchList);
  return this.save();
};

// Remove a Stock ticker from watch list
UserSchema.methods.removeFromWatchList = function (ticker) {
  const indexOfId = this.watchList.indexOf(ticker);
  this.watchList.splice(indexOfId, 1);
  return this.save();
};

// Remove an article from favourites list
UserSchema.methods.toProfileJSONFor = function () {
  return {
    test: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    _id: this._id,
    profileBio: this.profileBio,
    image: this.image,
    status: this.status,
    following: user ? user.isFollowing(this._id) : false,
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

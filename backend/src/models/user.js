import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    _id: String,
    profileBio: String,
    image: String,
    password: String,
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArticleBookmark'}]
},
{
    timestamps: true
});

UserSchema.method.toProfileJSONFor = (user) => {
    return {
        username: this.username,
        profileBio: this.profileBio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false
    }
};

UserSchema.methods.toProfileJSONFor = (user) => {
    return {
      username: this.username,
      bio: this.bio,
      image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: user ? user.isFollowing(this._id) : false
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
    return this.following.some(followingId => {
        return followingId.toString === id.toString;
    })
};

// Add an article with specified id to the list of favourites
UserSchema.methods.addFavouriteArticle = (id) => {
  this.favouriteArticles.add(id);

  return this.save();
};

// Remove an article from favourites list
UserSchema.methods.removeFavouriteArticle = (id) => {
    this.favouriteArticles.remove(id);

    return this.save();
}

  // Remove an article from favourites list
const user = mongoose.model('User', UserSchema);
export default user;
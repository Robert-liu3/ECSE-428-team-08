import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    username: string,
    profileBio: String,
    image: String,
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
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

  mongoose.model('User', UserSchema);
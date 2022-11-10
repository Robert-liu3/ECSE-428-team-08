import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    _id: String,            
    profileBio: String,
    image: String,
    password: String,
    status: Boolean,// true-> login, false-> not login
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},



{
    timestamps: true
});

  // UserSchema.methods.toProfileJSONFor = (user) => {
  //   return {
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //     _id: this._id, 
  //     profileBio: this.profileBio,
  //     image: this.image,
  //     status: this.status,
  //     following: user ? user.isFollowing(this._id) : false
  //   }
  // };

  // Follow a user with id 'id' NOTE: cannot use arrow function because of this property
  UserSchema.methods.follow = function(id){

    console.log(this.following)
    // console.log("dasdas")

    // console.log(mongoose.model('User').find({_id:"Noah2"}))
    // console.log
    // if(this.following.indexOf(id) === -1){
    //   this.following.push(id);
    // }
  
    // return this.save();
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



const user = mongoose.model('User', UserSchema);
export default user;
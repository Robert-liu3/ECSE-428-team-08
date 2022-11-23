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
    following: [{ type: mongoose.Schema.Types.String, ref: 'User' }]
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
  UserSchema.methods.follow = async function(id){

    // console.log(this.following)
  

    // console.log(mongoose.model('User').find({_id:"Noah2"}))
  
    // if(this.following.indexOf(id) === -1){
     console.log(id);


    

    this.following.push(id);

    console.log(this.firstName)
    console.log(this.following)

    // }
  
    return await this.save();
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
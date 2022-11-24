const {
    Schema, model,
    ObjectId
}
= require("mongoose")

const userSchema = new Schema({ 
    username: {
        type: String,
        required: true,
        trim: true, 
        unique: true, 
    }, 
    email: {
        type: String,
        required: true,
        unique: true, 
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    },
      thoughts: [{
        type: ObjectId, 
        ref: "Thought"
      }],
      friends: [{
        type: ObjectId,
        ref: "User"
      }]
})
userSchema.virtual("friendCount").get(function (){
    return this.friends.length 
})
const User = model("User",userSchema)
module.exports = {
    User 
}
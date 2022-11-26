const {
    Schema, model,
    ObjectId, Types
}
= require("mongoose")

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
reactionBody: {
    type: String, 
    required: true,
    maxLength: 280,
},
username: {
    type: String,
    required: true,

},
createdAt: {
    type: Date,
        default: Date.now(),
        get: (v)=>{
        return v 
        }
}

})
const Reaction = model("Reaction", reactionSchema)
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1, 
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (v)=>{
        return v 
        }
    },
    username: {
        type: String,
        required: true, 

    },
    reactions: [reactionSchema]
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

})
thoughtSchema.virtual("reactionCounts").get(function(){
    return this.reactions.length
})
const Thought = model("Thought", thoughtSchema)
module.exports = {
    Thought
}
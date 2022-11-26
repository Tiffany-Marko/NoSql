const express = require("express")
const {User} = require("./models/user.js")
const {Thought} = require("./models/thought.js")
const mongoose = require("mongoose")
require("dotenv").config()


const app = express()
app.use(express.json())

app.get("/api/users", async (req, res)=>{
const users = await User.find({})
console.log(users)
res.json(users)
})
app.get("/api/users/:id", async (req, res)=>{
    const id = req.params.id
    const user = await User.findById(id)
    console.log(user)
    res.json(user)
})
app.post("/api/users/create", async (req, res) =>{
    const newUser = req.body
    const createdAUser = await User.create(newUser)
    console.log(createdAUser)
    res.json(createdAUser)

})
app.put("/api/users/:id", async (req, res)=>{
    const id = req.params.id
    const update = req.body 
    const user = await User.findByIdAndUpdate(id,update)
    console.log(user)
    res.json(user)
})
app.delete("/api/users/:id", async (req, res)=>{
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    console.log(user)
    res.json(user)
})
app.post ("/api/users/:userId/friends/:friendId", async (req, res)=>{
const userId = req.params.userId
const friendId = req.params.friendId
const user = await User.findByIdAndUpdate(userId, {$push:{friends:friendId}})
// 638174b98116617aa2ceca71
// 638173f41a89e9ca37706409
console.log(user) 
res.json(user)
})
app.delete ("/api/users/:userId/friends/:friendId", async (req, res)=>{
    const userId = req.params.userId
    const friendId = req.params.friendId
    const user = await User.findByIdAndUpdate(userId, {$pull:{friends:friendId}})
    // 638174b98116617aa2ceca71
    // 638173f41a89e9ca37706409
    console.log(user) 
    res.json(user)
    })

    app.post("/api/thoughts/:thoughtId/reactions", async (req, res)=>{
        console.log("Create reaction")
        const thoughtId = req.params.thoughtId
        const reaction = req.body
        const thought = await Thought.findByIdAndUpdate(thoughtId,{$push:{reactions:reaction}})
        console.log(thought)
        res.json(thought)

    })
    app.delete ("/api/thoughts/:thoughtId/reactions/:reactionId", async (req, res)=>{
        const thoughtId = req.params.thoughtId
        const reactionId = req.params.reactionId
        console.log("Reaction id: ", reactionId);
         const thought = await Thought.findByIdAndUpdate(thoughtId, {$pull:{reactions:{reactionId}}})
 
        console.log(thought) 
        res.json(thought)
        })

    app.get("/api/thoughts", async (req, res)=>{
        const thoughts = await Thought.find({})
        console.log(thoughts)
        res.json(thoughts)
        })

        app.get("/api/thoughts/:id", async (req, res)=>{
            const id = req.params.id
            const thought = await Thought.findById(id)
            console.log(thought)
            res.json(thought)
        })

        app.post("/api/thoughts/create", async (req, res) =>{
            const newThought = req.body
            const username = req.body.username
            const createdAThought = await Thought.create(newThought)
            const updatedUser= await User.findOneAndUpdate ({username},{$push:{thoughts:createdAThought._id}})
            console.log(createdAThought)
            console.log(updatedUser)
            res.json(createdAThought)
        
        })
        app.put("/api/thoughts/:id", async (req, res)=>{
            const id = req.params.id
            const update = req.body 
            const thought = await Thought.findByIdAndUpdate(id,update)
            console.log(thought)
            res.json(thought)
        })
        app.delete("/api/thoughts/:id", async (req, res)=>{
            const id = req.params.id
            const thought = await Thought.findByIdAndDelete(id)
            console.log(thought)
            res.json(thought)
        })
       

async function connectAndRun(){
const connection = await mongoose.connect(process.env.mongoConnection)
app.listen(3001, () => console.log("server listening"))
} 

connectAndRun()




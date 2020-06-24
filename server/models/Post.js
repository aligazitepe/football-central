const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    
    body: {
        type: String,
        required: true
    },

    comments: {
        type: Array,
        required: true
    },
    // push user information inside object
    createdBy:{
        type:Object
        // type should be userID
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    });

const Post = mongoose.model('posts', PostSchema);



module.exports = Post;
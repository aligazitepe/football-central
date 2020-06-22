const express = require("express");
const Post = require("../model/Post");


function createPost (req, res) {
    const { topic, body } = req.body;
    if(!topic || !body ) {
        res.send({
            type: "error",
            message: "Missing content in topic or body"
        })
    } else {
        
        let newPost = new Post({
            topic,
            body,
        }) 
            
            newPost.save()
            .then(post => {
                res.send({
                    post,
                    type: 'success',
                    message: 'You made a new post successfully.'
                })
            })
    }

        
};

function deletePost (req, res) {
   // const { topic, body } = req.body;
   console.log(req)
const {id} = req.params;

     Post.deleteOne({_id: id}, (err, result) => {
                      if (err) {
                        res.send(err);
                      } else {
                        res.send(result);
                      }

    })



    // if(topic || body ) {
    //     res.send({
    //         type: "success",
    //         message: "Post Deleted."
    //     }).then(post => {
    //         Post.deleteOne({ topic, body }, function(err, result) {
    //           });
    //     })
    // }    
};
// SQL
// Gets all posts from db, data can be named anything.
function getAllPosts (req, res) {
    Post.find({})
        .then((posts, err) => {
            if(posts) {
                res.send({
                    type: "success",
                    allPosts: posts
                })
            }

            if(err) {
                res.send({
                    type: "error",
                    error: err
                })
            }
        });
}

function createComment (req, res) {
    console.log("BODY HERE: ", req.body)
    Post.find({ _id: req.body.id })
        .then((posts, err) => {
            if(posts) {
                console.log("Post with id: ", posts);
                if(posts.length) {
                    let comments = posts[0].comments;
                    comments.push(req.body.comment);

                    Post.update({ _id: req.body.id }, {
                        comments
                    }).then(()=>{
                        res.send({
                            type: "success",
                            message: "Comment added successfully!"
                        })
                    }).catch(errComment=>{
                        res.send({
                            type: "error",
                            message: errComment
                        })
                    })
                }
            } else {
                res.send({
                    type: "error",
                    message: "No post found!"
                })
            }

            if(err) {
                res.send({
                    type: "error",
                    message: err
                })
            }
        })
}



module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    createComment
};
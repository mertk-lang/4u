const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');


// Index Page

router.get('/', (req, res) => {
    Post.find({})
    .populate('author')
    .then((err, posts) => {
        if(err) {
            res.json(err);
        } else {
            res.json(posts)
        }
    })
})

// Post(Create) Route

router.post('/add', (req, res) => {
    let post = new Post({
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        author: req.user.id
    });
    post.save()
    .populate('author')
    .then((post) => {
        console.log(post)
        res.status(200).json({post: 'post'})
    })    
})

// Edit Post route
 
router.get('/edit/:id', (req, res) => {
    Post.findById(req.params.id,  (err, post) => {
        if(err){
            res.json(err)
        } else {
            res.json(post)
        }
    })
})

// Update the Post

router.post('/update/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if(err){
            res.json(404).send('data was not found');
        } else {
            post.title = req.body.title;
            post.body = req.body.body;
            post.image = req.body.image
            post.save()
            .then(() => {
                res.json('Update was successful')
            })
            .catch(() => {
                res.status(400).send('was unable to update');
            });
        }
    });
})

// Delete Router

router.delete('/delete/:id',  (req, res) => {
    Post.findByIdAndRemove({_id: req.params.id}, (err) => {
        if(err){
            res.json(err);
        } else {
            res.json('Removal was successful');
        }
    });
});


module.exports = router;
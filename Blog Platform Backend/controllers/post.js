const postModel = require('../models/post');

const makePost = async (req,res) => {
    const {creatorId, ...others} = req.body;
    const {id} = req.user;
    const madePost = new postModel({ ...others, creatorId: id});
    try {
        await madePost.save();
        return res
            .status(200)
            .json({ message: "post made succesfully" });
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });

    }
};

const findPost = async (req,res) => {
    try {
        const foundPost = await postModel.find().populate({path: "creatorId", select:"username gender profilePics "}).populate({path: "comment", select: "comment userId"});
        res
            .status(200)
            .json(foundPost)
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });

    }
}

// finding one post
const findOnePost = async (req,res) => {
    const { id } = req.params;
    try {
        const foundedPost = await postModel.findById(id);
        res
            .status(200)
            .json(foundedPost)
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });

    }
};

// updating a post
const updatePost = async (req,res) => {
    const { postId, ...others} = req.body;
    const{id} = req.user;
    const post = await postModel.findById(postId);
    if (post.creatorId.toString() !== id ){
        res
            .status(404)
            .json({ message: "unauthorized" });
    };
    try {
        await postModel.findByIdAndUpdate( postId, { ...others }, { new:true });
        res
            .status(202)
            .json({ message: "post updated successfully" });
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });
    }
};

// deleting a post
const deletePost = async (req,res) => {
    const { postId } = req.body;
    const{id} = req.user;
    const post = await postModel.findById(postId);
    if( post.creatorId.toString() !== id) {
        return res
                    .status(404)
                    .json({ message: "unauthorized" });
    };
    try {
        await postModel.findByIdAndDelete(postId);
        res
            .status(200)
            .json({ message: "post deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });
    }
};

// likes
const likePost = async (req,res) => {
    const { postId } = req.body;
    const {id} = req.user;
    const thePost = await postModel.findById(postId);
    const gottenLikes = thePost.likes;
    const checkLike = gottenLikes.includes(id);
    if(!checkLike){
        gottenLikes.push(id);
    } else {
        const getIndex = gottenLikes.indexOf(id);
        gottenLikes.slice(getIndex, 1);
    }
        try {
            await postModel.findByIdAndUpdate(postId, { likes: gottenLikes }, { new: true });
            res
                .status(200)
                .json({ message: "like updated successfully" });
        } catch (error) {
            res
            .status(500)
            .json({messge: "something wemt wrong" });
        }
}




module.exports = { makePost, findPost , findOnePost, updatePost, deletePost, likePost };

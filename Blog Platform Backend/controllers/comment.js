const commentModel = require('../models/comment');
const postModel = require('../models/post');

// creating a new comment
const makeComment = async (req,res) => {
    const {comment, postId} = req.body;
    const { id } = req.user;
    const newComment = new commentModel({ comment, userId: id, postId});
    try {
       const savedcomment = await newComment.save();
        await postModel.findByIdAndUpdate( postId, {$push: { comment:savedcomment.id}});
        res
            .status(200)
            .json({ message: "comment made successfully"});
    } catch (error) {
        res
            .status(500)
            .json({message: "something wemt wrong" });
    }
};

// getting comments
const getComment = async (req,res) => {
    const {id} = req.query;
    try {
        const oneComment = await commentModel.findById(id).populate({ path: "userId", select: "username gender"}).populate({ path: "postId", select: "title description"});
        res
            .status(200)
            .json(oneComment);
    } catch (error) {
        res
            .status(500)
            .json({message: "something went wrong" });
    }
}

// editting comment

const editComment = async (req, res) => {
    const {commentId, ...others} = req.body;
    const {id} = req.user;
    try {
        const findComment = await commentModel.findById(commentId);
        if(findComment.userId.toString() !== id){
            res
                .status(404)
                .json({ message: "not authorized"});
        }
        await commentModel.findByIdAndUpdate( commentId, {...others}, {new:true});
        res
            .status(202)
            .json({ message: "Comment updated successfully"});
    } catch (error) {
        res
        .status(500)
        .json({message: "something wemt wrong" });
    }
}

const deleteComment = async (req, res) => {
    const {commentId} = req.body;
    const{id} = req.user;
    try {
            const findComment = await commentModel.findById(commentId);
        if(findComment.userId.toString() !== id ){
            res
                .status(401)
                .json({ message: "not authorized"});
        }
        await commentModel.findByIdAndDelete(commentId);
        res
            .status(200)
            .json({ message: "comment deleted successfully"});
    } catch (error) {
        res
        .status(500)
        .json({message: "something wemt wrong" });
    }
}

module.exports = { makeComment, getComment, editComment, deleteComment }
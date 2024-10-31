const mongoose = require('mongoose');
commentSchema = new mongoose.Schema(

                                    {
                                        comment: 
                                                    { 
                                                        type: String, 
                                                        required: true
                                                     },
                                        userId: 
                                                    { 
                                                        type: mongoose.Schema.Types.ObjectId, 
                                                        ref: 'USER',
                                                        required: true
                                                     },
                                        postId:       
                                                    { 
                                                        type: mongoose.Schema.Types.ObjectId, 
                                                        ref: 'POST', 
                                                        required: true 
                                                    },

                                    },
                                        { timestamps: true }
                                );

commentModel = new mongoose.model('COMMENTS', commentSchema);

module.exports = commentModel;
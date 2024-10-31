const mongoose = require('mongoose');

// defining schema for user
const userSchema = new mongoose.Schema(
                                        {
                                            fullName:   {
                                                            type: String,
                                                            required: true,
                                                        },

                                            username:   {
                                                            type: String,
                                                            required: true,
                                                            unique: true,
                                                        },
                                                        
                                            email:      {
                                                            type: String,
                                                            required: true,
                                                            unique: true,
                                                        },
                                            password:      {
                                                            type: String
                                                        },

                                            profilePics:      {
                                                            type: String
                                                        },

                                            CredentialAcct: {
                                                                type: Boolean,
                                                                default: true
                                            },

                                            gender:      {
                                                            type: String,
                                                            enum: ['male', 'female']
                                                        },
                                            role:      {
                                                            type: String,
                                                            enum: ['Basic','Admin', 'SuperAdmin'],
                                                            default: "Basic"
                                                        },
                                        },
                                        { timestamps: true }
                                    );

const userModel = mongoose.model('USER', userSchema);
module.exports = userModel;
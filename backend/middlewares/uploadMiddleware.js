const express = require('express');
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('./../Config/cloudinary_config');
const upload = require("../Config/multer_config");

const uploadMiddleWare = (req,res, next) => {
    upload.single('file')(req,res, (err) => {
        if(err){
            return res.json({
                message : "Error",
                success : false,
                error_message : err.message
            })
        }

        next();
    })
}

module.exports = uploadMiddleWare;
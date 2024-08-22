const Router = require('express').Router();
const upload = require('../Config/multer_config')

Router.post('/upload-single', upload.single('file'), async (req,res) => {
    if(req.file){
        res.json({
            message : "File uploaded successfully",
            success : true,
            url : req.file.path
        })
    }

    else
    {
        res.json({
            success: false,
            message: 'No file uploaded',
        });
    }
})

// Route to upload multiple files
Router.post('/upload-multiple', upload.array('files', 10), async (req, res) => {
    if (req.files && req.files.length > 0) {
        const fileUrls = req.files.map(file => file.path);
        
        res.json({
            message: "Files uploaded successfully",
            success: true,
            files: fileUrls
        });
    } else {
        res.json({
            success: false,
            message: 'No files uploaded',
        });
    }
});

module.exports = Router;
const cloudinary = require('cloudinary').v2;

function supported(type , supportedType) {

    return supportedType.includes(type);
}

async function imageUploader(file , folder , quality , height) {

    const supportedType = ['jpg' , 'jpeg' , 'png'];
    const type = file.name.split('.')[1].toLowerCase();

    if(!supported(type , supportedType)){
        console.error("File type is not supported")
    };

    const options = {folder};

    if(quality){
        options.quality;
    }

    if(height){
        options.height;
    }

    options.resource_type = "auto";
    
    return await cloudinary.uploader.upload(file.tempFilePath , options);
};

module.exports = imageUploader;
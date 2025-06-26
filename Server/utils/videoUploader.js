const cloudinary = require('cloudinary').v2;

function supported(type , supportedType) {
    return supportedType.includes(type);
}

async function videoUploader(file , folder) {

    const supportedType = ['mp4' , 'mov'];
    const type = file.name.split('.')[1].toLowerCase();

    if(!supported(type , supportedType)){
       console.error("File type is not supported")
    };

    const options = {folder};

    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath , options);
};

module.exports = videoUploader;
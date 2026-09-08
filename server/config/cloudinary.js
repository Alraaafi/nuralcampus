const cloudinary = require('cloudinary').v2;

const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (!cloudinaryUrl) {
    throw new Error('CLOUDINARY_URL is not configured');
}

cloudinary.config({ cloudinary_url: cloudinaryUrl });

const uploadBuffer = (buffer, folder) => new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder,
            resource_type: 'image'
        },
        (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        }
    );

    uploadStream.end(buffer);
});

module.exports = { cloudinary, uploadBuffer };
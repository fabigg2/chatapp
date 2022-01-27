import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({
    cloud_name: 'dcbpbghxj', 
    api_key: '925141458417749', 
    api_secret: '7S0mB8Z4u4jzu4E-Y7Gdb32ASyU',
    secure: true
});

export const uploadImage =async (file:any) => {
        const resp = await cloudinary.uploader.upload(file);
        return resp.secure_url;
}


export const deleteImage = async (imageUrl:string) => {
    const imageUrlSplited = imageUrl.split('/');
    const imageName = imageUrlSplited[imageUrlSplited.length-1];
    const [id] = imageName.split('.');
    const resp = await cloudinary.uploader.destroy(id);
    return resp;
}
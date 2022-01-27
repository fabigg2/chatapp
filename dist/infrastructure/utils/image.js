"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dcbpbghxj',
    api_key: '925141458417749',
    api_secret: '7S0mB8Z4u4jzu4E-Y7Gdb32ASyU',
    secure: true
});
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield cloudinary_1.v2.uploader.upload(file);
    return resp.secure_url;
});
exports.uploadImage = uploadImage;
const deleteImage = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrlSplited = imageUrl.split('/');
    const imageName = imageUrlSplited[imageUrlSplited.length - 1];
    const [id] = imageName.split('.');
    const resp = yield cloudinary_1.v2.uploader.destroy(id);
    return resp;
});
exports.deleteImage = deleteImage;

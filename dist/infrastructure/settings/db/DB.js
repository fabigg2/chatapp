"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const local = 'mongodb://localhost:27017/test1';
const connect = () => {
    mongoose_1.default.connect(process.env.DB || local);
    let { connection: db } = mongoose_1.default;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Conection succesful');
    });
    return mongoose_1.default;
};
const desconnect = () => {
    mongoose_1.default.disconnect();
};
exports.default = { connect, desconnect };

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let mongo;
const local = 'mongodb+srv://admin:admin@cluster0.h2efj.mongodb.net/chapapp';
// const local = 'mongodb://localhost:27017/test1';
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongo = yield mongoose_1.default.connect(process.env.DB || local);
        console.log('Connection succesful');
    }
    catch (error) {
        console.log('Connection filed');
    }
    return mongoose_1.default;
});
const desconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo)
        return yield mongo.disconnect();
});
exports.default = { connect, desconnect };

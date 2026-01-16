"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRabbit = connectRabbit;
exports.getConectionTheChannel = getConectionTheChannel;
const amqplib_1 = __importDefault(require("amqplib"));
const RABBIT_URL = process.env.URL_RABBITMQ;
let channel;
async function connectRabbit() {
    const conn = await amqplib_1.default.connect(RABBIT_URL);
    channel = await conn.createChannel();
    console.log('🐇 RabbitMQ conectado');
}
function getConectionTheChannel() {
    return channel;
}

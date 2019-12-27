"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handler_1 = __importDefault(require("./handlers/handler"));
exports.imgWizHandler = handler_1.default;
var middleware_1 = __importDefault(require("./handlers/middleware"));
exports.imgWizMiddleWare = middleware_1.default;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.log = (message, color = '#00adad') => console.log(chalk_1.default.hex(color).bold(message));
//# sourceMappingURL=stdout.js.map
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
const builders_1 = require("@discordjs/builders");
exports.default = {
    data: new builders_1.SlashCommandBuilder()
        .setName("add")
        .setDescription("Adds two numbers")
        .addIntegerOption((option) => option
        .setName("num1")
        .setDescription("the first number")
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName("num2")
        .setDescription("the second number")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { options } = interaction;
            const num1 = options.getInteger("num1");
            const num2 = options.getInteger("num2");
            yield interaction.reply({ content: `The sum is ${num1 + num2}` });
        });
    },
};

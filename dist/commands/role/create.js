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
        .setName("create-role")
        .setDescription("Create role")
        .addStringOption((option) => option.setName("role").setDescription("Enter role name").setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { options, guild } = interaction;
            const roleName = options.getString("role");
            let message;
            if (guild.roles.cache.find((role) => role.name === roleName))
                message = `${roleName} already exist. Please choose another role name!`;
            else {
                const role = yield guild.roles.create({
                    name: roleName,
                });
                // KIV set permission
                message = `Role ${roleName} created!`;
            }
            yield interaction.reply({ content: message, ephemeral: true });
        });
    },
};

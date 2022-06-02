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
        .setName("check-role")
        .setDescription("Check role")
        .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true))
        .addRoleOption((option) => option.setName("role").setDescription("Select a role").setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { options, guild } = interaction;
            const targetId = options.getUser("target").id;
            const roleId = options.getRole("role").id;
            const target = guild.members.cache.get(targetId);
            const role = guild.roles.cache.get(roleId);
            let message = target.roles.cache.has(roleId)
                ? `User ${target.displayName} has role ${role.name}`
                : `User ${target.displayName} does not have role ${role.name}`;
            yield interaction.reply({ content: message, ephemeral: true });
        });
    },
};

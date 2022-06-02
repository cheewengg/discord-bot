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
const types = ["GUILD_TEXT", "GUILD_VOICE"];
exports.default = {
    data: new builders_1.SlashCommandBuilder()
        .setName("create-channel")
        .setDescription("Create channel")
        .addStringOption((option) => option.setName("name").setDescription("Name of channel").setRequired(true))
        .addStringOption((option) => option
        .setName("type")
        .setDescription("Type of channel")
        .setRequired(true)
        .addChoices(...types.map((type) => {
        return { name: type, value: type };
    }))),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { options, guild } = interaction;
            const name = options.getString("name");
            const type = options.getString("type");
            yield guild.channels.create(name, { type });
            yield interaction.reply({ content: `${type} Channel ${name} created!` });
        });
    },
};

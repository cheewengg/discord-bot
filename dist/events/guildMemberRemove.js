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
const method_1 = require("../util/method");
exports.default = {
    name: "guildMemberRemove",
    execute(guildMember) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, guild } = guildMember;
            const discordUrl = user.username + "#" + user.discriminator;
            const userInfo = (0, method_1.getUser)(discordUrl);
            const guildInfo = (0, method_1.getGuild)(userInfo.guildId);
            // remove public and private guild channel if no members left (excld admin and bot)
            const channels = guild.channels.cache.filter((channel) => channel.name === guildInfo.name.toLowerCase());
            for (const channel of channels) {
                const [name, details] = channel;
                if (details.members.size <= 2)
                    guild.channels.delete(name);
            }
        });
    },
};

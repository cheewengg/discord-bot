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
const discord_js_1 = require("discord.js");
const method_1 = require("../util/method");
exports.default = {
    name: "guildMemberAdd",
    execute(guildMember) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, guild } = guildMember;
            const discordUrl = user.username + "#" + user.discriminator;
            // 1. find member (and his guild) in zolar db (where discordUrl === discord tag)
            const userInfo = (0, method_1.getUser)(discordUrl);
            const guildInfo = (0, method_1.getGuild)(userInfo === null || userInfo === void 0 ? void 0 : userInfo.guildId);
            // 2. remove? member if not found in zolar db
            if (!userInfo || !guildInfo)
                return;
            // 3. create public and private guild channel if cannot find existing channel
            let publicChannel = guild.channels.cache.find((channel) => channel.parentId === process.env.PUBLIC_CHANNEL_ID &&
                channel.name === guildInfo.name.toLowerCase());
            let privateChannel = guild.channels.cache.find((channel) => channel.parentId === process.env.PRIVATE_CHANNEL_ID &&
                channel.name === guildInfo.name.toLowerCase());
            if (!publicChannel)
                publicChannel = yield guild.channels.create(guildInfo.name, {
                    type: 0 /* ChannelTypes.GUILD_TEXT */,
                    parent: process.env.PUBLIC_CHANNEL_ID,
                });
            if (!privateChannel)
                privateChannel = yield guild.channels.create(guildInfo.name, {
                    parent: process.env.PRIVATE_CHANNEL_ID,
                    permissionOverwrites: [
                        {
                            type: "role",
                            id: guild.roles.everyone.id,
                            deny: [discord_js_1.Permissions.FLAGS.VIEW_CHANNEL],
                        },
                    ],
                });
            // 4. assign member to guild channel
            yield privateChannel.permissionOverwrites.create(user, {
                VIEW_CHANNEL: true,
            });
            // 5. assign member to role in server based on guild role (e.g. leader, commander, member)
            const userIsOfficer = userInfo.address === guildInfo.leaderAddress ||
                guildInfo.commanderAddresses.includes(userInfo.address);
            if (userIsOfficer)
                guildMember.roles.add(process.env.ROLE_OFFICER_ID);
            else
                guildMember.roles.add(process.env.ROLE_MEMBER_ID);
        });
    },
};

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
exports.default = {
    name: "guildMemberRemove",
    execute(guildMember) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(guildMember);
            // const { channels } = guildMember;
            // // remove public and private guild channel if no members left
            // const publicChannel = channels.cache.filter(
            //   (channel) => channel.parentId === process.env.PUBLIC_CHANNEL_ID
            // );
            // const privateChannel = channels.cache.filter(
            //   (channel) => channel.parentId === process.env.PRIVATE_CHANNEL_ID
            // );
        });
    },
};

import { GuildMember } from "discord.js";

export default {
  name: "guildMemberRemove",
  async execute(guildMember: GuildMember) {
    console.log(guildMember);
    // const { channels } = guildMember;
    // // remove public and private guild channel if no members left
    // const publicChannel = channels.cache.filter(
    //   (channel) => channel.parentId === process.env.PUBLIC_CHANNEL_ID
    // );

    // const privateChannel = channels.cache.filter(
    //   (channel) => channel.parentId === process.env.PRIVATE_CHANNEL_ID
    // );
  },
};

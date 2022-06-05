import { Collection, GuildMember, GuildChannel } from "discord.js";
import { getUser, getGuild } from "../util/method";

export default {
  name: "guildMemberRemove",
  async execute(guildMember: GuildMember) {
    const { user, guild } = guildMember;
    const discordUrl = user.username + "#" + user.discriminator;

    const userInfo = getUser(discordUrl)!;
    const guildInfo = getGuild(userInfo.guildId)!;

    // remove public and private guild channel if no members left (excld admin and bot)
    const channels = guild.channels.cache.filter(
      (channel) => channel.name === guildInfo.name.toLowerCase()
    ) as Collection<string, GuildChannel>;

    for (const channel of channels) {
      const [name, details] = channel;
      if (details.members.size <= 2) guild.channels.delete(name);
    }
  },
};

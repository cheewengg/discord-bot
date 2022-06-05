import { GuildMember, Permissions, GuildChannel } from "discord.js";
import { ChannelTypes } from "discord.js/typings/enums";
import { getUser, getGuild } from "../util/method";

export default {
  name: "guildMemberAdd",
  async execute(guildMember: GuildMember) {
    const { user, guild } = guildMember;
    const discordUrl = user.username + "#" + user.discriminator;

    // 1. find member (and his guild) in zolar db (where discordUrl === discord tag)
    const userInfo = getUser(discordUrl);
    const guildInfo = getGuild(userInfo?.guildId);

    // 2. remove? member if not found in zolar db
    if (!userInfo || !guildInfo) return;

    // 3. create public and private guild channel if cannot find existing channel
    let publicChannel = guild.channels.cache.find(
      (channel) =>
        channel.parentId === process.env.PUBLIC_CHANNEL_ID &&
        channel.name === guildInfo.name.toLowerCase()
    );

    let privateChannel = guild.channels.cache.find(
      (channel) =>
        channel.parentId === process.env.PRIVATE_CHANNEL_ID &&
        channel.name === guildInfo.name.toLowerCase()
    ) as GuildChannel;

    if (!publicChannel)
      publicChannel = await guild.channels.create(guildInfo.name, {
        type: ChannelTypes.GUILD_TEXT,
        parent: process.env.PUBLIC_CHANNEL_ID,
      });

    if (!privateChannel)
      privateChannel = await guild.channels.create(guildInfo.name, {
        parent: process.env.PRIVATE_CHANNEL_ID,
        permissionOverwrites: [
          {
            type: "role",
            id: guild.roles.everyone.id,
            deny: [Permissions.FLAGS.VIEW_CHANNEL],
          },
        ],
      });

    // 4. assign member to guild channel
    await privateChannel.permissionOverwrites.create(user, {
      VIEW_CHANNEL: true,
    });

    // 5. assign member to role in server based on guild role (e.g. leader, commander, member)
    const userIsOfficer =
      userInfo.address === guildInfo.leaderAddress ||
      guildInfo.commanderAddresses.includes(userInfo.address!);

    if (userIsOfficer) guildMember.roles.add(process.env.ROLE_OFFICER_ID!);
    else guildMember.roles.add(process.env.ROLE_MEMBER_ID!);
  },
};

import { CommandInteraction, Permissions } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("remove-role")
    .setDescription("Remove role")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user").setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("Select a role").setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const { options, guild } = interaction;
    const targetId = options.getUser("target")!.id;
    const roleId = options.getRole("role")!.id;

    const target = guild!.members.cache.get(targetId)!;
    const role = guild!.roles.cache.get(roleId)!;

    const permissions = interaction.member!
      .permissions as Readonly<Permissions>;

    let message;

    if (!target.roles.cache.has(roleId))
      message = `User ${target.displayName} does not have role ${role.name}`;
    else {
      if (permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
        target.roles.remove(role);
        message = `Role ${role.name} removed from User ${target.displayName}`;
      } else
        message = `User ${
          interaction.member!.user.username
        } does not have permission to remove roles`;
    }

    await interaction.reply({ content: message, ephemeral: true });
  },
};

import { CommandInteraction, Permissions } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("assign-role")
    .setDescription("Assign role")
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

    if (target.roles.cache.has(roleId))
      message = `User ${target.displayName} already has role ${role.name}`;
    else {
      if (permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
        target.roles.add(role);
        message = `Role ${role.name} assigned to User ${target.displayName}`;
      } else
        message = `User ${
          interaction.member!.user.username
        } does not have permission to assign roles`;
    }

    await interaction.reply({ content: message, ephemeral: true });
  },
};

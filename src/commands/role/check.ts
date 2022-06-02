import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("check-role")
    .setDescription("Check role")
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

    let message = target.roles.cache.has(roleId)
      ? `User ${target.displayName} has role ${role.name}`
      : `User ${target.displayName} does not have role ${role.name}`;

    await interaction.reply({ content: message, ephemeral: true });
  },
};

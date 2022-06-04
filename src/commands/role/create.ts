import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("create-role")
    .setDescription("Create role")
    .addStringOption((option) =>
      option.setName("role").setDescription("Enter role name").setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const { options, guild } = interaction;
    const roleName = options.getString("role")!;

    let message;

    if (guild!.roles.cache.find((role) => role.name === roleName))
      message = `${roleName} already exist. Please choose another role name!`;
    else {
      const role = await guild!.roles.create({
        name: roleName,
      });
      // KIV set permission
      message = `Role ${roleName} created!`;
    }

    await interaction.reply({ content: message, ephemeral: true });
  },
};

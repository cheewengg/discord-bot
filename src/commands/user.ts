import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply(
      `Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`
    );
  },
};

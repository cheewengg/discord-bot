import DiscordJS, { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds two numbers")
    .addIntegerOption((option) =>
      option
        .setName("num1")
        .setDescription("the first number")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("num2")
        .setDescription("the second number")
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const { options } = interaction;
    const num1 = options.getInteger("num1")!;
    const num2 = options.getInteger("num2")!;
    await interaction.reply({ content: `The sum is ${num1 + num2}` });
  },
};

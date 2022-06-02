import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("delete-channel")
    .setDescription("Delete channel")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Channel").setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const { options, guild } = interaction;
    const channel = options.getChannel("channel")!;

    await guild!.channels.delete(channel.id);

    await interaction.reply({
      content: `${channel.type} Channel ${channel.name} deleted!`,
    });
  },
};

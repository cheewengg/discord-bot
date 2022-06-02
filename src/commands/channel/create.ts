import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const types = ["GUILD_TEXT", "GUILD_VOICE"];

export default {
  data: new SlashCommandBuilder()
    .setName("create-channel")
    .setDescription("Create channel")
    .addStringOption((option) =>
      option.setName("name").setDescription("Name of channel").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type of channel")
        .setRequired(true)
        .addChoices(
          ...types.map((type) => {
            return { name: type, value: type };
          })
        )
    ),
  async execute(interaction: CommandInteraction) {
    const { options, guild } = interaction;
    const name = options.getString("name")!;
    const type = options.getString("type")! as "GUILD_TEXT" | "GUILD_VOICE";

    await guild!.channels.create(name, { type });

    await interaction.reply({ content: `${type} Channel ${name} created!` });
  },
};

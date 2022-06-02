import DiscordJS, { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const actions = ["has", "assign", "remove"];

export default {
  data: new SlashCommandBuilder()
    .setName("action")
    .setDescription("Check/Assign/Remove role")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Select action")
        .setRequired(true)
        .addChoices(
          ...actions.map((action) => {
            return { name: action, value: action };
          })
        )
    )
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user").setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("Select a role").setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const { options, guild } = interaction;
    const action = options.getString("action")!;
    const memberId = options.getUser("target")!;
    const roleId = options.getRole("role")!;

    if (!action || !actions.includes(action))
      return `Unknown action! Please use one of the following: ${actions.join(
        ", "
      )}`;

    const member = guild!.members.cache.get(memberId);
  },
};

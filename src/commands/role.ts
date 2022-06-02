import { CommandInteraction, Permissions } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Console } from "console";

const actions = ["has", "assign", "remove"];

export default {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Check/Assign/Remove role")
    .addStringOption((option) =>
      option
        .setName("action")
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
    const targetId = options.getUser("target")!.id;
    const roleId = options.getRole("role")!.id;

    if (!action || !actions.includes(action))
      return `Unknown action! Please use one of the following: ${actions.join(
        ", "
      )}`;

    const target = guild!.members.cache.get(targetId)!;
    const role = guild!.roles.cache.get(roleId)!;

    const permissions = interaction.member!
      .permissions as Readonly<Permissions>;

    let message: string;

    switch (action) {
      case "has":
        message = target.roles.cache.has(roleId)
          ? `User ${target.displayName} has role ${role.name}`
          : `User ${target.displayName} does not have role ${role.name}`;
        break;
      case "assign":
        if (permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
          target.roles.add(role);
          message = `Role ${role.name} assigned to User ${target.displayName}`;
        } else
          message = `User ${
            interaction.member!.user.username
          } does not have permission to assign roles`;
        break;
      case "remove":
        if (permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
          target.roles.remove(role);
          message = `Role ${role.name} removed from User ${target.displayName}`;
        } else
          message = `User ${
            interaction.member!.user.username
          } does not have permission to remove roles`;
        break;
      default:
        message = "Unknown action";
    }

    await interaction.reply({ content: message, ephemeral: true });
  },
};

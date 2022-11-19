import { CommandInteractionOptionResolver, InteractionType } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";

export default new Event('interactionCreate', (interaction) => {
     // Chat Input Commands
     if (interaction.type == InteractionType.ApplicationCommand) {
          const command = client.commands.get(interaction.commandName);

          if (!command) return interaction.followUp('You have used a nonexistent command');

          command.run({
               args: interaction.options as CommandInteractionOptionResolver,
               client,
               interaction: interaction as ExtendedInteraction
          });
     }
});
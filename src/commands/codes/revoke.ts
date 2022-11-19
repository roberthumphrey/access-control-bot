import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { generateCode } from "../../structures/Util";
import { CodeModel } from "../../database/Schemas/Code";

export default new Command({
     name: 'revoke',
     description: 'Generate new code',
     options: [
          { 
               name: 'user', 
               type: ApplicationCommandOptionType.User,
               description: "Revoke hidden access from a user",
               required: true
          }
     ],
     run: async ({ interaction }) => {
          const user = interaction.options.get('user').value;

          if (interaction.member.id !== '112329563849117696') return interaction.reply({ content: 'You lack permission to use this command', ephemeral: true });

          console.log(user);
     }
})
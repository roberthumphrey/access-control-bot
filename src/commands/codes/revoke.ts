import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { generateCode } from "../../structures/Util";
import { CodeModel } from "../../database/Schemas/Code";
import { DailyModel } from "../../database/Schemas/Daily";
import { WeeklyModel } from "../../database/Schemas/Weekly";
import { PermaModel } from "../../database/Schemas/Perma";

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

          if (interaction.member.id !== '986718251713187890') return interaction.reply({ content: 'You lack permission to use this command', ephemeral: true });

          if (user) {
               let daily = await DailyModel.findOne({ discordId: user });
               let weekly = await WeeklyModel.findOne({ discordId: user });
               let perma = await PermaModel.findOne({ discordId: user });

               if (daily) {
                    // scrub database of code
                    DailyModel.deleteOne({ discordId: daily.discordId }).exec();

                    return interaction.reply({ content: 'User permissions revoked', ephemeral: true });
               } else if (weekly) {
                    WeeklyModel.deleteOne({ discordId: weekly.discordId }).exec();

                    return interaction.reply({ content: 'User permissions revoked', ephemeral: true });
               } else if (perma) {
                    PermaModel.deleteOne({ discordId: perma.discordId }).exec();

                    return interaction.reply({ content: 'User permissions revoked', ephemeral: true });
               } else {
                    return interaction.reply({ content: 'User did not have any active permissions', ephemeral: true });
               }
          }
     }
})
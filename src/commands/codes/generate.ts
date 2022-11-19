import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { generateCode } from "../../structures/Util";

export default new Command({
     name: 'generate',
     description: 'Generate new code',
     options: [
          { 
               name: 'code_type', 
               type: ApplicationCommandOptionType.String,
               choices: [
                    { name: 'daily', value: 'daily' },
                    { name: 'weekly', value: 'weekly' },
                    { name: 'perma', value: 'perma' },
               ],
               description: "Type of the generated code",
               required: true
          }
     ],
     run: async ({ interaction }) => {
          const codeType = interaction.options.get('code_type').value;

          if (codeType === 'daily') {
               const code = generateCode(codeType, interaction.member.id);
               const codeEmbed = new EmbedBuilder()
                    .setColor(0x88FF7B)
                    .setTitle('Generated Code')
                    .addFields(
                         { name: 'Type', value: 'Daily' },
                         { name: 'Code', value: code }
                    )

               interaction.reply({ embeds: [ codeEmbed ], ephemeral: true })
          } else if (codeType === 'weekly') {
               const code = generateCode(codeType, interaction.member.id);
               const codeEmbed = new EmbedBuilder()
                    .setColor(0x88FF7B)
                    .setTitle('Generated Code')
                    .addFields(
                         { name: 'Type', value: 'Weekly' },
                         { name: 'Code', value: code }
                    )

               interaction.reply({ embeds: [ codeEmbed ], ephemeral: true })
          } else {
               const code = generateCode(codeType as string, interaction.member.id);
               const codeEmbed = new EmbedBuilder()
                    .setColor(0x88FF7B)
                    .setTitle('Generated Code')
                    .addFields(
                         { name: 'Type', value: 'Permanent' },
                         { name: 'Code', value: code }
                    )

               interaction.reply({ embeds: [ codeEmbed ], ephemeral: true })
          }
     }
})
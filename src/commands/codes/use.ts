import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { Command } from "../../structures/Command";
import { validate as validateUUID, parse as parseUUID, stringify as stringifyUUID } from 'uuid';
import { CodeModel } from "../../database/Schemas/Code";
import { DailyModel } from "../../database/Schemas/Daily";
import { WeeklyModel } from "../../database/Schemas/Weekly";
import { PermaModel } from "../../database/Schemas/Perma";
import { CacheModel } from "../../database/Schemas/Cache";

export default new Command({
     name: 'use',
     description: 'Use a code to get access to locked category',
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
          },
          {
               name: 'code',
               type: ApplicationCommandOptionType.String,
               description: "The code you wish to use",
               required: true
          }
     ],
     run: async ({ interaction }) => {
          const codeType = interaction.options.get('code_type').value as string;
          const code = interaction.options.get('code').value as string;
          let role = interaction.guild.roles.cache.find(role => role.name === "Hidden Access");

          if (validateUUID(code) && !interaction.member.roles.cache.some(role => role.name === 'Hidden Access')) {
               let foundCode = await CodeModel.findOne({ code });

               if (foundCode) {
                    if (codeType === 'daily' && foundCode.type === "daily") {
                         CodeModel.deleteOne({ code }).exec();

                         let usedCode = new DailyModel({ discordId: interaction.member.id, code });
                         usedCode.save();

                         let cachedCode = new CacheModel({ codeId: usedCode._id, discordId: interaction.member.id, code });
                         cachedCode.save();

                         interaction.guild.members.cache.get(interaction.member.id).roles.add(role);
          
                         const codeEmbed = new EmbedBuilder()
                              .setColor(0x915ead)
                              .setTitle('Used Code')
                              .addFields(
                                   { name: 'Type', value: 'Daily' }
                              )
          
                         interaction.reply({ embeds: [ codeEmbed ], ephemeral: true })
                    } else if (codeType === 'weekly' && foundCode.type === "weekly") {
                         let usedCode = new WeeklyModel({ discordId: interaction.member.id, code });
                         usedCode.save();

                         let cachedCode = new CacheModel({ codeId: usedCode._id, discordId: interaction.member.id, code });
                         cachedCode.save();

                         interaction.guild.members.cache.get(interaction.member.id).roles.add(role);
          
                         const codeEmbed = new EmbedBuilder()
                              .setColor(0x915ead)
                              .setTitle('Used Code')
                              .addFields(
                                   { name: 'Type', value: 'Weekly' }
                              )
          
                         interaction.reply({ embeds: [ codeEmbed ], ephemeral: true })
                    } else if (codeType === "perma" && foundCode.type === "perma") {
                         let usedCode = new PermaModel({ discordId: interaction.member.id, code });
                         usedCode.save();

                         let cachedCode = new CacheModel({ codeId: usedCode._id, discordId: interaction.member.id, code });
                         cachedCode.save();

                         interaction.guild.members.cache.get(interaction.member.id).roles.add(role);

                         const codeEmbed = new EmbedBuilder()
                              .setColor(0x915ead)
                              .setTitle('Used Code')
                              .addFields(
                                   { name: 'Type', value: 'Permanent' }
                              )
          
                         interaction.reply({ embeds: [ codeEmbed ], ephemeral: true })
                    } else {
                         return interaction.reply({ content: 'Code is of invalid type to selection', ephemeral: true });
                    }
               } else {
                    return interaction.reply({ content: 'Invalid code provided', ephemeral: true });
               }
          } else {
               interaction.reply({ content: 'Invalid code provided', ephemeral: true });
          }
     }
})
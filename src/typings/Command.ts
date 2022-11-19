import { ACClient } from "../structures/Client";
import { CommandInteraction, CommandInteractionOptionResolver, ChatInputApplicationCommandData, PermissionResolvable, GuildMember } from 'discord.js';

export interface ExtendedInteraction extends CommandInteraction {
     member: GuildMember;
}

interface RunOptions {
     client: ACClient,
     interaction: ExtendedInteraction,
     args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
     userPermissions?: PermissionResolvable[];
     run: RunFunction;
} & ChatInputApplicationCommandData
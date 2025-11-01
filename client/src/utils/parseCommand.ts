import type { CommandMethodObject } from "../types/Command";
import { commands } from "./commands";

export function parseCommand(input: string, context: CommandMethodObject) {
  const trimmed = input.trim();
  if (!trimmed) return;

  const [cmd, ...args] = trimmed.split(" ");
  const command = commands[cmd];

  if (!command) {
    context.print(
      `Error: Unknown command '${cmd}'. Type 'help' to see all commands.`
    );
    return;
  }

  try {
    command.action(context, args);
  } catch (e) {
    const err = e as Error;
    context.print(`Error while executing '${cmd}': ${err.message}`);
  }
}

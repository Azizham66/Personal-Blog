export type CommandMethod = (...args: string[]) => void | Promise<void>
export type CommandMethodObject = Record<string, CommandMethod>;
export type Command = {
    command: string;
    description: string;
    usage: string;
    action: (method: CommandMethodObject, args?: string[] | null) => void | Promise<void>;
}
import type { Command, CommandMethodObject } from "../types/Command";
import { getFormattedDate } from "./date";

export const commands: Record<string, Command> = {
  help: {
    command: "help",
    description: "Lists all available commands",
    usage: "Usage: help",
    action: ({ print }: CommandMethodObject) => {
      print("Available commands: ");
      for (const [cmd, { description, usage }] of Object.entries(commands)) {
        print(`- ${cmd}: ${description}`);
        print(`>> ${usage}`);
      }
    },
  },
  nav: {
    command: "nav",
    description: "Navigates to a given route",
    usage: "Usage: nav [route]",
    action: ({ nav, print }, args) => {
      const routes: string[] = ["/", "/about", "/posts", "/post/:id"];

      function matchRoute(route: string): boolean {
        return routes.some((r) => {
          if (r.includes(":")) {
            const regex = new RegExp("^" + r.replace(/:\w+/g, "\\w+") + "$");
            return regex.test(route);
          }
          return r === route;
        });
      }
      if (!args || args.length === 0) {
        print(commands.nav.usage);
        return;
      }
      const route: string = args[0];
      if (!matchRoute(route)) {
        print(`Route: ${route} not found`);
        return;
      }
      print(`Navigating to ${route}...`);
      nav(route);
    },
  },
  echo: {
    command: "echo",
    description: "Prints a message",
    usage: "Usage: echo [message]",
    action: ({ print }, args) => {
      if (!args || args.length === 0) {
        print(commands.echo.usage);
        return;
      }
      print(args.join(" "));
    },
  },
  clear: {
    command: "clear",
    description: "Clears the terminal",
    usage: "Usage: clear",
    action: ({ clear }) => {
      clear();
    },
  },
  status: {
    command: "status",
    description: "Show system status",
    usage: "status",
    action: ({ print }) => {
      print(`> SYSTEM DIAGNOSTICS RUNNING...`);
      print(`[${getFormattedDate(true)}]`);
      print(`[OK] Core temperature stable`);
      print(`[WARN] Caffeine reserves critically low`);
      print(`[FAIL] Sleep module unresponsive`);
      print(`[OK] Type safety integrity: 87%`);
      print(`SYSTEM STATUS: OPERATIONAL`);
    },
  },
  date: {
    command: "date",
    description: "Get current date",
    usage: 'Usage: date [includeTime: "true or false" -optional]',
    action: ({ print }, args) => {
      if (!args || args.length === 0) {
        print(getFormattedDate(false));
        return;
      }
      if (args[0] === "true") print(getFormattedDate(true));
      else if (args[0] === "false") print(getFormattedDate(false));
      else print(commands.date.usage);
    },
  },
};

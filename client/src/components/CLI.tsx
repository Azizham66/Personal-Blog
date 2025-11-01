import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseCommand } from "../utils/parseCommand";
import type { CommandMethodObject } from "../types/Command";
import type { FormEvent } from "react";

export default function CLI() {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const print = (text: string) => setOutput((prev) => [...prev, text]);
  const clear = () => setOutput([]);
  const nav = (route: string) => navigate(route);
  const context: CommandMethodObject = { print, clear, nav };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    print(`$ ${input}`);
    parseCommand(input, context);
    setInput("");
  };

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [output]);

  return (
    <label htmlFor="command-input">
      <div
        className="
        bg-black 
        text-green-400 
        p-4 
        font-mono 
        mb-6
        h-96 
        overflow-y-auto 
        rounded-xl 
        [scrollbar-width:none] 
        [-ms-overflow-style:none] 
        [&::-webkit-scrollbar]:hidden 
        selection:bg-green-500/20
    "
        ref={terminalRef}
      >
        <p className="text-[rgb(107_114_128)]">
          Aziz-Shell v1.0 [Type 'help' or 'status']
        </p>
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <form onSubmit={onSubmit}>
          <span>$ </span>
          <input
            className="bg-transparent border-none outline-none text-green-400 w-3/4"
            id="command-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </label>
  );
}

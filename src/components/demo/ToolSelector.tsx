"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { Tool } from "@/types/tools";

interface ToolSelectorProps {
  selectedTool: Tool;
  tools: Tool[];
  onToolSelect: (tool: Tool) => void;
  onShowInstructions: () => void;
}

export function ToolSelector({
  selectedTool,
  tools,
  onToolSelect,
  onShowInstructions,
}: ToolSelectorProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <select
          value={selectedTool.id}
          onChange={(e) => {
            const tool = tools.find((t) => t.id === e.target.value);
            if (tool) onToolSelect(tool);
          }}
          className="h-10 w-64 appearance-none rounded-lg border border-gray-300 bg-white pl-4 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {tools.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>
      <button
        onClick={onShowInstructions}
        className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <HelpCircle className="mr-2 h-4 w-4" />
        Quick Start Guide
      </button>
    </div>
  );
}

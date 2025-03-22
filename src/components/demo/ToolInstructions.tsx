"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Tool } from "@/types/tools";

interface ToolInstructionsProps {
  tool: Tool;
  onClose: () => void;
}

export function ToolInstructions({ tool, onClose }: ToolInstructionsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl rounded-lg bg-white p-6"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-bold text-gray-900">
          Quick Start Guide: {tool.name}
        </h3>
        <div className="mt-4">
          <ol className="list-decimal space-y-2 pl-4">
            {tool.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-600">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
}

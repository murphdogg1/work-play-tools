"use client";

import { useState } from "react";
import { Code } from "lucide-react";
import EmbedModal from "@/components/EmbedModal";

export default function EmbedButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500"
        >
          <Code className="h-4 w-4" />
          Embed this tool
        </button>
      </div>

      <EmbedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        calculatorSlug="hourly-to-salary"
        calculatorName="Hourly to Salary Converter"
      />
    </>
  );
}

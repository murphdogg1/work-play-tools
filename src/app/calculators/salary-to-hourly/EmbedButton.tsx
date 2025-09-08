"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function EmbedButton() {
  const [copied, setCopied] = useState(false);
  const embedCode = `<iframe src="https://www.workpaytools.com/embed/calculators/salary-to-hourly" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Embed this calculator
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add this calculator to your website or blog
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy Code
          </>
        )}
      </button>
    </div>
  );
}

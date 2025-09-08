"use client";

import { useState } from "react";
import { Copy, Check, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorSlug: string;
  calculatorName: string;
}

export default function EmbedModal({ 
  isOpen, 
  onClose, 
  calculatorSlug, 
  calculatorName 
}: EmbedModalProps) {
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("600");

  const embedUrl = `https://www.workpaytools.com/embed/calculators/${calculatorSlug}`;
  const embedCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" style="border:0" title="${calculatorName}"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy embed code:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Embed {calculatorName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Preview */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Preview
            </h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <iframe
                src={embedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                title={`${calculatorName} Preview`}
                className="rounded"
              />
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Embed Code
              </h3>
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  copied
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800"
                )}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Size Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Width
                  </label>
                  <input
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="100%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Height
                  </label>
                  <input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="600"
                  />
                </div>
              </div>

              {/* Code Display */}
              <div className="relative">
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                  <code>{embedCode}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
              Usage Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• <strong>Free to use:</strong> Embed our calculators on your website at no cost</li>
              <li>• <strong>Attribution required:</strong> Please include a backlink to WorkPayTools</li>
              <li>• <strong>No modifications:</strong> Use the embed code as provided</li>
              <li>• <strong>Commercial use:</strong> Allowed for business websites and applications</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex gap-3">
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View Embed Page
            </a>
            <a
              href="https://www.workpaytools.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit WorkPayTools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, ExternalLink } from "lucide-react";

export default function EmbedButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe 
  src="https://workpaytools.com/embed/calculators/paystub-generator" 
  width="100%" 
  height="800" 
  frameborder="0"
  title="Paystub Generator">
</iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy embed code:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <ExternalLink className="w-4 h-4 mr-2" />
          Embed This Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Embed Paystub Generator</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Copy and paste this code into your website to embed the paystub generator:
          </p>
          <div className="space-y-2">
            <Label htmlFor="embed-code">Embed Code</Label>
            <div className="relative">
              <Input
                id="embed-code"
                value={embedCode}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleCopy}
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Preview:</h4>
            <div className="border rounded p-4 bg-white">
              <iframe
                src="/embed/calculators/paystub-generator"
                width="100%"
                height="400"
                frameBorder="0"
                title="Paystub Generator Preview"
                className="rounded"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`btn btn-xs ${copied ? 'btn-success' : 'btn-ghost'} font-black uppercase tracking-widest italic transition-all`}
    >
      {copied ? 'Copied' : 'Copy Script'}
    </button>
  );
}

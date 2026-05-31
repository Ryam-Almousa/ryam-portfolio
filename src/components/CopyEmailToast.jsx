import { useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import clsx from "clsx";

export default function CopyEmailToast({ email }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyWithFallback(text) {
   
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy"); 
    document.body.removeChild(ta);
  }

  async function handleCopy() {
    try {
      await copyWithFallback(email);
      setCopied(true);
      setOpen(true);
     
      setTimeout(() => setOpen(false), 1500);
    } catch {
      setCopied(false);
      setOpen(true);
      setTimeout(() => setOpen(false), 1500);
    }
  }

  return (
    <Toast.Provider swipeDirection="right">
      <button
        onClick={handleCopy}
        className="px-6 py-2 rounded-full border border-border hover:bg-card"
      >
        Copy Email
      </button>

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={clsx(
          "fixed bottom-6 right-6 z-[60] w-[320px] rounded-lg",
          "bg-card border border-border text-left p-4 shadow-lg",
          "data-[state=open]:animate-fade-in"
        )}
      >
        <Toast.Title className="font-semibold">
          {copied ? "Copied!" : "Oops"}
        </Toast.Title>
        <Toast.Description className="mt-1 text-sm text-slate-600">
          {copied ? `Email copied: ${email}` : "Could not copy to clipboard."}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 p-4" />
    </Toast.Provider>
  );
}


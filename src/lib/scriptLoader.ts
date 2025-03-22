"use client";

interface ScriptLoadOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
}

export function loadScript(src: string, options: ScriptLoadOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`[ScriptLoader] Loading script: ${src}`);
    
    if (typeof window === "undefined") {
      console.log("[ScriptLoader] Window undefined, resolving early");
      return resolve();
    }

    const existingScript = document.getElementById(options.id || src);
    if (existingScript) {
      console.log(`[ScriptLoader] Script already exists: ${src}`);
      return resolve();
    }

    const script = document.createElement("script");
    script.src = src;
    if (options.id) script.id = options.id;
    if (options.async) script.async = true;
    if (options.defer) script.defer = true;

    script.onload = () => {
      console.log(`[ScriptLoader] Script loaded successfully: ${src}`);
      resolve();
    };
    script.onerror = (error) => {
      console.error(`[ScriptLoader] Failed to load script: ${src}`, error);
      reject(new Error(`Failed to load script: ${src}`));
    };

    console.log(`[ScriptLoader] Appending script to document: ${src}`);
    document.body.appendChild(script);
  });
}

export function loadStyle(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`[StyleLoader] Loading stylesheet: ${href}`);
    
    if (typeof window === "undefined") {
      console.log("[StyleLoader] Window undefined, resolving early");
      return resolve();
    }

    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) {
      console.log(`[StyleLoader] Stylesheet already exists: ${href}`);
      return resolve();
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    link.onload = () => {
      console.log(`[StyleLoader] Stylesheet loaded successfully: ${href}`);
      resolve();
    };
    link.onerror = (error) => {
      console.error(`[StyleLoader] Failed to load stylesheet: ${href}`, error);
      reject(new Error(`Failed to load style: ${href}`));
    };

    console.log(`[StyleLoader] Appending stylesheet to document: ${href}`);
    document.head.appendChild(link);
  });
}

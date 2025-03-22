"use client";

import type { LabelStudioInstance, LabelStudioOptions } from "@/types/label-studio";
import { loadScript, loadStyle } from "./scriptLoader";

const LABEL_STUDIO_VERSION = "1.8.0";
const CDN_URL = "https://unpkg.com/@heartexlabs/label-studio@";

let labelStudioPromise: Promise<any> | null = null;

export async function loadLabelStudio(): Promise<{
  default: {
    new (root: string, options: LabelStudioOptions): LabelStudioInstance;
  };
}> {
  console.log("[LabelStudio] Initializing Label Studio loader...");

  if (typeof window === "undefined") {
    const error = new Error("Label Studio can only be loaded in browser environment");
    console.error("[LabelStudio] Initialization failed:", error);
    throw error;
  }

  if (!labelStudioPromise) {
    console.log("[LabelStudio] Loading Label Studio resources...");
    labelStudioPromise = Promise.all([
      loadStyle(`${CDN_URL}${LABEL_STUDIO_VERSION}/build/static/css/main.css`).catch(error => {
        console.error("[LabelStudio] Failed to load CSS:", error);
        throw error;
      }),
      loadScript(`${CDN_URL}${LABEL_STUDIO_VERSION}/build/static/js/main.js`, {
        id: "label-studio-script",
      }).catch(error => {
        console.error("[LabelStudio] Failed to load JS:", error);
        throw error;
      }),
    ]).then(() => {
      console.log("[LabelStudio] Resources loaded successfully");
      if (typeof window.LabelStudio === "undefined") {
        const error = new Error("Failed to load Label Studio - window.LabelStudio is undefined");
        console.error("[LabelStudio] Initialization failed:", error);
        throw error;
      }
      console.log("[LabelStudio] Label Studio initialized successfully");
      return { default: window.LabelStudio };
    }).catch(error => {
      console.error("[LabelStudio] Failed to initialize Label Studio:", error);
      throw error;
    });
  }

  return labelStudioPromise;
}

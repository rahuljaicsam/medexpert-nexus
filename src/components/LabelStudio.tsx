"use client";

import { useRef, useEffect } from "react";
import type { LabelStudioOptions, LabelStudioInstance } from "@/types/label-studio";
import { loadLabelStudio } from "@/lib/labelStudio";
import { cn } from "@/lib/utils";

interface LabelStudioProps extends LabelStudioOptions {
  className?: string;
  onLoad?: (instance: LabelStudioInstance) => void;
  onSubmit?: (instance: LabelStudioInstance, annotation: any) => void;
  onUpdate?: (instance: LabelStudioInstance, annotation: any) => void;
}

export function LabelStudio({
  className,
  onLoad,
  onSubmit,
  onUpdate,
  ...props
}: LabelStudioProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<LabelStudioInstance | null>(null);

  useEffect(() => {
    let isMounted = true;
    console.log("[useLabelStudio] Initializing hook...");

    async function initLabelStudio() {
      try {
        console.log("[useLabelStudio] Loading Label Studio module...");
        const LabelStudioModule = await loadLabelStudio();

        if (!isMounted) {
          console.log("[useLabelStudio] Component unmounted, aborting initialization");
          return;
        }

        if (!containerRef.current) {
          console.error("[useLabelStudio] Container ref is null");
          return;
        }

        console.log("[useLabelStudio] Creating Label Studio instance...");
        instanceRef.current = new LabelStudioModule.default(
          containerRef.current.id,
          props
        );

        instanceRef.current.on("labelStudioLoad", (ls: LabelStudioInstance) => {
          if (!isMounted) {
            console.log("[useLabelStudio] Component unmounted during load, skipping annotation");
            return;
          }
          console.log("[useLabelStudio] Label Studio loaded, creating initial annotation");
          const annotation = ls.annotationStore.addAnnotation({
            userGenerate: true,
          });
          ls.annotationStore.selectAnnotation(annotation.id);
          console.log("[useLabelStudio] Initial annotation created:", annotation.id);
          onLoad?.(ls);
        });

        instanceRef.current.on(
          "submitAnnotation",
          (ls: LabelStudioInstance, annotation: any) => {
            if (!isMounted) {
              console.log("[useLabelStudio] Component unmounted during submit, skipping callback");
              return;
            }
            console.log("[useLabelStudio] Annotation submitted:", annotation);
            onSubmit?.(ls, annotation);
          }
        );

        instanceRef.current.on(
          "updateAnnotation",
          (ls: LabelStudioInstance, annotation: any) => {
            if (!isMounted) {
              console.log("[useLabelStudio] Component unmounted during update, skipping callback");
              return;
            }
            console.log("[useLabelStudio] Annotation updated:", annotation);
            onUpdate?.(ls, annotation);
          }
        );

        console.log("[useLabelStudio] Label Studio initialization complete");
      } catch (error) {
        console.error("[useLabelStudio] Failed to initialize Label Studio:", error);
        if (error instanceof Error) {
          console.error("[useLabelStudio] Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
          });
        }
      }
    }

    void initLabelStudio();

    return () => {
      isMounted = false;
      if (instanceRef.current) {
        instanceRef.current = null;
      }
    };
  }, [props, onLoad, onSubmit, onUpdate]);

  return (
    <div
      id="label-studio"
      ref={containerRef}
      className={cn(
        "min-h-[600px] w-full rounded-lg border border-gray-200 bg-white shadow-lg",
        className
      )}
    />
  );
}

"use client";

import { useEffect, useRef } from "react";
import type { LabelStudioInstance, LabelStudioOptions } from "@/types/label-studio";
import { loadLabelStudio } from "@/lib/labelStudio";

export function useLabelStudio(containerId: string, options: LabelStudioOptions) {
  const instanceRef = useRef<LabelStudioInstance | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initLabelStudio() {
      try {
        const LabelStudioModule = await loadLabelStudio();

        if (!isMounted) return;

        if (!instanceRef.current && LabelStudioModule?.default) {
          const LabelStudio = LabelStudioModule.default;
          instanceRef.current = new LabelStudio(containerId, options);

          instanceRef.current.on("labelStudioLoad", (LS: LabelStudioInstance) => {
            if (!isMounted) return;
            const annotation = LS.annotationStore.addAnnotation({
              userGenerate: true,
            });
            LS.annotationStore.selectAnnotation(annotation.id);
          });

          instanceRef.current.on(
            "submitAnnotation",
            (_LS: LabelStudioInstance, annotation: any) => {
              if (!isMounted) return;
              console.log(annotation.serializeAnnotation());
            }
          );
        }
      } catch (error) {
        console.error("Failed to initialize Label Studio:", error);
      }
    }

    void initLabelStudio();

    return () => {
      isMounted = false;
      instanceRef.current = null;
    };
  }, [containerId, options]);

  return instanceRef;
}

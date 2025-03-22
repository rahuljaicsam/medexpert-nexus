"use client";

import { useState } from "react";
import type { DatasetMetadata } from "@/types/dataset-metadata";
import { getFilteredDatasets } from "@/lib/utils";

export function useDatasets(initialDatasets: DatasetMetadata[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const filteredDatasets = getFilteredDatasets(
    initialDatasets,
    selectedFilters,
    searchTerm
  );

  const clearFilters = () => setSelectedFilters(new Set());

  return {
    searchTerm,
    setSearchTerm,
    selectedFilters,
    setSelectedFilters,
    filteredDatasets,
    clearFilters,
  };
}

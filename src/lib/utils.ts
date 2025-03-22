import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DatasetMetadata } from "@/types/dataset-metadata"
import { validateDatasetMetadata, categorizeDatasetSize, formatBytes } from "@/types/dataset-metadata"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function standardizeDataset(rawData: any): [DatasetMetadata | null, string[]] {
  try {
    // Convert raw size to standardized format
    const sizeInBytes = typeof rawData.size === 'string' 
      ? parseInt(rawData.size.replace(/[^0-9]/g, '')) * 1024 * 1024 * 1024 // Convert "X GB" to bytes
      : 0;

    const standardizedData: DatasetMetadata = {
      id: rawData.id,
      title: rawData.title,
      description: rawData.description,
      type: rawData.type,
      size: {
        bytes: sizeInBytes,
        formatted: formatBytes(sizeInBytes),
        category: categorizeDatasetSize(sizeInBytes)
      },
      price: rawData.price,
      format: Array.isArray(rawData.format) ? rawData.format : [],
      preview: rawData.preview,
      compliance: Array.isArray(rawData.compliance) ? rawData.compliance : [],
      downloads: rawData.downloads || 0,
      rating: rawData.rating || 0,
      sampleSize: rawData.sampleSize || 0,
      labeledSamples: rawData.labeledSamples || 0,
      validationSplit: rawData.validationSplit || "70/15/15",
      lastUpdated: rawData.lastUpdated || new Date().toISOString().split('T')[0],
      specialty: Array.isArray(rawData.specialty) ? rawData.specialty : [],
      anatomicalRegion: Array.isArray(rawData.anatomicalRegion) ? rawData.anatomicalRegion : [],
      modality: Array.isArray(rawData.modality) ? rawData.modality : [],
      annotationType: Array.isArray(rawData.annotationType) ? rawData.annotationType : [],
      quality: {
        iaaScore: rawData.quality?.iaaScore,
        expertReviewed: Boolean(rawData.quality?.expertReviewed),
        multiCenter: Boolean(rawData.quality?.multiCenter),
        standardizedProtocol: Boolean(rawData.quality?.standardizedProtocol),
        balancedClasses: Boolean(rawData.quality?.balancedClasses),
        diversePopulation: Boolean(rawData.quality?.diversePopulation)
      },
      documentation: {
        overview: rawData.documentation?.overview || "",
        dataFormat: rawData.documentation?.dataFormat || "",
        quality: rawData.documentation?.quality || ""
      },
      integration: {
        pytorch: rawData.integration?.pytorch,
        tensorflow: rawData.integration?.tensorflow
      },
      stats: Array.isArray(rawData.stats) ? rawData.stats : [],
      sampleImages: Array.isArray(rawData.sampleImages) ? rawData.sampleImages : []
    };

    const validationErrors = validateDatasetMetadata(standardizedData);
    
    if (validationErrors.length > 0) {
      return [null, validationErrors];
    }

    return [standardizedData, []];
  } catch (error) {
    return [null, [(error as Error).message]];
  }
}

export function getFilteredDatasets(
  datasets: DatasetMetadata[],
  filters: Set<string>,
  searchTerm: string
): DatasetMetadata[] {
  return datasets.filter(dataset => {
    // Search matching
    const matchesSearch = searchTerm === "" || 
      dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter matching
    const hasMatchingFilters = filters.size === 0 || Array.from(filters).every(filter => {
      // Match file format
      if (dataset.format.some(f => f.toLowerCase() === filter)) {
        return true;
      }
      
      // Match type
      if (dataset.type.toLowerCase() === filter) {
        return true;
      }

      // Match size category
      if (dataset.size.category === filter) {
        return true;
      }

      // Match specialty
      if (dataset.specialty.some(s => s.toLowerCase() === filter)) {
        return true;
      }

      // Match anatomical region
      if (dataset.anatomicalRegion.some(r => r.toLowerCase() === filter)) {
        return true;
      }

      // Match modality
      if (dataset.modality.some(m => m.toLowerCase() === filter)) {
        return true;
      }

      // Match annotation type
      if (dataset.annotationType.some(a => a.toLowerCase() === filter)) {
        return true;
      }

      // Match quality metrics
      if (filter === "high-iaa" && dataset.quality.iaaScore && dataset.quality.iaaScore >= 0.8) {
        return true;
      }
      if (filter === "expert-reviewed" && dataset.quality.expertReviewed) {
        return true;
      }
      if (filter === "multi-center" && dataset.quality.multiCenter) {
        return true;
      }

      // Match compliance
      if (dataset.compliance.some(c => c.toLowerCase() === filter)) {
        return true;
      }

      return false;
    });

    return matchesSearch && hasMatchingFilters;
  });
}

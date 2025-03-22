import type { DatasetMetadata } from "@/types/dataset-metadata";

const defaultDataset: Omit<DatasetMetadata, 'id' | 'title' | 'description' | 'type' | 'size' | 'price' | 'format' | 'preview' | 'compliance' | 'downloads' | 'rating'> = {
  sampleSize: 10000,
  labeledSamples: 10000,
  validationSplit: "70/15/15",
  lastUpdated: "2024-03-15",
  specialty: ["Radiology"],
  anatomicalRegion: ["Chest"],
  modality: ["X-ray"],
  annotationType: ["Classification", "Bounding Box"],
  quality: {
    iaaScore: 0.9,
    expertReviewed: true,
    multiCenter: true,
    standardizedProtocol: true,
    balancedClasses: true,
    diversePopulation: true
  },
  documentation: {
    overview: "",
    dataFormat: "",
    quality: ""
  },
  integration: {},
  stats: [],
  sampleImages: []
};

export const datasets: DatasetMetadata[] = [
  {
    ...defaultDataset,
    id: "chest-xray-pneumonia",
    title: "Chest X-Ray Pneumonia Detection Dataset",
    description: "Large dataset of chest X-ray images labeled for pneumonia detection, with expert annotations and validation.",
    type: "Medical Imaging",
    size: {
      bytes: 15 * 1024 * 1024 * 1024,
      formatted: "15 GB",
      category: "medium"
    },
    price: 499,
    format: ["DICOM", "PNG", "JSON"],
    preview: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    compliance: ["HIPAA", "GDPR"],
    downloads: 234,
    rating: 4.8
  },
  {
    ...defaultDataset,
    id: "brain-tumor-mri",
    title: "Brain Tumor MRI Segmentation Dataset",
    description: "Comprehensive MRI dataset with pixel-level tumor segmentation masks and radiologist annotations.",
    type: "Medical Imaging",
    size: {
      bytes: 25 * 1024 * 1024 * 1024,
      formatted: "25 GB",
      category: "large"
    },
    price: 799,
    format: ["NIFTI", "JSON"],
    preview: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063",
    compliance: ["HIPAA", "GDPR"],
    downloads: 156,
    rating: 4.9,
    specialty: ["Neurology"],
    anatomicalRegion: ["Brain"],
    modality: ["MRI"]
  },
  {
    ...defaultDataset,
    id: "clinical-notes",
    title: "Clinical Notes NLP Dataset",
    description: "Comprehensive collection of de-identified clinical notes with expert annotations for symptoms, diagnoses, and treatments.",
    type: "Clinical Text",
    size: {
      bytes: 8 * 1024 * 1024 * 1024,
      formatted: "8 GB",
      category: "small"
    },
    price: 599,
    format: ["JSON", "CSV", "TXT"],
    preview: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
    compliance: ["HIPAA", "GDPR"],
    downloads: 178,
    rating: 4.7,
    specialty: ["General Practice"],
    annotationType: ["Text Annotation"]
  },
  {
    ...defaultDataset,
    id: "pathology-slides",
    title: "Digital Pathology Slides Dataset",
    description: "High-resolution whole-slide images with expert pathologist annotations for cancer detection and classification.",
    type: "Medical Imaging",
    size: {
      bytes: 50 * 1024 * 1024 * 1024,
      formatted: "50 GB",
      category: "large"
    },
    price: 999,
    format: ["SVS", "TIFF", "JSON"],
    preview: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
    compliance: ["HIPAA", "GDPR"],
    downloads: 89,
    rating: 4.9,
    specialty: ["Pathology"],
    modality: ["Microscopy"]
  },
  {
    ...defaultDataset,
    id: "ecg-analysis",
    title: "ECG Analysis Dataset",
    description: "Comprehensive collection of ECG recordings with cardiologist annotations for various cardiac conditions.",
    type: "Signal Data",
    size: {
      bytes: 12 * 1024 * 1024 * 1024,
      formatted: "12 GB",
      category: "medium"
    },
    price: 699,
    format: ["DICOM", "CSV", "JSON"],
    preview: "https://images.unsplash.com/photo-1543333995-a78aea2eee50",
    compliance: ["HIPAA", "GDPR"],
    downloads: 145,
    rating: 4.8,
    specialty: ["Cardiology"],
    anatomicalRegion: ["Cardiovascular"],
    modality: ["ECG"]
  },
  {
    ...defaultDataset,
    id: "dermatology-images",
    title: "Dermatology Image Collection",
    description: "High-quality dermatological images with expert annotations for skin condition diagnosis and analysis.",
    type: "Medical Imaging",
    size: {
      bytes: 30 * 1024 * 1024 * 1024,
      formatted: "30 GB",
      category: "large"
    },
    price: 899,
    format: ["DICOM", "JPG", "JSON"],
    preview: "https://images.unsplash.com/photo-1576671081837-49000212a370",
    compliance: ["HIPAA", "GDPR"],
    downloads: 112,
    rating: 4.7,
    specialty: ["Dermatology"],
    anatomicalRegion: ["Skin"]
  }
];

export interface DatasetMetadata {
  id: string;
  title: string;
  description: string;
  type: DatasetType;
  size: {
    bytes: number;
    formatted: string;
    category: 'micro' | 'small' | 'medium' | 'large' | 'xlarge';
  };
  price: number;
  format: FileFormat[];
  preview: string;
  compliance: ComplianceStandard[];
  downloads: number;
  rating: number;
  sampleSize: number;
  labeledSamples: number;
  validationSplit: string;
  lastUpdated: string;
  specialty: MedicalSpecialty[];
  anatomicalRegion: AnatomicalRegion[];
  modality: ImagingModality[];
  annotationType: AnnotationType[];
  quality: {
    iaaScore?: number;
    expertReviewed: boolean;
    multiCenter: boolean;
    standardizedProtocol: boolean;
    balancedClasses: boolean;
    diversePopulation: boolean;
  };
  documentation: {
    overview: string;
    dataFormat: string;
    quality: string;
  };
  integration: {
    pytorch?: string;
    tensorflow?: string;
  };
  stats: Array<{
    month: string;
    downloads: number;
  }>;
  sampleImages: string[];
}

export type DatasetType = 
  | 'Medical Imaging'
  | 'Clinical Text'
  | 'Signal Data'
  | 'Genomic Data'
  | 'Pathology'
  | 'Lab Results';

export type FileFormat = 
  | 'DICOM'
  | 'NIFTI'
  | 'PNG'
  | 'JPG'
  | 'TIFF'
  | 'SVS'
  | 'JSON'
  | 'CSV'
  | 'TXT'
  | 'XML'
  | 'HDF5'
  | 'MAT';

export type ComplianceStandard = 
  | 'HIPAA'
  | 'GDPR'
  | 'FDA'
  | 'CE'
  | 'ISO13485'
  | 'IRB';

export type MedicalSpecialty =
  | 'Radiology'
  | 'Pathology'
  | 'Cardiology'
  | 'Neurology'
  | 'Dermatology'
  | 'Oncology'
  | 'Ophthalmology'
  | 'Orthopedics'
  | 'General Practice';

export type AnatomicalRegion =
  | 'Brain'
  | 'Chest'
  | 'Abdomen'
  | 'Musculoskeletal'
  | 'Cardiovascular'
  | 'Head & Neck'
  | 'Spine'
  | 'Pelvis'
  | 'Extremities'
  | 'Whole Body'
  | 'Skin';

export type ImagingModality =
  | 'X-ray'
  | 'MRI'
  | 'CT'
  | 'Ultrasound'
  | 'PET'
  | 'SPECT'
  | 'Mammography'
  | 'Microscopy'
  | 'Endoscopy'
  | 'OCT'
  | 'ECG';

export type AnnotationType =
  | 'Bounding Box'
  | 'Segmentation Mask'
  | 'Classification'
  | 'Keypoint'
  | 'Text Annotation'
  | 'Polygon'
  | '3D Mesh'
  | 'Contour';

export function validateDatasetMetadata(metadata: Partial<DatasetMetadata>): string[] {
  const errors: string[] = [];

  // Required fields
  const requiredFields = [
    'id',
    'title',
    'description',
    'type',
    'size',
    'price',
    'format',
    'preview'
  ];

  requiredFields.forEach(field => {
    if (!metadata[field as keyof DatasetMetadata]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Size validation
  if (metadata.size) {
    if (typeof metadata.size.bytes !== 'number' || metadata.size.bytes <= 0) {
      errors.push('Invalid size.bytes value');
    }
    if (!['micro', 'small', 'medium', 'large', 'xlarge'].includes(metadata.size.category)) {
      errors.push('Invalid size.category value');
    }
  }

  // Format validation
  if (metadata.format && !metadata.format.every(format => 
    ['DICOM', 'NIFTI', 'PNG', 'JPG', 'TIFF', 'SVS', 'JSON', 'CSV', 'TXT', 'XML', 'HDF5', 'MAT'].includes(format as FileFormat))) {
    errors.push('Invalid format value(s)');
  }

  // Compliance validation
  if (metadata.compliance && !metadata.compliance.every(standard =>
    ['HIPAA', 'GDPR', 'FDA', 'CE', 'ISO13485', 'IRB'].includes(standard as ComplianceStandard))) {
    errors.push('Invalid compliance standard(s)');
  }

  // Numeric validations
  if (metadata.price && (typeof metadata.price !== 'number' || metadata.price < 0)) {
    errors.push('Invalid price value');
  }
  if (metadata.downloads && (typeof metadata.downloads !== 'number' || metadata.downloads < 0)) {
    errors.push('Invalid downloads value');
  }
  if (metadata.rating && (typeof metadata.rating !== 'number' || metadata.rating < 0 || metadata.rating > 5)) {
    errors.push('Invalid rating value');
  }

  return errors;
}

export function categorizeDatasetSize(bytes: number): 'micro' | 'small' | 'medium' | 'large' | 'xlarge' {
  const GB = 1024 * 1024 * 1024;
  if (bytes < GB) return 'micro';
  if (bytes < 10 * GB) return 'small';
  if (bytes < 50 * GB) return 'medium';
  if (bytes < 100 * GB) return 'large';
  return 'xlarge';
}

export function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

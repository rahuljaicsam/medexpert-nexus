"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp, Filter } from "lucide-react";

export interface FilterOption {
  id: string;
  label: string;
  group: string;
  subgroup?: string;
}

interface FilterGroup {
  id: string;
  label: string;
  expanded?: boolean;
  subgroups?: {
    id: string;
    label: string;
    options: FilterOption[];
  }[];
  options?: FilterOption[];
}

const filterGroups: FilterGroup[] = [
  {
    id: "file-formats",
    label: "File Formats",
    options: [
      { id: "csv", label: "CSV (.csv)", group: "fileType" },
      { id: "json", label: "JSON (.json)", group: "fileType" },
      { id: "dicom", label: "DICOM (.dcm, .dicom)", group: "fileType" },
      { id: "nifti", label: "NIFTI (.nii, .nii.gz)", group: "fileType" },
      { id: "png", label: "PNG (.png)", group: "fileType" },
      { id: "jpeg", label: "JPEG (.jpg, .jpeg)", group: "fileType" },
      { id: "tiff", label: "TIFF (.tif, .tiff)", group: "fileType" },
      { id: "hdf5", label: "HDF5 (.h5, .hdf5)", group: "fileType" },
      { id: "matlab", label: "MATLAB (.mat)", group: "fileType" },
      { id: "xml", label: "XML (.xml)", group: "fileType" }
    ]
  },
  {
    id: "dataset-size",
    label: "Dataset Size",
    options: [
      { id: "micro", label: "Very Small (< 100)", group: "size" },
      { id: "small", label: "Small (100 - 1,000)", group: "size" },
      { id: "medium", label: "Medium (1,000 - 10,000)", group: "size" },
      { id: "large", label: "Large (10,000 - 100,000)", group: "size" },
      { id: "xlarge", label: "Extra Large (> 100,000)", group: "size" }
    ]
  },
  {
    id: "specialty",
    label: "Medical Specialty",
    options: [
      { id: "radiology", label: "Radiology", group: "specialty" },
      { id: "pathology", label: "Pathology", group: "specialty" },
      { id: "cardiology", label: "Cardiology", group: "specialty" },
      { id: "neurology", label: "Neurology", group: "specialty" },
      { id: "dermatology", label: "Dermatology", group: "specialty" },
      { id: "oncology", label: "Oncology", group: "specialty" },
      { id: "ophthalmology", label: "Ophthalmology", group: "specialty" },
      { id: "orthopedics", label: "Orthopedics", group: "specialty" },
      { id: "gastroenterology", label: "Gastroenterology", group: "specialty" },
      { id: "pulmonology", label: "Pulmonology", group: "specialty" },
      { id: "urology", label: "Urology", group: "specialty" },
      { id: "endocrinology", label: "Endocrinology", group: "specialty" },
      { id: "pediatrics", label: "Pediatrics", group: "specialty" },
      { id: "obstetrics", label: "Obstetrics & Gynecology", group: "specialty" },
      { id: "anesthesiology", label: "Anesthesiology", group: "specialty" },
      { id: "geriatrics", label: "Geriatrics", group: "specialty" },
      { id: "surgery", label: "General Surgery", group: "specialty" },
      { id: "neurosurgery", label: "Neurosurgery", group: "specialty" },
      { id: "cardiothoracic", label: "Cardiothoracic Surgery", group: "specialty" },
      { id: "ent", label: "Otolaryngology (ENT)", group: "specialty" },
      { id: "nephrology", label: "Nephrology", group: "specialty" },
      { id: "hepatology", label: "Hepatology", group: "specialty" },
      { id: "nuclear", label: "Nuclear Medicine", group: "specialty" },
      { id: "sports", label: "Sports Medicine", group: "specialty" },
      { id: "emergency", label: "Emergency Medicine", group: "specialty" },
      { id: "rehabilitation", label: "Rehabilitation Medicine", group: "specialty" },
      { id: "immunology", label: "Allergy and Immunology", group: "specialty" }
    ]
  },
  {
    id: "anatomical",
    label: "Anatomical Region",
    options: [
      { id: "brain", label: "Brain", group: "anatomical" },
      { id: "chest", label: "Chest", group: "anatomical" },
      { id: "abdomen", label: "Abdomen", group: "anatomical" },
      { id: "musculoskeletal", label: "Musculoskeletal", group: "anatomical" },
      { id: "cardiovascular", label: "Cardiovascular System", group: "anatomical" },
      { id: "head-neck", label: "Head & Neck", group: "anatomical" },
      { id: "spine", label: "Spine", group: "anatomical" },
      { id: "pelvis", label: "Pelvis", group: "anatomical" },
      { id: "extremities", label: "Extremities", group: "anatomical" },
      { id: "breast", label: "Breast", group: "anatomical" },
      { id: "thyroid", label: "Thyroid", group: "anatomical" },
      { id: "liver", label: "Liver", group: "anatomical" },
      { id: "kidney", label: "Kidney", group: "anatomical" },
      { id: "prostate", label: "Prostate", group: "anatomical" },
      { id: "lung", label: "Lung", group: "anatomical" },
      { id: "reproductive", label: "Reproductive System", group: "anatomical" },
      { id: "face", label: "Face", group: "anatomical" },
      { id: "whole-body", label: "Whole Body / Multi-Region", group: "anatomical" }
    ]
  },
  {
    id: "modality",
    label: "Imaging Modality",
    options: [
      { id: "xray", label: "X-ray (Radiography)", group: "modality" },
      { id: "mri", label: "MRI", group: "modality" },
      { id: "ct", label: "CT", group: "modality" },
      { id: "ultrasound", label: "Ultrasound", group: "modality" },
      { id: "pet", label: "PET", group: "modality" },
      { id: "spect", label: "SPECT", group: "modality" },
      { id: "mammography", label: "Mammography", group: "modality" },
      { id: "fluoroscopy", label: "Fluoroscopy", group: "modality" },
      { id: "angiography", label: "Angiography", group: "modality" },
      { id: "endoscopy", label: "Endoscopy", group: "modality" },
      { id: "microscopy", label: "Light Microscopy", group: "modality" },
      { id: "electron", label: "Electron Microscopy", group: "modality" },
      { id: "oct", label: "Optical Coherence Tomography", group: "modality" },
      { id: "fundus", label: "Fundus Photography", group: "modality" },
      { id: "thermography", label: "Thermography", group: "modality" },
      { id: "nuclear", label: "Nuclear Medicine Imaging", group: "modality" }
    ]
  },
  {
    id: "annotation",
    label: "Annotation Types",
    options: [
      { id: "bounding-box", label: "Bounding Boxes", group: "annotation" },
      { id: "segmentation-2d", label: "Segmentation Masks (2D)", group: "annotation" },
      { id: "semantic", label: "Semantic Segmentation", group: "annotation" },
      { id: "instance", label: "Instance Segmentation", group: "annotation" },
      { id: "classification", label: "Classification Labels", group: "annotation" },
      { id: "text", label: "Text Annotations", group: "annotation" },
      { id: "keypoints", label: "Keypoints / Landmarks", group: "annotation" },
      { id: "polygons", label: "Polygons", group: "annotation" },
      { id: "3d-mesh", label: "3D Meshes", group: "annotation" },
      { id: "contours", label: "Contours", group: "annotation" }
    ]
  },
  {
    id: "quality",
    label: "Quality & Compliance",
    options: [
      { id: "high-iaa", label: "High IAA (≥ 0.8)", group: "quality" },
      { id: "medium-iaa", label: "Medium IAA (0.6 - 0.8)", group: "quality" },
      { id: "low-iaa", label: "Low IAA (< 0.6)", group: "quality" },
      { id: "expert-reviewed", label: "Expert-Reviewed", group: "quality" },
      { id: "multi-center", label: "Multi-Center Study", group: "quality" },
      { id: "longitudinal", label: "Longitudinal Data", group: "quality" },
      { id: "standardized", label: "Standardized Protocol", group: "quality" },
      { id: "balanced", label: "Balanced Classes", group: "quality" },
      { id: "diverse", label: "Diverse Population", group: "quality" },
      { id: "hipaa", label: "HIPAA Compliant", group: "compliance" },
      { id: "gdpr", label: "GDPR Compliant", group: "compliance" },
      { id: "fda", label: "FDA/CE Relevant", group: "compliance" },
      { id: "iso", label: "ISO 13485 Certified", group: "compliance" },
      { id: "anonymized", label: "Fully Anonymized", group: "privacy" },
      { id: "irb", label: "IRB Approval", group: "compliance" }
    ]
  }
];

interface DatasetFiltersProps {
  selectedFilters: Set<string>;
  onFilterChange: (filters: Set<string>) => void;
  onClearFilters: () => void;
}

export function DatasetFilters({ selectedFilters, onFilterChange, onClearFilters }: DatasetFiltersProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(filterGroups.map(g => g.id)));

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleFilter = (filterId: string) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(filterId)) {
      newFilters.delete(filterId);
    } else {
      newFilters.add(filterId);
    }
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      {selectedFilters.size > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedFilters).map((filterId) => {
              const option = filterGroups
                .flatMap(g => g.options || [])
                .find(o => o.id === filterId);
              
              if (!option) return null;

              return (
                <button
                  key={filterId}
                  onClick={() => toggleFilter(filterId)}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/20"
                >
                  {option.label}
                  <X className="ml-2 h-4 w-4" />
                </button>
              );
            })}
          </div>
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all filters
          </button>
        </div>
      )}

      <div className="space-y-4">
        {filterGroups.map((group) => (
          <div key={group.id} className="rounded-lg border border-gray-200 bg-white">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-gray-900">{group.label}</span>
              {expandedGroups.has(group.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedGroups.has(group.id) && group.options && (
              <div className="border-t border-gray-200 p-4">
                <div className="grid grid-cols-2 gap-3">
                  {group.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.has(option.id)}
                        onChange={() => toggleFilter(option.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

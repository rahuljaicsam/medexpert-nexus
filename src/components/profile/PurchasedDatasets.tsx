"use client";

import { useEffect, useState } from "react";
import { ProfileSection } from "./ProfileSection";

interface DatasetInfo {
  title: string;
  size: string;
  format: string[];
}

interface DatasetMap {
  [key: string]: DatasetInfo;
}

export function PurchasedDatasets() {
  const [datasets, setDatasets] = useState<string[]>([]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const purchased = localStorage.getItem('purchased_datasets');
      if (purchased) {
        setDatasets(JSON.parse(purchased));
      }
    }
  }, []);

  const datasetInfo: DatasetMap = {
    'brain-tumor-mri': {
      title: "Brain Tumor MRI Segmentation Dataset",
      size: "25 GB",
      format: ["NIFTI", "JSON"]
    },
    'chest-xray-pneumonia': {
      title: "Chest X-Ray Pneumonia Detection Dataset",
      size: "15 GB",
      format: ["DICOM", "PNG", "JSON"]
    },
    'clinical-notes': {
      title: "Clinical Notes NLP Dataset",
      size: "8 GB",
      format: ["JSON", "CSV", "TXT"]
    },
    'pathology-slides': {
      title: "Digital Pathology Slides Dataset",
      size: "50 GB",
      format: ["SVS", "TIFF", "JSON"]
    },
    'ecg-analysis': {
      title: "ECG Analysis Dataset",
      size: "12 GB",
      format: ["DICOM", "CSV", "JSON"]
    },
    'dermatology-images': {
      title: "Dermatology Image Collection",
      size: "30 GB",
      format: ["DICOM", "JPG", "JSON"]
    }
  };

  return (
    <ProfileSection title="Purchased Datasets" className="mt-6">
      <div className="mt-4 space-y-4">
        {datasets.map((datasetId: string) => {
          const dataset = datasetInfo[datasetId as keyof typeof datasetInfo];
          if (!dataset) return null;

          return (
            <div key={datasetId} className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{dataset.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Size: {dataset.size} • Format: {dataset.format.join(", ")}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    alert('Download started! Check your downloads folder.');
                  }}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  Download Dataset
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ProfileSection>
  );
}

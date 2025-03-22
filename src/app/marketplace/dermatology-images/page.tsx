"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, ShieldCheck, Code, Server, Database } from "lucide-react";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
const dataset = {
  id: "dermatology-images",
  title: "Dermatology Image Collection",
  description: "High-quality dermatological images with expert annotations for skin condition diagnosis and analysis.",
  type: "Medical Imaging",
  size: "30 GB",
  price: 899,
  format: ["DICOM", "JPG", "JSON"],
  preview: "https://images.unsplash.com/photo-1576671081837-49000212a370",
  compliance: ["HIPAA", "GDPR"],
  downloads: 112,
  rating: 4.7,
  sampleSize: 20000,
  labeledSamples: 20000,
  validationSplit: "70/15/15",
  lastUpdated: "2024-03-12",
  documentation: {
    overview: `This comprehensive dataset contains high-resolution dermatological images with expert annotations:

- Multiple skin conditions and diseases
- Various anatomical locations
- Different lighting conditions and angles
- Demographic diversity
- Detailed lesion measurements

Images are collected from certified dermatology clinics with proper consent and de-identification.`,
    dataFormat: `Data is provided in multiple formats:
- DICOM: Full medical imaging format with metadata
- JPG: High-resolution compressed images
- JSON: Detailed annotations including:
  * Lesion boundaries
  * Condition classification
  * Severity scores
  * Clinical observations`,
    quality: `Quality assurance measures:
- Expert validation by board-certified dermatologists
- Standardized imaging protocols
- Consistent lighting and positioning
- Multiple expert reviews per image
- Comprehensive metadata validation`
  },
  integration: {
    pytorch: `import torch
from torch.utils.data import Dataset
from torchvision import transforms
from PIL import Image

class DermatologyDataset(Dataset):
    def __init__(self, data_dir, transform=None):
        self.data_dir = data_dir
        self.transform = transform or transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
        
    def __getitem__(self, idx):
        # Load image and annotations
        image = Image.open(f"{self.data_dir}/{idx}.jpg")
        return self.transform(image), label`,
    tensorflow: `import tensorflow as tf

def create_dataset(data_path, batch_size=32):
    def preprocess(image_path, label):
        image = tf.io.read_file(image_path)
        image = tf.image.decode_jpeg(image, channels=3)
        image = tf.image.resize(image, [224, 224])
        image = tf.keras.applications.imagenet_utils.preprocess_input(
            image, mode='torch'
        )
        return image, label
    
    dataset = tf.data.Dataset.from_tensor_slices(
        (image_paths, labels)
    )
    dataset = dataset.map(preprocess)
    dataset = dataset.batch(batch_size)
    return dataset`
  },
  stats: [{
    month: 'Jan',
    downloads: 30
  }, {
    month: 'Feb',
    downloads: 45
  }, {
    month: 'Mar',
    downloads: 65
  }, {
    month: 'Apr',
    downloads: 80
  }, {
    month: 'May',
    downloads: 95
  }, {
    month: 'Jun',
    downloads: 112
  }],
  sampleImages: ["https://images.unsplash.com/photo-1576671081837-49000212a370", "https://images.unsplash.com/photo-1579165466741-7f35e4755660", "https://picsum.photos/200"]
};
export default function DatasetPage() {
  return <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <Link href="/marketplace" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          {/* Hero Section */}
          <div className="mb-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {dataset.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {dataset.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  {dataset.type}
                </span>
                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {dataset.size}
                </span>
                {dataset.compliance.map(item => <span key={item} className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                    {item} Compliant
                  </span>)}
              </div>
              <div className="mt-8">
                <div className="text-3xl font-bold text-primary">
                  ${dataset.price}
                </div>
                <button onClick={() => {
                if (typeof window !== 'undefined') {
                  const purchased = localStorage.getItem('purchased_datasets');
                  const datasets = purchased ? JSON.parse(purchased) : [];
                  if (!datasets.includes(dataset.id)) {
                    datasets.push(dataset.id);
                    localStorage.setItem('purchased_datasets', JSON.stringify(datasets));
                  }
                }
                window.location.href = '/profile#downloads';
              }} className="mt-4 w-full rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                  Purchase Dataset (${dataset.price})
                </button>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <img src={dataset.preview} alt="Dataset Preview" className="h-64 w-full rounded-lg object-cover" />
              <div className="mt-6 grid grid-cols-3 gap-4">
                {dataset.sampleImages.map((img, idx) => <img key={idx} src={img} alt={`Sample ${idx + 1}`} className="h-24 w-full rounded-lg object-cover" />)}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
              <Tab className={({
              selected
            }) => cn("w-full rounded-lg py-2.5 text-sm font-medium leading-5", "ring-white ring-opacity-60 ring-offset-2 focus:outline-none", selected ? "bg-white text-primary shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800")}>
                Overview
              </Tab>
              <Tab className={({
              selected
            }) => cn("w-full rounded-lg py-2.5 text-sm font-medium leading-5", "ring-white ring-opacity-60 ring-offset-2 focus:outline-none", selected ? "bg-white text-primary shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800")}>
                Documentation
              </Tab>
              <Tab className={({
              selected
            }) => cn("w-full rounded-lg py-2.5 text-sm font-medium leading-5", "ring-white ring-opacity-60 ring-offset-2 focus:outline-none", selected ? "bg-white text-primary shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800")}>
                Integration
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-8">
              <Tab.Panel>
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Dataset Statistics
                      </h3>
                      <dl className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm text-gray-500">Total Samples</dt>
                          <dd className="text-2xl font-semibold text-gray-900">
                            {dataset.sampleSize.toLocaleString()}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Labeled Samples</dt>
                          <dd className="text-2xl font-semibold text-gray-900">
                            {dataset.labeledSamples.toLocaleString()}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Train/Val/Test Split</dt>
                          <dd className="text-2xl font-semibold text-gray-900">
                            {dataset.validationSplit}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Last Updated</dt>
                          <dd className="text-2xl font-semibold text-gray-900">
                            {dataset.lastUpdated}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Download Trends
                      </h3>
                      <div className="mt-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={dataset.stats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="downloads" stroke="#2563eb" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Supported Formats
                      </h3>
                      <div className="mt-4 space-y-4">
                        {dataset.format.map(format => <div key={format} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <span className="ml-3 font-medium">{format}</span>
                            </div>
                            <button className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200">
                              Preview
                            </button>
                          </div>)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Quality Metrics
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Expert Validation
                          </span>
                          <span className="font-medium text-green-600">
                            Verified
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Imaging Protocol
                          </span>
                          <span className="font-medium text-green-600">
                            Standardized
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Data Completeness
                          </span>
                          <span className="font-medium text-green-600">
                            100%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-8 rounded-lg bg-white p-8 shadow-lg">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Overview
                    </h3>
                    <div className="mt-4 whitespace-pre-wrap text-gray-600">
                      {dataset.documentation.overview}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Data Format
                    </h3>
                    <div className="mt-4 whitespace-pre-wrap text-gray-600">
                      {dataset.documentation.dataFormat}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Quality Assurance
                    </h3>
                    <div className="mt-4 whitespace-pre-wrap text-gray-600">
                      {dataset.documentation.quality}
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        PyTorch Integration
                      </h3>
                      <img src="https://pytorch.org/assets/images/pytorch-logo.png" alt="PyTorch" className="h-8" />
                    </div>
                    <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-4">
                      <code className="text-sm text-white">
                        {dataset.integration.pytorch}
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        TensorFlow Integration
                      </h3>
                      <img src="https://www.tensorflow.org/images/tf_logo_social.png" alt="TensorFlow" className="h-8" />
                    </div>
                    <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-4">
                      <code className="text-sm text-white">
                        {dataset.integration.tensorflow}
                      </code>
                    </pre>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </div>
    </div>;
}
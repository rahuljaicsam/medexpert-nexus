"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Upload,
  Download,
  Brush,
  Eraser,
  Square,
  ChevronDown,
  HelpCircle,
  X
} from "lucide-react";
import Link from "next/link";
import { LabelStudio } from "@/components/LabelStudio";
import { ToolSelector } from "@/components/demo/ToolSelector";
import { ToolInstructions } from "@/components/demo/ToolInstructions";
import type { LabelStudioInstance, LabelStudioTask } from "@/types/label-studio";
import type { Tool } from "@/types/tools";

const tools: Tool[] = [
  {
    id: "label-studio",
    name: "Label Studio",
    description: "Versatile annotation tool for 2D images and text data with customizable interfaces",
    config: `<View>
      <Image name="img" value="$image" zoom="true" rotateControl="true"/>
      <RectangleLabels name="tag" toName="img" showInline="true">
        <Label value="Tumor" background="#FF0000"/>
        <Label value="Lesion" background="#00FF00"/>
        <Label value="Abnormality" background="#0000FF"/>
      </RectangleLabels>
      <TextArea name="transcription" toName="img" 
        placeholder="Add any additional notes about the annotation here..."
        rows="4"
      />
    </View>`,
    instructions: [
      "Select the type of annotation task (Image/Text)",
      "Configure annotation labels and tools",
      "Upload your dataset",
      "Start annotating using the provided tools",
      "Review and export annotations"
    ]
  },
  {
    id: "medsam2",
    name: "MEDSAM2",
    description: "Advanced medical image segmentation using state-of-the-art AI models",
    instructions: [
      "Load your medical image",
      "Select segmentation preset",
      "Adjust model parameters if needed",
      "Run automatic segmentation",
      "Fine-tune results manually if required"
    ]
  },
  {
    id: "3d-slicer",
    name: "3D Slicer",
    description: "Comprehensive platform for medical image visualization and analysis in 3D",
    instructions: [
      "Import DICOM or NIFTI data",
      "Choose visualization layout",
      "Select segmentation tools",
      "Create and edit 3D models",
      "Save results in desired format"
    ]
  },
  {
    id: "itk-snap",
    name: "ITK-SNAP",
    description: "Specialized tool for 3D image segmentation with semi-automatic features",
    instructions: [
      "Load your 3D image dataset",
      "Configure segmentation parameters",
      "Initialize active contour",
      "Run segmentation algorithm",
      "Review and refine results"
    ]
  },
  {
    id: "monai-label",
    name: "MONAI Label",
    description: "AI-powered medical image annotation with active learning capabilities",
    instructions: [
      "Connect to MONAI server",
      "Select AI model for assistance",
      "Start annotation process",
      "Review AI suggestions",
      "Export final annotations"
    ]
  },
  {
    id: "mitk",
    name: "MITK Workbench",
    description: "Professional-grade medical imaging toolkit for advanced analysis",
    instructions: [
      "Import medical image data",
      "Select analysis tools",
      "Perform measurements",
      "Create detailed annotations",
      "Export results and reports"
    ]
  }
];

const defaultConfig = `<View>
  <Header value="Medical Image Annotation"/>
  <Image name="img" value="$image" zoom="true" rotateControl="true"/>
  <RectangleLabels name="tag" toName="img" showInline="true">
    <Label value="Tumor" background="#FF0000"/>
    <Label value="Lesion" background="#00FF00"/>
    <Label value="Abnormality" background="#0000FF"/>
  </RectangleLabels>
  <TextArea name="transcription" toName="img" 
    placeholder="Add any additional notes about the annotation here..."
    rows="4"
  />
</View>`;

const task: LabelStudioTask = {
  annotations: [] as Array<Record<string, unknown>>,
  predictions: [] as Array<Record<string, unknown>>,
  id: 1,
  data: {
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=800",
  },
};

const interfaces = [
  "panel",
  "update",
  "controls",
  "side-column",
  "annotations:menu",
  "annotations:add-new",
  "annotations:delete",
  "predictions:menu",
  "topbar",
];

const user = {
  pk: 1,
  firstName: "Demo",
  lastName: "User",
};

export default function DemoPage() {
  const [selectedTool, setSelectedTool] = useState<Tool>(tools[0]);
  const [savedAnnotation, setSavedAnnotation] = useState<string>("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAnnotationSubmit = (_ls: LabelStudioInstance, annotation: any) => {
    const serialized = JSON.stringify(annotation.serializeAnnotation(), null, 2);
    setSavedAnnotation(serialized);
    console.log("Annotation submitted:", serialized);
  };

  const handleAnnotationUpdate = (_ls: LabelStudioInstance, annotation: any) => {
    console.log("Annotation updated:", annotation);
  };

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    console.log("File uploaded:", file.name);
  };

  const handleExport = () => {
    if (savedAnnotation) {
      const blob = new Blob([savedAnnotation], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'annotation.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <div className="relative">
              <select
                value={selectedTool.id}
                onChange={(e) => setSelectedTool(tools.find(t => t.id === e.target.value) || tools[0])}
                className="h-10 w-64 appearance-none rounded-lg border border-gray-300 bg-white pl-4 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {tools.map(tool => (
                  <option key={tool.id} value={tool.id}>
                    {tool.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <button
              onClick={() => setShowInstructions(true)}
              className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Quick Start Guide
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedTool.name}</h2>
              <p className="mt-2 text-gray-600">{selectedTool.description}</p>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                  <Brush className="mr-2 h-4 w-4" />
                  Brush
                </button>
                <button className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                  <Eraser className="mr-2 h-4 w-4" />
                  Eraser
                </button>
                <button className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                  <Square className="mr-2 h-4 w-4" />
                  Rectangle
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import Data
                </button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                <button
                  onClick={handleExport}
                  className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </button>
              </div>
            </div>
          </div>

        {showInstructions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-2xl rounded-lg bg-white p-6"
            >
              <button
                onClick={() => setShowInstructions(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-bold text-gray-900">
                Quick Start Guide: {selectedTool.name}
              </h3>
              <div className="mt-4">
                <ol className="list-decimal space-y-2 pl-4">
                  {selectedTool.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-600">{instruction}</li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <LabelStudio
            config={selectedTool.config || defaultConfig}
            task={task}
            interfaces={interfaces}
            user={user}
            onSubmit={handleAnnotationSubmit}
            onUpdate={handleAnnotationUpdate}
            className="min-h-[700px]"
          />

          {savedAnnotation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <h3 className="mb-2 text-sm font-medium text-gray-900">
                Latest Annotation Data:
              </h3>
              <pre className="max-h-40 overflow-auto rounded bg-gray-50 p-2 text-xs">
                {savedAnnotation}
              </pre>
            </motion.div>
          )}
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

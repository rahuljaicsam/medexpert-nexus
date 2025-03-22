"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { useDropzone } from "react-dropzone";
import { 
  Upload, 
  FileText, 
  Settings, 
  DollarSign,
  Users,
  ChevronRight,
  ChevronLeft,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectFormData {
  name: string;
  description: string;
  dataType: string;
  guidelines: string;
  pricePerTask: number;
  assignmentType: "manual" | "automatic";
  labelingConfig: string;
}

const defaultConfig = `
<View>
  <Image name="img" value="$image"/>
  <RectangleLabels name="tag" toName="img">
    <Label value="Abnormal" background="#FF0000"/>
    <Label value="Normal" background="#00FF00"/>
  </RectangleLabels>
  <TextArea name="notes" toName="img" 
    placeholder="Add any additional notes..."
    rows="4"
  />
</View>
`;

export function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    dataType: "images",
    guidelines: "",
    pricePerTask: 0.5,
    assignmentType: "automatic",
    labelingConfig: defaultConfig,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.dicom'],
    },
    onDrop: (acceptedFiles) => {
      console.log('Files dropped:', acceptedFiles);
      // In a real app, handle file upload to storage
    }
  });

  const steps = [
    {
      title: "Project Details",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g., Chest X-Ray Classification"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Describe your project and its goals..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data Type
            </label>
            <select
              value={formData.dataType}
              onChange={(e) => setFormData({ ...formData, dataType: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="images">Medical Images</option>
              <option value="text">Clinical Text</option>
              <option value="video">Medical Videos</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Upload Dataset",
      icon: Upload,
      content: (
        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={cn(
              "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12",
              isDragActive ? "border-primary bg-primary/5" : "border-gray-300"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="mt-4 text-center text-sm text-gray-600">
              Drag & drop your medical dataset here, or click to select files
            </p>
            <p className="mt-2 text-center text-xs text-gray-500">
              Supported formats: JPEG, PNG, DICOM
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-900">Data Privacy</h4>
            <p className="mt-1 text-xs text-gray-600">
              All uploaded data is automatically de-identified and encrypted. We comply
              with HIPAA and GDPR regulations.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Annotation Setup",
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Labeling Configuration
            </label>
            <textarea
              value={formData.labelingConfig}
              onChange={(e) => setFormData({ ...formData, labelingConfig: e.target.value })}
              rows={8}
              className="mt-1 block w-full font-mono rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annotation Guidelines
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Provide clear, step-by-step instructions for annotators. Include examples and edge cases.
              </p>
              <div className="mt-2 space-y-4">
                <textarea
                  value={formData.guidelines}
                  onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
                  rows={8}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Example:
1. Review the entire image before starting annotation
2. For tumor identification:
   - Mark all visible tumors with rectangular bounding boxes
   - Ensure boxes are tight around the tumor boundaries
   - Include surrounding tissue only if relevant
3. For classification:
   - Select the appropriate label (benign/malignant)
   - If uncertain, mark as 'needs review'
4. Quality checks:
   - Verify all annotations are properly aligned
   - Check for missing or overlapping boxes
   - Add notes for any unusual cases"
                />
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="text-sm font-medium text-blue-800">Guidelines Best Practices</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-700">
                    <li>Be specific about what to include/exclude</li>
                    <li>Provide visual examples where possible</li>
                    <li>Define terminology clearly</li>
                    <li>Include quality control criteria</li>
                    <li>Specify how to handle edge cases</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Task Assignment",
      icon: Users,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assignment Type
            </label>
            <div className="mt-2 space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={formData.assignmentType === "automatic"}
                  onChange={() => setFormData({ ...formData, assignmentType: "automatic" })}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <label className="ml-3 block text-sm text-gray-700">
                  Automatic Assignment
                  <p className="text-xs text-gray-500">
                    System automatically assigns tasks to qualified annotators
                  </p>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={formData.assignmentType === "manual"}
                  onChange={() => setFormData({ ...formData, assignmentType: "manual" })}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <label className="ml-3 block text-sm text-gray-700">
                  Manual Selection
                  <p className="text-xs text-gray-500">
                    You choose specific annotators for your project
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pricing",
      icon: DollarSign,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price per Task
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.pricePerTask}
                onChange={(e) => setFormData({ ...formData, pricePerTask: parseFloat(e.target.value) })}
                className="pl-7 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Suggested price range: $0.20 - $2.00 per task
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-900">Estimated Costs</h4>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Total Tasks: 100</p>
              <p>Estimated Total: ${(formData.pricePerTask * 100).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleSubmit = () => {
    console.log('Project data:', formData);
    // In a real app, send to backend
  };

  return (
    <div className="space-y-8">
      <Tab.Group selectedIndex={currentStep} onChange={setCurrentStep}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-50 p-1">
          {steps.map((step, index) => (
            <Tab
              key={step.title}
              className={({ selected }) =>
                cn(
                  "flex items-center space-x-2 rounded-lg px-4 py-2.5 text-sm font-medium leading-5",
                  "focus:outline-none",
                  selected
                    ? "bg-white text-primary shadow"
                    : "text-gray-500 hover:bg-white/[0.12] hover:text-gray-700"
                )
              }
            >
              <step.icon className="h-5 w-5" />
              <span className="hidden md:inline">{step.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-8">
          {steps.map((step, idx) => (
            <Tab.Panel
              key={idx}
              className={cn(
                "rounded-xl bg-white p-6",
                "ring-1 ring-gray-200"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {step.content}
              </motion.div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      <div className="flex justify-between pt-6">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={cn(
            "inline-flex items-center rounded-md px-4 py-2 text-sm font-medium",
            currentStep === 0
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </button>
        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Create Project
            <Check className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

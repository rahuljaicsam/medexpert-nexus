"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check, X, MessageSquare, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";

// Dummy data for reviews
const reviews = [{
  id: 1,
  taskId: "TASK-001",
  originalImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  annotatedImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  annotator: "Dr. Sarah Chen",
  status: "pending",
  date: "2024-03-19",
  annotations: [{
    type: "rectangle",
    label: "Tumor",
    confidence: 0.92,
    coordinates: {
      x: 120,
      y: 150,
      width: 60,
      height: 40
    }
  }],
  feedback: []
}, {
  id: 2,
  taskId: "TASK-002",
  originalImage: "https://picsum.photos/200",
  annotatedImage: "https://picsum.photos/200",
  annotator: "Dr. Michael Brown",
  status: "approved",
  date: "2024-03-18",
  annotations: [{
    type: "rectangle",
    label: "Lesion",
    confidence: 0.88,
    coordinates: {
      x: 200,
      y: 300,
      width: 80,
      height: 60
    }
  }],
  feedback: [{
    author: "Dr. Emily White",
    message: "Good annotation, but consider extending the bounding box slightly.",
    timestamp: "2024-03-18T14:30:00Z"
  }]
}];
export default function ReviewPage() {
  const [selectedReview, setSelectedReview] = useState(reviews[0]);
  const [feedback, setFeedback] = useState("");
  const handleApprove = () => {
    console.log("Approved:", selectedReview.id);
    // In a real app, send to backend
  };
  const handleReject = () => {
    console.log("Rejected:", selectedReview.id);
    // In a real app, send to backend
  };
  const handleSubmitFeedback = () => {
    if (!feedback.trim()) return;
    console.log("Feedback submitted:", feedback);
    // In a real app, send to backend
    setFeedback("");
  };
  return <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
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
      }} className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Annotation Review
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Review and provide feedback on submitted annotations
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Tasks</h2>
              <div className="space-y-2">
                {reviews.map(review => <button key={review.id} onClick={() => setSelectedReview(review)} className={cn("w-full rounded-lg p-3 text-left transition-colors", selectedReview.id === review.id ? "bg-primary text-white" : "hover:bg-gray-50")}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{review.taskId}</span>
                      <span className={cn("text-xs", review.status === "approved" ? "text-green-500" : "text-yellow-500")}>
                        {review.status}
                      </span>
                    </div>
                    <div className="mt-1 text-sm opacity-80">
                      {review.annotator}
                    </div>
                  </button>)}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-gray-50 p-1">
                  <Tab className={({
                  selected
                }) => cn("w-full rounded-lg py-2.5 text-sm font-medium leading-5", "ring-white ring-opacity-60 ring-offset-2 focus:outline-none", selected ? "bg-white text-primary shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800")}>
                    Side by Side
                  </Tab>
                  <Tab className={({
                  selected
                }) => cn("w-full rounded-lg py-2.5 text-sm font-medium leading-5", "ring-white ring-opacity-60 ring-offset-2 focus:outline-none", selected ? "bg-white text-primary shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800")}>
                    Comparison Slider
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-4">
                  <Tab.Panel>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                          Original Image
                        </h3>
                        <img src={selectedReview.originalImage} alt="Original" className="rounded-lg" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                          Annotated Image
                        </h3>
                        <img src={selectedReview.annotatedImage} alt="Annotated" className="rounded-lg" />
                      </div>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <ReactCompareSlider itemOne={<ReactCompareSliderImage src={selectedReview.originalImage} alt="Original" />} itemTwo={<ReactCompareSliderImage src={selectedReview.annotatedImage} alt="Annotated" />} className="rounded-lg" />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Feedback
                </h3>
                <div className="mb-4 space-y-4">
                  {selectedReview.feedback.map((item, index) => <div key={index} className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {item.author}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{item.message}</p>
                    </div>)}
                </div>
                <div className="space-y-4">
                  <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Add your feedback here..." rows={4} className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  <button onClick={handleSubmitFeedback} className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </button>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Actions
                </h3>
                <div className="space-y-4">
                  <button onClick={handleApprove} className="flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </button>
                  <button onClick={handleReject} className="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                    <X className="mr-2 h-4 w-4" />
                    Request Changes
                  </button>
                  <button onClick={() => {
                  // Reset review logic here
                }} className="flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
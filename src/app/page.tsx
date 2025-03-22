"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Database } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl py-32 sm:py-48">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Expert Medical Data Annotation Platform
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Connect with medical professionals globally to provide expert labeling services for AI training datasets in healthcare
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/marketplace"
                  className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Get Started
                  <ArrowRight className="ml-2 inline-block h-4 w-4" />
                </a>
                <a href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Powerful Platform
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for medical data annotation
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col rounded-lg bg-white p-6 shadow-lg"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Shield className="h-5 w-5 flex-none text-primary" />
                  Secure & Compliant
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    HIPAA and GDPR compliant platform with end-to-end encryption for your sensitive medical data
                  </p>
                </dd>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col rounded-lg bg-white p-6 shadow-lg"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Users className="h-5 w-5 flex-none text-primary" />
                  Expert Network
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Access to a global network of qualified medical professionals for high-quality annotations
                  </p>
                </dd>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col rounded-lg bg-white p-6 shadow-lg"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Database className="h-5 w-5 flex-none text-primary" />
                  Advanced Tools
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Integrated with leading medical image analysis and annotation tools for efficient workflows
                  </p>
                </dd>
              </motion.div>
            </dl>
          </div>
        </div>
      </div>

      {/* Label Studio Integration Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Powerful Annotation Tools
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Powered by Label Studio Frontend
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Leverage the power of Label Studio's open-source, configurable annotation tools. Built with React and fully customizable to meet your specific medical data labeling needs.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-xl bg-gray-50 p-8 ring-1 ring-gray-200"
            >
              <pre className="overflow-x-auto text-sm text-gray-800">
                <code>{`import LabelStudio from '@heartexlabs/label-studio';
import 'label-studio/build/static/css/main.css';

const labelStudio = new LabelStudio('label-studio', {
  config: \`
    <View>
      <Image name="img" value="$image"/>
      <RectangleLabels name="tag" toName="img">
        <Label value="Anomaly"/>
        <Label value="Normal"/>
      </RectangleLabels>
    </View>
  \`,
  interfaces: ["panel", "update", "submit", "controls"],
  task: {
    annotations: [],
    predictions: [],
    data: { image: "medical-scan.jpg" }
  }
});`}</code>
              </pre>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mt-10"
            >
              <a
                href="https://github.com/HumanSignal/label-studio-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View Label Studio Frontend on GitHub
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

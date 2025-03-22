"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg max-w-none"
        >
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900">
            About MedAcc Label
          </h1>
          
          <div className="mb-12">
            <p className="text-lg text-gray-600">
              MedAcc Label is a pioneering platform that connects medical professionals globally 
              to provide expert labeling services for healthcare AI datasets. Our mission is to 
              accelerate the development of AI in healthcare by providing high-quality, 
              expertly labeled medical data.
            </p>
            
            <div className="mt-6">
              <a
                href="https://www.medacc.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                Visit MedAcc Organization
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Our Vision</h2>
              <p className="text-gray-600">
                To become the global standard for medical data annotation, enabling the 
                development of more accurate and reliable AI solutions in healthcare through 
                expert human validation.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600">
                To provide a secure, compliant, and reliable marketplace for high-quality, 
                expertly labeled medical data, connecting healthcare professionals with 
                organizations developing medical AI solutions.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Expert Network</h3>
                <p className="text-gray-600">
                  Access to a global network of qualified medical professionals for 
                  high-quality annotations.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Advanced Tools</h3>
                <p className="text-gray-600">
                  State-of-the-art annotation tools powered by Label Studio Frontend and 
                  other leading technologies.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Compliance</h3>
                <p className="text-gray-600">
                  HIPAA and GDPR compliant platform ensuring the security and privacy of 
                  medical data.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

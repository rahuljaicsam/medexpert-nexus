"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { MetadataReview } from "@/components/admin/MetadataReview";
import { BasicInformation } from "@/components/profile/BasicInformation";
import { PurchasedDatasets } from "@/components/profile/PurchasedDatasets";
import { Specializations } from "@/components/profile/Specializations";
import { Certifications } from "@/components/profile/Certifications";

export default function ProfilePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ProfileHeader
            isAdmin={isAdmin}
            showAdminDashboard={showAdminDashboard}
            onToggleAdminView={() => setShowAdminDashboard(!showAdminDashboard)}
          />

          {showAdminDashboard ? (
            <MetadataReview onClose={() => setShowAdminDashboard(false)} />
          ) : (
            <div className="space-y-6">
              <BasicInformation />
              <Specializations />
              <Certifications />
              <PurchasedDatasets />
            </div>
          )}
        </motion.div>
      </div>
    </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medical License Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Specialty
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select specialty</option>
                    <option value="radiology">Radiology</option>
                    <option value="pathology">Pathology</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Areas of Expertise
              </h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                    placeholder="Add specialization"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    onClick={handleAddSpecialization}
                    className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {spec}
                      <button
                        onClick={() => handleRemoveSpecialization(index)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Certifications
                </h2>
                <button
                  onClick={handleAddCertification}
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  <Award className="mr-2 h-4 w-4" />
                  Add Certification
                </button>
              </div>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="grid gap-4 rounded-lg border p-4 md:grid-cols-3">
                    <input
                      placeholder="Certification name"
                      className="rounded-md border border-gray-300 px-3 py-2"
                      value={cert.name}
                      onChange={(e) =>
                        setCertifications(
                          certifications.map((c) =>
                            c.id === cert.id ? { ...c, name: e.target.value } : c
                          )
                        )
                      }
                    />
                    <input
                      placeholder="Issuing organization"
                      className="rounded-md border border-gray-300 px-3 py-2"
                      value={cert.issuer}
                      onChange={(e) =>
                        setCertifications(
                          certifications.map((c) =>
                            c.id === cert.id ? { ...c, issuer: e.target.value } : c
                          )
                        )
                      }
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Year"
                        className="w-24 rounded-md border border-gray-300 px-3 py-2"
                        value={cert.year}
                        onChange={(e) =>
                          setCertifications(
                            certifications.map((c) =>
                              c.id === cert.id ? { ...c, year: e.target.value } : c
                            )
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          setCertifications(certifications.filter((c) => c.id !== cert.id))
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment Methods
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your payment integrations and preferences
                  </p>
                </div>
                <select
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select Default Payment Method</option>
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                  <option value="upi">UPI</option>
                  <option value="apple-pay">Apple Pay</option>
                  <option value="google-pay">Google Pay</option>
                  <option value="metamask">MetaMask</option>
                </select>
              </div>

              <div className="space-y-6">
                {/* Stripe */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#635BFF] p-2">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-white">
                        <path
                          fill="currentColor"
                          d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.613 6.09 1.042l.89-5.494C18.252.563 15.697 0 12.165 0 9.667 0 7.589.563 6.104 1.645 4.62 2.727 3.8 4.42 3.8 6.741c0 3.398 2.33 4.917 6.126 6.108 2.439.831 3.244 1.426 3.244 2.409 0 .908-.77 1.426-2.077 1.426-1.901 0-4.515-.639-6.402-1.49l-.89 5.494c1.901.831 4.91 1.49 8.347 1.49 2.674 0 4.91-.563 6.395-1.645 1.484-1.082 2.33-2.775 2.33-5.096 0-3.398-2.33-4.917-6.897-6.287z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Stripe</h3>
                      <p className="text-sm text-gray-500">
                        Process credit card payments securely
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">Enable</span>
                    </div>
                    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Connect
                    </button>
                  </div>
                </div>

                {/* PayPal */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#003087] p-2">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-white">
                        <path
                          fill="currentColor"
                          d="M20.067 8.478c.492.315.844.825.844 1.441 0 1.192-.964 2.156-2.156 2.156h-2.531l-.315 2.156h4.687l-.315 2.156H15.38l-.315 2.156H13.38l.315-2.156H9.38l-.315 2.156H7.38l.315-2.156h-2.53c-1.192 0-2.156-.964-2.156-2.156 0-.616.352-1.126.844-1.441-.492-.315-.844-.825-.844-1.441 0-1.192.964-2.156 2.156-2.156h2.531l.315-2.156H4.38l.315-2.156h4.687l.315-2.156h1.688l-.315 2.156h4.316l.315-2.156h1.688l-.315 2.156h2.53c1.192 0 2.156.964 2.156 2.156 0 .616-.352 1.126-.844 1.441z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">PayPal</h3>
                      <p className="text-sm text-gray-500">
                        Send and receive payments globally
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">Enable</span>
                    </div>
                    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Connect
                    </button>
                  </div>
                </div>

                {/* UPI */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#2D4B9A] p-2">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-white">
                        <path
                          fill="currentColor"
                          d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.24 16.182h-2.474l2.474-7.182H7.76l.825-2.727h6.474l-2.474 7.182h2.474l-.825 2.727z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">UPI</h3>
                      <p className="text-sm text-gray-500">
                        Instant bank transfers in India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">Enable</span>
                    </div>
                    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Connect
                    </button>
                  </div>
                </div>

                {/* Apple Pay */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-black p-2">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-white">
                        <path
                          fill="currentColor"
                          d="M17.285 7.334c-.833 1.054-2.115 1.875-3.333 1.875-1.218 0-2.5-.821-3.333-1.875C9.785 6.28 9 4.887 9 3.333 9 1.779 10.115 0 12 0s3 1.779 3 3.333c0 1.554-.785 2.947-1.715 4.001zM12 9.999c2.5 0 4.5 2.015 4.5 4.5 0 2.486-2 4.501-4.5 4.501s-4.5-2.015-4.5-4.501c0-2.485 2-4.5 4.5-4.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Apple Pay</h3>
                      <p className="text-sm text-gray-500">
                        Seamless payments on Apple devices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">Enable</span>
                    </div>
                    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Connect
                    </button>
                  </div>
                </div>

                {/* Google Pay */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white p-2 shadow-sm">
                      <svg viewBox="0 0 24 24" className="h-8 w-8">
                        <path
                          fill="#4285F4"
                          d="M22.5 12c0-5.799-4.701-10.5-10.5-10.5S1.5 6.201 1.5 12s4.701 10.5 10.5 10.5S22.5 17.799 22.5 12zm-10.5 6c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Google Pay</h3>
                      <p className="text-sm text-gray-500">
                        Fast checkout with Google Pay
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">Enable</span>
                    </div>
                    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Connect
                    </button>
                  </div>
                </div>

                {/* MetaMask */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#F6851B] p-2">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-white">
                        <path
                          fill="currentColor"
                          d="M21.315 3L12.72 9.786l1.598-3.775L21.315 3zM2.685 3l6.935 3.989-1.56 3.775L2.685 3zm18.63 14.259l-1.834-8.588-6.937 3.988 6.937 3.988-1.834 8.588L12.72 20.97l-4.927 4.265-1.834-8.588 6.937-3.988-6.937-3.988L7.793 0 12.72 4.265 17.647 0l1.834 8.588-6.937 3.988 6.937 3.988z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">MetaMask</h3>
                      <p className="text-sm text-gray-500">
                        Cryptocurrency payments with MetaMask
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">Enable</span>
                    </div>
                    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Downloads */}
            <div id="downloads" className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900">Purchased Datasets</h2>
              <div className="mt-4 space-y-4">
                {(() => {
                  const [datasets, setDatasets] = useState<string[]>([]);
                  
                  useEffect(() => {
                    const purchased = localStorage.getItem('purchased_datasets');
                    if (purchased) {
                      setDatasets(JSON.parse(purchased));
                    }
                  }, []);

                  return datasets.map((datasetId: string) => {
                    const dataset = {
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
                    }[datasetId];

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
                              // In production, this would trigger actual download
                              alert('Download started! Check your downloads folder.');
                            }}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                          >
                            Download Dataset
                          </button>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Publications */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Publications
                </h2>
                <button
                  onClick={handleAddPublication}
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add Publication
                </button>
              </div>
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div key={pub.id} className="grid gap-4 rounded-lg border p-4 md:grid-cols-3">
                    <input
                      placeholder="Publication title"
                      className="rounded-md border border-gray-300 px-3 py-2"
                      value={pub.title}
                      onChange={(e) =>
                        setPublications(
                          publications.map((p) =>
                            p.id === pub.id ? { ...p, title: e.target.value } : p
                          )
                        )
                      }
                    />
                    <input
                      placeholder="Journal/Conference"
                      className="rounded-md border border-gray-300 px-3 py-2"
                      value={pub.journal}
                      onChange={(e) =>
                        setPublications(
                          publications.map((p) =>
                            p.id === pub.id ? { ...p, journal: e.target.value } : p
                          )
                        )
                      }
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Year"
                        className="w-24 rounded-md border border-gray-300 px-3 py-2"
                        value={pub.year}
                        onChange={(e) =>
                          setPublications(
                            publications.map((p) =>
                              p.id === pub.id ? { ...p, year: e.target.value } : p
                            )
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          setPublications(publications.filter((p) => p.id !== pub.id))
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

const STEPS = [
  "Property type",
  "Location",
  "Basics",
  "Amenities",
  "Photos",
  "Title & Description",
  "Pricing",
  "Cancellation",
  "Review & Publish",
];

const PROPERTY_TYPES = [
  { label: "Villa", emoji: "🏛️", value: "VILLA" },
  { label: "Apartment", emoji: "🏢", value: "APARTMENT" },
  { label: "Cabin", emoji: "🏕️", value: "CABIN" },
  { label: "Treehouse", emoji: "🌲", value: "TREEHOUSE" },
  { label: "Beachfront", emoji: "🏖️", value: "BEACHFRONT" },
  { label: "Mansion", emoji: "🏰", value: "MANSION" },
  { label: "Tiny home", emoji: "🏠", value: "TINY_HOME" },
  { label: "Boat", emoji: "⛵", value: "BOAT" },
];

const AMENITIES = [
  { label: "Wi-Fi", value: "WIFI", emoji: "📡" },
  { label: "Pool", value: "POOL", emoji: "🏊" },
  { label: "Hot tub", value: "HOT_TUB", emoji: "♨️" },
  { label: "Kitchen", value: "KITCHEN", emoji: "🍳" },
  { label: "Parking", value: "PARKING", emoji: "🚗" },
  { label: "Gym", value: "GYM", emoji: "💪" },
  { label: "Pets allowed", value: "PET_FRIENDLY", emoji: "🐾" },
  { label: "Air conditioning", value: "AIR_CONDITIONING", emoji: "❄️" },
  { label: "Fireplace", value: "FIREPLACE", emoji: "🔥" },
  { label: "Balcony", value: "BALCONY", emoji: "🏙️" },
  { label: "BBQ grill", value: "BBQ_GRILL", emoji: "🍖" },
  { label: "Workspace", value: "WORKSPACE", emoji: "💻" },
];

export default function NewListingPage() {
  const [step, setStep] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    propertyType: "",
    address: "",
    city: "",
    state: "",
    country: "",
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [] as string[],
    images: [] as string[],
    title: "",
    description: "",
    pricePerNight: "",
    cleaningFee: "",
    cancellationPolicy: "MODERATE",
    instantBook: false,
  });

  const progress = ((step + 1) / STEPS.length) * 100;

  const toggleAmenity = (val: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(val)
        ? f.amenities.filter((a) => a !== val)
        : [...f.amenities, val],
    }));
  };

  const Counter = ({
    label,
    field,
    min = 0,
  }: {
    label: string;
    field: keyof typeof form;
    min?: number;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            setForm((f) => ({
              ...f,
              [field]: Math.max(min, (f[field] as number) - 1),
            }))
          }
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors text-lg font-medium"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold">
          {form[field] as number}
        </span>
        <button
          onClick={() =>
            setForm((f) => ({ ...f, [field]: (f[field] as number) + 1 }))
          }
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors text-lg font-medium"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="container max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="text-sm font-semibold">{STEPS[step]}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#FF385C] to-[#E61E4D] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 0: Property type */}
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  What type of property?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Choose the category that best describes your space.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PROPERTY_TYPES.map((pt) => (
                    <button
                      key={pt.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, propertyType: pt.value }))
                      }
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:border-primary/50 ${
                        form.propertyType === pt.value
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <span className="text-3xl">{pt.emoji}</span>
                      <span className="text-xs font-medium text-center">
                        {pt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Location */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Where is it located?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your exact address is only shared after booking confirmation.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Street address
                    </label>
                    <Input
                      placeholder="123 Ocean Drive"
                      value={form.address}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, address: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        City
                      </label>
                      <Input
                        placeholder="Santorini"
                        value={form.city}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, city: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        State / Region
                      </label>
                      <Input
                        placeholder="South Aegean"
                        value={form.state}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, state: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Country
                    </label>
                    <Input
                      placeholder="Greece"
                      value={form.country}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, country: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Basics */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Property basics</h2>
                <p className="text-muted-foreground mb-6">
                  Tell guests about the size of your space.
                </p>
                <div className="border border-border rounded-xl px-4">
                  <Counter label="Maximum guests" field="maxGuests" min={1} />
                  <Counter label="Bedrooms" field="bedrooms" />
                  <Counter label="Beds" field="beds" min={1} />
                  <Counter label="Bathrooms" field="bathrooms" />
                </div>
              </div>
            )}

            {/* Step 3: Amenities */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  What amenities do you offer?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Select everything that applies.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AMENITIES.map((a) => (
                    <button
                      key={a.value}
                      onClick={() => toggleAmenity(a.value)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left ${
                        form.amenities.includes(a.value)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <span>{a.emoji}</span>
                      <span className="text-sm font-medium">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Add photos</h2>
                <p className="text-muted-foreground mb-6">
                  Listings with great photos get 40% more bookings. Add at least 3.
                </p>

                <UploadDropzone
                  endpoint="listingImages"
                  onClientUploadComplete={(res) => {
                    const urls = res.map((f) => f.ufsUrl);
                    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
                  }}
                  onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
                  className="ut-label:text-foreground ut-allowed-content:text-muted-foreground ut-button:bg-primary ut-button:ut-readying:bg-primary/80"
                />

                {form.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {form.images.map((url, i) => (
                      <div key={url} className="relative aspect-square rounded-xl overflow-hidden group">
                        <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" />
                        <button
                          onClick={() => setForm((prev) => ({ ...prev, images: prev.images.filter((_, j) => j !== i) }))}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3.5 w-3.5 text-white" />
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-1.5 left-1.5 text-xs bg-black/60 text-white px-1.5 py-0.5 rounded">Cover</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Title & Description */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Name your listing
                </h2>
                <p className="text-muted-foreground mb-6">
                  A great title and description attract more guests.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">Title</label>
                      <span className="text-xs text-muted-foreground">
                        {form.title.length}/100
                      </span>
                    </div>
                    <Input
                      placeholder="Stunning cliffside villa with infinity pool"
                      value={form.title}
                      maxLength={100}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, title: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">Description</label>
                      <span className="text-xs text-muted-foreground">
                        {form.description.length}/5000
                      </span>
                    </div>
                    <textarea
                      placeholder="Describe your space, the neighbourhood, and what makes it special..."
                      value={form.description}
                      maxLength={5000}
                      rows={6}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Pricing */}
            {step === 6 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Set your price</h2>
                <p className="text-muted-foreground mb-6">
                  You can always adjust this later.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Price per night ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="250"
                      value={form.pricePerNight}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          pricePerNight: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Cleaning fee ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="75"
                      value={form.cleaningFee}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          cleaningFee: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div>
                      <p className="font-medium text-sm">Instant booking</p>
                      <p className="text-xs text-muted-foreground">
                        Guests can book without waiting for approval
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          instantBook: !f.instantBook,
                        }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors ${
                        form.instantBook ? "bg-primary" : "bg-muted"
                      } relative`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                          form.instantBook ? "left-6" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Cancellation */}
            {step === 7 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Cancellation policy
                </h2>
                <p className="text-muted-foreground mb-6">
                  Choose the policy that works best for you.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      value: "FLEXIBLE",
                      label: "Flexible",
                      desc: "Full refund 1 day prior to arrival",
                    },
                    {
                      value: "MODERATE",
                      label: "Moderate",
                      desc: "Full refund 5 days prior to arrival",
                    },
                    {
                      value: "STRICT",
                      label: "Strict",
                      desc: "50% refund up until 1 week prior",
                    },
                  ].map((policy) => (
                    <button
                      key={policy.value}
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          cancellationPolicy: policy.value,
                        }))
                      }
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        form.cancellationPolicy === policy.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <p className="font-semibold text-sm">{policy.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {policy.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Review & Publish */}
            {step === 8 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF385C] to-[#E61E4D] flex items-center justify-center mx-auto mb-5 shadow-xl shadow-primary/30">
                  <Check className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Ready to go live!
                </h2>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                  Your listing looks great. Publish it to start receiving
                  bookings from travelers worldwide.
                </p>

                {/* Summary */}
                <div className="text-left border border-border rounded-xl p-4 mb-6 space-y-2">
                  {[
                    {
                      label: "Type",
                      value: form.propertyType || "Not set",
                    },
                    {
                      label: "Location",
                      value:
                        [form.city, form.country].filter(Boolean).join(", ") ||
                        "Not set",
                    },
                    {
                      label: "Guests",
                      value: `${form.maxGuests} max`,
                    },
                    {
                      label: "Price",
                      value: form.pricePerNight
                        ? `$${form.pricePerNight}/night`
                        : "Not set",
                    },
                    {
                      label: "Cancellation",
                      value: form.cancellationPolicy,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={publishing}
                  onClick={async () => {
                    setPublishing(true);
                    try {
                      const res = await fetch("/api/listings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          ...form,
                          pricePerNight: parseFloat(form.pricePerNight) || 0,
                          cleaningFee: parseFloat(form.cleaningFee) || 0,
                          serviceFee: 0,
                          zipCode: "00000",
                          latitude: 0,
                          longitude: 0,
                          beds: form.beds,
                        }),
                      });
                      if (!res.ok) {
                        const err = await res.json();
                        alert(err.error ?? "Failed to publish listing");
                        return;
                      }
                      const listing = await res.json();
                      router.push(`/listings/${listing.slug}`);
                    } catch {
                      alert("Something went wrong. Please try again.");
                    } finally {
                      setPublishing(false);
                    }
                  }}
                >
                  {publishing ? "Publishing..." : "Publish listing"}
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < STEPS.length - 1 && (
            <Button
              variant="gradient"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

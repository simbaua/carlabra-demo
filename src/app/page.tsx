"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { AdminView } from "@/components/AdminView";
import { EstimateForm } from "@/components/EstimateForm";
import { Hero } from "@/components/Hero";
import type { EstimateInput, PriceRange, SavedRequest } from "@/lib/types";

const storageKey = "paintRepairEstimateRequests";

export default function Home() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [requests, setRequests] = useState<SavedRequest[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    try {
      if (saved) {
        setRequests(JSON.parse(saved) as SavedRequest[]);
      }
    } catch {
      setRequests([]);
    }
  }, []);

  function persistRequests(nextRequests: SavedRequest[]) {
    setRequests(nextRequests);
    window.localStorage.setItem(storageKey, JSON.stringify(nextRequests));
  }

  function handleSaveRequest(estimate: EstimateInput, priceRange: PriceRange) {
    const request: SavedRequest = {
      ...estimate,
      id: crypto.randomUUID(),
      priceRange,
      date: new Date().toISOString(),
    };
    persistRequests([request, ...requests]);
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <Hero onStart={scrollToForm} />
      <section className="bg-asphalt px-5 py-12 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl border-y border-white/10 py-10">
          <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet">Precision finish</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">About CarLabra</h2>
            </div>
            <p className="max-w-4xl text-base leading-8 text-steel sm:text-lg">
              CarLabra is a professional auto body and paint workshop with over 5 years of experience. We
              specialize in high-quality paint restoration, dent repair, and precise color matching using modern
              spectrometer technology. Our goal is to deliver factory-level finish and fast turnaround for every
              client.
            </p>
          </div>
        </div>
      </section>
      <div ref={formRef}>
        <EstimateForm onSaveRequest={handleSaveRequest} />
      </div>

      <section className="bg-[#f4f6f8] px-5 pb-16 text-asphalt sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheckIcon className="mt-1 h-6 w-6 shrink-0 text-ember" />
              <div>
                <p className="font-black">Workshop lead dashboard</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Review saved local requests from this browser session.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAdmin((current) => !current)}
              className="min-h-11 w-full border border-asphalt px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-asphalt transition hover:bg-asphalt hover:text-white sm:w-auto"
            >
              Admin view
            </button>
          </div>

          {showAdmin ? <AdminView requests={requests} onClear={() => persistRequests([])} /> : null}
        </div>
      </section>
    </main>
  );
}

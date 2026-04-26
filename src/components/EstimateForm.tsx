"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { PhotoIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { calculatePriceRange, damagedParts, damageTypes, extraOptions } from "@/lib/pricing";
import type { DamageId, EstimateInput, ExtraOptionId, PartId, PriceRange } from "@/lib/types";
import { PriceResult } from "./PriceResult";

type EstimateFormProps = {
  onSaveRequest: (estimate: EstimateInput, priceRange: PriceRange) => void;
};

const initialPart: PartId = "front_bumper";
const initialDamage: DamageId = "light_scratch";

export function EstimateForm({ onSaveRequest }: EstimateFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [car, setCar] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [part, setPart] = useState<PartId>(initialPart);
  const [damage, setDamage] = useState<DamageId>(initialDamage);
  const [extras, setExtras] = useState<ExtraOptionId[]>([]);
  const [estimate, setEstimate] = useState<EstimateInput | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, 3);
    setPhotos(files.map((file) => file.name));
  }

  function toggleExtra(option: ExtraOptionId) {
    setExtras((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    const nextPhone = phone.trim();
    const nextCar = car.trim();

    if (!nextName || !nextPhone || !nextCar || !part || !damage) {
      setEstimate(null);
      setPriceRange(null);
      setSuccessMessage("");
      setFormMessage("Please select required options");
      return;
    }

    setIsCalculating(true);
    setFormMessage("");
    setSuccessMessage("");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const nextEstimate: EstimateInput = {
      name: nextName,
      phone: nextPhone,
      email: email.trim() || undefined,
      car: nextCar,
      photos,
      part,
      damage,
      extras,
    };
    const nextPriceRange = calculatePriceRange(nextEstimate);
    setIsCalculating(false);

    if (!nextPriceRange) {
      setEstimate(null);
      setPriceRange(null);
      setFormMessage("Please select required options");
      return;
    }

    setEstimate(nextEstimate);
    setPriceRange(nextPriceRange);
  }

  function handleSendRequest() {
    if (!estimate || !priceRange) {
      return;
    }
    onSaveRequest(estimate, priceRange);
    setSuccessMessage("Request sent successfully. We will contact you shortly.");
  }

  return (
    <section id="estimate-form" className="bg-[#f4f6f8] px-5 py-16 text-asphalt sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-ember">Estimate form</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Tell us what needs paint repair
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Share the essentials and upload clear damage photos. The estimate updates after you calculate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border border-black/10 bg-white p-5 shadow-glow sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Customer name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-h-12 border border-slate-300 bg-white px-3 text-base font-normal text-asphalt outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20"
                placeholder="Alex Morgan"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Phone number
              <input
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="min-h-12 border border-slate-300 bg-white px-3 text-base font-normal text-asphalt outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20"
                placeholder="+1 555 012 4580"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Email optional
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-12 border border-slate-300 bg-white px-3 text-base font-normal text-asphalt outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20"
                placeholder="alex@example.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Car brand/model
              <input
                required
                value={car}
                onChange={(event) => setCar(event.target.value)}
                className="min-h-12 border border-slate-300 bg-white px-3 text-base font-normal text-asphalt outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20"
                placeholder="BMW 320i"
              />
            </label>
          </div>

          <label className="mt-5 flex min-h-32 cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-slate-400 bg-slate-50 px-4 py-6 text-center transition hover:border-ember hover:bg-orange-50">
            <PhotoIcon className="h-8 w-8 text-ember" />
            <span className="text-sm font-bold">Upload up to 3 photos</span>
            <span className="text-xs text-slate-500">
              {photos.length ? photos.join(", ") : "JPG or PNG photos of the damaged area"}
            </span>
            <input type="file" accept="image/*" multiple onChange={handlePhotoChange} className="sr-only" />
          </label>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Select damaged part
              <select
                value={part}
                required
                onChange={(event) => setPart(event.target.value as PartId)}
                className="min-h-12 border border-slate-300 bg-white px-3 text-base font-normal text-asphalt outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20"
              >
                {damagedParts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Select damage type
              <select
                value={damage}
                required
                onChange={(event) => setDamage(event.target.value as DamageId)}
                className="min-h-12 border border-slate-300 bg-white px-3 text-base font-normal text-asphalt outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20"
              >
                {damageTypes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="mt-5">
            <legend className="mb-3 flex items-center gap-2 text-sm font-bold">
              <WrenchScrewdriverIcon className="h-5 w-5 text-ember" />
              Extra options
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {extraOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex min-h-12 cursor-pointer items-center gap-3 border border-slate-300 px-3 text-sm font-semibold transition has-[:checked]:border-ember has-[:checked]:bg-orange-50"
                >
                  <input
                    type="checkbox"
                    checked={extras.includes(option.id)}
                    onChange={() => toggleExtra(option.id)}
                    className="h-4 w-4 accent-ember"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          {formMessage ? (
            <p className="mt-5 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{formMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isCalculating}
            className="mt-6 min-h-12 w-full bg-ember px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#ff6a36] focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 disabled:cursor-wait disabled:opacity-75"
          >
            {isCalculating ? "Calculating..." : "Calculate estimate"}
          </button>
        </form>

        <div className="lg:col-start-2">
          {estimate && priceRange ? (
            <PriceResult
              estimate={estimate}
              priceRange={priceRange}
              onSend={handleSendRequest}
              successMessage={successMessage}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

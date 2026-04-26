"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { formatCurrency, getDamageLabel, getExtraLabel, getPartLabel } from "@/lib/pricing";
import type { SavedRequest } from "@/lib/types";

type AdminViewProps = {
  requests: SavedRequest[];
  onClear: () => void;
};

export function AdminView({ requests, onClear }: AdminViewProps) {
  return (
    <section className="mt-5 border border-black/10 bg-asphalt p-5 text-white sm:p-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-ember">Admin view</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">Saved requests</h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={!requests.length}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-white/15 px-4 py-2 text-sm font-bold text-white transition hover:border-ember hover:text-ember disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          <TrashIcon className="h-5 w-5" />
          Clear all requests
        </button>
      </div>

      {requests.length ? (
        <div className="mt-5 grid gap-4">
          {requests.map((request) => (
            <article key={request.id} className="border border-white/10 bg-white/[0.06] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-black text-white">{request.name}</h3>
                  <p className="mt-1 text-sm text-slate-300">{new Date(request.date).toLocaleString()}</p>
                </div>
                <p className="text-2xl font-black text-white">{formatPriceRange(request)}</p>
              </div>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <Info label="Phone" value={request.phone} />
                <Info label="Email" value={request.email || "Not provided"} />
                <Info label="Car brand/model" value={request.car} />
                <Info label="Selected part" value={getPartLabel(request.part)} />
                <Info label="Damage type" value={getDamageLabel(request.damage)} />
                <Info
                  label="Extra options"
                  value={request.extras.length ? request.extras.map((extra) => getExtraLabel(extra)).join(", ") : "None"}
                />
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 border border-white/10 bg-white/5 px-5 py-8 text-slate-300">
          No saved requests yet
        </div>
      )}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</dt>
      <dd className="mt-1 font-semibold text-white">{value}</dd>
    </div>
  );
}

function formatPriceRange(request: SavedRequest) {
  const min = request.priceRange?.min;
  const max = request.priceRange?.max;

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return "Please select required options";
  }

  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}

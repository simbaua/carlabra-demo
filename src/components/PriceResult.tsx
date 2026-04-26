import { ClockIcon, ClipboardDocumentCheckIcon, PaperAirplaneIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { formatCurrency, getDamageLabel, getExtraLabel, getPartLabel } from "@/lib/pricing";
import type { EstimateInput, PriceRange } from "@/lib/types";

type PriceResultProps = {
  estimate: EstimateInput;
  priceRange: PriceRange;
  onSend: () => void;
  successMessage: string;
};

export function PriceResult({ estimate, priceRange, onSend, successMessage }: PriceResultProps) {
  return (
    <section className="border border-black/10 bg-white p-5 text-asphalt shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-ember">Estimated price range</p>
      <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
        <p className="text-4xl font-black leading-tight tracking-tight text-asphalt sm:text-5xl">
          {formatCurrency(priceRange.min)} – {formatCurrency(priceRange.max)}
        </p>
      </div>

      <div className="mt-6 grid gap-3 border-t border-slate-200 pt-5 text-sm text-slate-700 sm:grid-cols-2">
        <p>
          <span className="font-bold text-asphalt">Car:</span> {estimate.car}
        </p>
        <p>
          <span className="font-bold text-asphalt">Part:</span> {getPartLabel(estimate.part)}
        </p>
        <p>
          <span className="font-bold text-asphalt">Damage:</span> {getDamageLabel(estimate.damage)}
        </p>
        <p>
          <span className="font-bold text-asphalt">Extras:</span>{" "}
          {estimate.extras.length ? estimate.extras.map((extra) => getExtraLabel(extra)).join(", ") : "None"}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { icon: ClockIcon, label: "Estimate in 1 minute" },
          { icon: ClipboardDocumentCheckIcon, label: "Final price confirmed after inspection" },
          { icon: ShieldCheckIcon, label: "No obligation request" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 bg-slate-100 px-3 py-3 text-sm font-bold text-slate-700">
            <Icon className="h-5 w-5 shrink-0 text-ember" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 border-l-4 border-ember bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
        This is an approximate estimate. Final price is confirmed after physical inspection.
      </p>

      <button
        type="button"
        onClick={onSend}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-asphalt px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-graphite focus:outline-none focus:ring-2 focus:ring-asphalt focus:ring-offset-2"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
        Send request
      </button>

      {successMessage ? (
        <p className="mt-4 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{successMessage}</p>
      ) : null}
    </section>
  );
}

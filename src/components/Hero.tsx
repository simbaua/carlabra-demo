import Image from "next/image";
import {
  ArrowRightIcon,
  CheckBadgeIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

type HeroProps = {
  onStart: () => void;
};

const trustBadges = [
  "5+ years experience",
  "Certified paint specialists",
  "Precision color matching (spectrometer)",
];

const services = ["Full body repaint", "Scratch & dent repair", "Panel restoration", "Paint correction & polishing"];

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative min-h-[94svh] overflow-hidden bg-asphalt">
      <Image
        src="/images/paint-repair-hero.png"
        alt="Auto body paint repair workshop with a car panel under inspection"
        fill
        priority
        className="object-cover object-center opacity-78"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0B0B0B_0%,rgba(11,11,11,0.94)_34%,rgba(11,11,11,0.36)_72%,rgba(11,11,11,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(124,58,237,0.34),transparent_32rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-asphalt to-transparent" />

      <div className="relative mx-auto flex min-h-[94svh] w-full max-w-7xl items-center px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 border border-violet/40 bg-violet/15 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
            <SparklesIcon className="h-4 w-4 text-ember" />
            CarLabra paint & body repair
          </div>

          <h1 className="text-balance text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            CarLabra — Professional Car Paint & Body Repair
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel sm:text-xl">
            Get an accurate repair estimate in under 60 seconds. 5+ years of experience, certified technicians,
            and precision paint matching using spectrometer technology.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="flex min-h-14 items-center gap-2 border border-white/12 bg-white/8 px-3 py-3 text-sm font-bold text-white backdrop-blur"
              >
                <CheckBadgeIcon className="h-5 w-5 shrink-0 text-violet" />
                <span>{badge}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 border-l-2 border-violet bg-black/28 px-4 py-4 backdrop-blur">
            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-steel">
              <WrenchScrewdriverIcon className="h-4 w-4 text-ember" />
              Services
            </div>
            <div className="grid gap-2 text-sm font-semibold text-white sm:grid-cols-2">
              {services.map((service) => (
                <div key={service} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-ember" />
                  {service}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-ember px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_22px_70px_rgba(249,115,22,0.28)] transition hover:bg-[#fb8332] focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-asphalt sm:w-auto sm:min-w-72"
          >
            Get your estimate
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

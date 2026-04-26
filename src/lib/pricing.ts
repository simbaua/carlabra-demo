import type {
  DamageId,
  DamageType,
  DamagedPart,
  EstimateInput,
  ExtraOption,
  ExtraOptionId,
  PartId,
  PriceRange,
} from "./types";

type Option<TId extends string, TLabel extends string> = {
  id: TId;
  label: TLabel;
};

export const damagedParts: Option<PartId, DamagedPart>[] = [
  { id: "front_bumper", label: "Front bumper" },
  { id: "rear_bumper", label: "Rear bumper" },
  { id: "front_door", label: "Front door" },
  { id: "rear_door", label: "Rear door" },
  { id: "front_fender", label: "Front fender" },
  { id: "rear_quarter_panel", label: "Rear quarter panel" },
  { id: "hood", label: "Hood" },
  { id: "trunk", label: "Trunk" },
  { id: "side_mirror", label: "Side mirror" },
  { id: "other", label: "Other" },
];

export const damageTypes: Option<DamageId, DamageType>[] = [
  { id: "light_scratch", label: "Light scratch" },
  { id: "deep_scratch", label: "Deep scratch" },
  { id: "dent", label: "Dent" },
  { id: "crack", label: "Crack" },
  { id: "paint_peeling", label: "Paint peeling" },
  { id: "full_repaint", label: "Full repaint" },
];

export const extraOptions: Option<ExtraOptionId, ExtraOption>[] = [
  { id: "polishing", label: "Needs polishing" },
  { id: "primer", label: "Needs primer" },
  { id: "urgent", label: "Urgent job" },
  { id: "metallic_pearl", label: "Metallic / pearl paint" },
];

export const basePrices: Record<PartId, number> = {
  front_bumper: 300,
  rear_bumper: 300,
  front_door: 420,
  rear_door: 400,
  front_fender: 350,
  rear_quarter_panel: 500,
  hood: 500,
  trunk: 450,
  side_mirror: 180,
  other: 300,
};

export const damageModifiers: Record<DamageId, number> = {
  light_scratch: 0,
  deep_scratch: 120,
  dent: 180,
  crack: 220,
  paint_peeling: 150,
  full_repaint: 250,
};

const fixedExtraModifiers: Partial<Record<ExtraOptionId, number>> = {
  polishing: 60,
  primer: 80,
  metallic_pearl: 100,
};

const legacyPartIds: Record<DamagedPart, PartId> = Object.fromEntries(
  damagedParts.map(({ id, label }) => [label, id]),
) as Record<DamagedPart, PartId>;

const legacyDamageIds: Record<DamageType, DamageId> = Object.fromEntries(
  damageTypes.map(({ id, label }) => [label, id]),
) as Record<DamageType, DamageId>;

const legacyExtraIds: Record<ExtraOption, ExtraOptionId> = Object.fromEntries(
  extraOptions.map(({ id, label }) => [label, id]),
) as Record<ExtraOption, ExtraOptionId>;

export function normalizePartId(value: string): PartId | null {
  return isPartId(value) ? value : legacyPartIds[value as DamagedPart] ?? null;
}

export function normalizeDamageId(value: string): DamageId | null {
  return isDamageId(value) ? value : legacyDamageIds[value as DamageType] ?? null;
}

export function normalizeExtraId(value: string): ExtraOptionId | null {
  return isExtraOptionId(value) ? value : legacyExtraIds[value as ExtraOption] ?? null;
}

export function getPartLabel(value: string): string {
  const id = normalizePartId(value);
  return damagedParts.find((part) => part.id === id)?.label ?? value;
}

export function getDamageLabel(value: string): string {
  const id = normalizeDamageId(value);
  return damageTypes.find((damage) => damage.id === id)?.label ?? value;
}

export function getExtraLabel(value: string): string {
  const id = normalizeExtraId(value);
  return extraOptions.find((option) => option.id === id)?.label ?? value;
}

export function calculatePriceRange(input: Pick<EstimateInput, "part" | "damage" | "extras">): PriceRange | null {
  const partId = normalizePartId(input.part);
  const damageId = normalizeDamageId(input.damage);
  const extraIds = input.extras.map((extra) => normalizeExtraId(extra)).filter(Boolean) as ExtraOptionId[];

  if (!partId || !damageId) {
    return null;
  }

  // Pricing starts with stable IDs for the panel and damage type, then adds
  // fixed extras before applying the urgency percentage and estimate range.
  const fixedTotal =
    basePrices[partId] +
    damageModifiers[damageId] +
    extraIds.reduce((total, option) => total + (fixedExtraModifiers[option] ?? 0), 0);

  const calculated = extraIds.includes("urgent") ? fixedTotal * 1.2 : fixedTotal;

  if (!Number.isFinite(calculated)) {
    return null;
  }

  return {
    calculated: Math.round(calculated),
    min: Math.round(calculated * 0.85),
    max: Math.round(calculated * 1.2),
  };
}

export function formatCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }

  return `${new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 0,
  }).format(value)}€`;
}

function isPartId(value: string): value is PartId {
  return damagedParts.some((part) => part.id === value);
}

function isDamageId(value: string): value is DamageId {
  return damageTypes.some((damage) => damage.id === value);
}

function isExtraOptionId(value: string): value is ExtraOptionId {
  return extraOptions.some((option) => option.id === value);
}

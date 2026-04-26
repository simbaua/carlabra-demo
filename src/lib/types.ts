export type PartId =
  | "front_bumper"
  | "rear_bumper"
  | "front_door"
  | "rear_door"
  | "front_fender"
  | "rear_quarter_panel"
  | "hood"
  | "trunk"
  | "side_mirror"
  | "other";

export type DamageId =
  | "light_scratch"
  | "deep_scratch"
  | "dent"
  | "crack"
  | "paint_peeling"
  | "full_repaint";

export type ExtraOptionId = "polishing" | "primer" | "urgent" | "metallic_pearl";

export type DamagedPart =
  | "Front bumper"
  | "Rear bumper"
  | "Front door"
  | "Rear door"
  | "Front fender"
  | "Rear quarter panel"
  | "Hood"
  | "Trunk"
  | "Side mirror"
  | "Other";

export type DamageType =
  | "Light scratch"
  | "Deep scratch"
  | "Dent"
  | "Crack"
  | "Paint peeling"
  | "Full repaint";

export type ExtraOption =
  | "Needs polishing"
  | "Needs primer"
  | "Urgent job"
  | "Metallic / pearl paint";

export type EstimateInput = {
  name: string;
  phone: string;
  email?: string;
  car: string;
  photos: string[];
  part: PartId;
  damage: DamageId;
  extras: ExtraOptionId[];
};

export type PriceRange = {
  calculated: number;
  min: number;
  max: number;
};

export type SavedRequest = EstimateInput & {
  id: string;
  priceRange: PriceRange;
  date: string;
};

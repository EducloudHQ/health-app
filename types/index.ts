import { MouseEventHandler } from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  url: string;
  image: string
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
  city_mpg: number;
  class: String;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: String;
  fuel_type: String;
  highway_mpg: number;
  make: String;
  model: String;
  transmission: String;
  year: number;
}

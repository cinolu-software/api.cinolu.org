export interface IndicatorReport {
  name: string;
  target: number | null;
  achieved: number;
  performance: number;
}

export interface ProgramReport {
  name: string;
  indicators: IndicatorReport[];
  performance: number;
}

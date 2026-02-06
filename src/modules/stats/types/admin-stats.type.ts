export interface IAdminStatsGeneral {
  totalUsers: number;
  totalProjects: number;
  totalEvents: number;
  totalVentures: number;
}

/** Project or event item with participation count for a given year */
export interface IParticipationItem {
  id: string;
  name: string;
  participations: number;
}

/** Subprogram with its projects, events and participation counts */
export interface ISubprogramParticipations {
  id: string;
  name: string;
  participations: number;
  projects: IParticipationItem[];
  events: IParticipationItem[];
}

/** Program with its subprograms and participation counts at each level */
export interface IProgramParticipations {
  id: string;
  name: string;
  participations: number;
  subprograms: ISubprogramParticipations[];
}

export interface IAdminStatsByYear {
  year: number;
  summary: {
    totalProjectParticipations: number;
    totalEventParticipations: number;
    totalParticipations: number;
  };
  detailedParticipations: {
    programs: IProgramParticipations[];
  };
}

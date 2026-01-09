export interface IAdminStats {
  users: {
    total: number;
    byRole: {
      user: number;
      mentor: number;
      staff: number;
      admin: number;
    };
    newLast7Days: number;
    newLast30Days: number;
    withReferrals: number;
  };
  content: {
    ventures: {
      total: number;
      published: number;
      unpublished: number;
    };
    projects: {
      total: number;
      published: number;
      unpublished: number;
      withParticipants: number;
    };
    events: {
      total: number;
      published: number;
      unpublished: number;
      withParticipants: number;
    };
    programs: {
      total: number;
      published: number;
      unpublished: number;
    };
    subprograms: {
      total: number;
      published: number;
      unpublished: number;
    };
    articles: {
      total: number;
      published: number;
      unpublished: number;
      highlighted: number;
    };
    products: {
      total: number;
    };
  };
  engagement: {
    comments: number;
    submissions: number;
    galleries: number;
    tags: number;
  };
  mentors: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  recentActivity: {
    newUsersLast7Days: number;
    newVenturesLast7Days: number;
    newProjectsLast7Days: number;
    newEventsLast7Days: number;
    newArticlesLast7Days: number;
  };
}

export interface IAdminStats {
  users: {
    total: number;
    byRole: {
      user: number;
      mentor: number;
      staff: number;
      admin: number;
    };
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
    };
    events: {
      total: number;
      published: number;
      unpublished: number;
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
    };
  };
  engagement: {
    comments: number;
  };
  mentors: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

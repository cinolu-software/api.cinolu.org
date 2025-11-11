export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Role extends BaseEntity {
  name: string;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  biography?: string;
  phone_number?: string;
  city?: string;
  country?: string;
  gender?: string;
  birth_date?: string;
  google_image?: string;
  profile?: string;
  referral_code?: string;
  referred_by?: User;
  referrals?: User[];
  roles?: Role[];
  participated_projects?: Project[];
  managed_projects?: Project[];
  articles?: Article[];
  comments?: Comment[];
  ventures?: Venture[];
}

// Lightweight user for nested relations
export interface UserSummary {
  id: string;
  name: string;
  email: string;
  profile?: string;
  google_image?: string;
}

export interface ProgramCategory extends BaseEntity {
  name: string;
  programs?: Program[];
}

export interface Indicator extends BaseEntity {
  name: string;
  target?: number;
  year?: number;
  category?: string;
  program?: Program;
  metrics?: Metric[];
}

export interface Program extends BaseEntity {
  name: string;
  slug: string;
  is_highlighted?: boolean;
  logo?: string;
  description: string;
  is_published: boolean;
  subprograms?: Subprogram[];
  category?: ProgramCategory;
  indicators?: Indicator[];
}

export interface Subprogram extends BaseEntity {
  name: string;
  is_highlighted?: boolean;
  slug: string;
  logo?: string;
  description: string;
  is_published: boolean;
  program?: Program;
  projects?: Project[];
  events?: Event[];
}

export interface ProjectCategory extends BaseEntity {
  name: string;
  projects?: Project[];
}

export interface Project extends BaseEntity {
  name: string;
  is_highlighted?: boolean;
  slug: string;
  cover?: string;
  description: string;
  started_at: string;
  ended_at: string;
  is_published: boolean;
  context?: string;
  objectives?: string;
  duration_hours?: number;
  project_manager?: User;
  selection_criteria?: string;
  conclusion?: string;
  program?: Subprogram;
  categories?: ProjectCategory[];
  gallery?: Gallery[];
  metrics?: Metric[];
  participants?: User[];
}

export interface ProjectSummary {
  id: string;
  name: string;
  slug: string;
  cover?: string;
  description: string;
  started_at: string;
  ended_at: string;
  is_published: boolean;
  is_highlighted?: boolean;
}

export interface EventCategory extends BaseEntity {
  name: string;
  events?: Event[];
}

export interface Event extends BaseEntity {
  name: string;
  slug: string;
  is_highlighted?: boolean;
  cover?: string;
  place: string;
  description: string;
  started_at: string;
  ended_at: string;
  is_published: boolean;
  program?: Subprogram;
  categories?: EventCategory[];
  gallery?: Gallery[];
  metrics?: Metric[];
}

export interface EventSummary {
  id: string;
  name: string;
  slug: string;
  cover?: string;
  place: string;
  started_at: string;
  ended_at: string;
  is_published: boolean;
  is_highlighted?: boolean;
}

export interface Metric extends BaseEntity {
  target?: number;
  achieved?: number;
  indicator?: Indicator;
  event?: Event;
  project?: Project;
}

export interface Venture extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  problem_solved: string;
  target_market: string;
  logo?: string;
  cover?: string;
  email?: string;
  phone_number?: string;
  website?: string;
  linkedin_url?: string;
  sector?: string;
  is_published: boolean;
  founded_at?: string;
  location?: string;
  stage?: string;
  owner?: User;
  products?: Product[];
  gallery?: Gallery[];
}

export interface VentureSummary {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  cover?: string;
  sector?: string;
  stage?: string;
  is_published: boolean;
}

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  slug: string;
  venture?: Venture;
  gallery?: Gallery[];
}

export interface Tag extends BaseEntity {
  name: string;
}

export interface Article extends BaseEntity {
  title: string;
  slug: string;
  image?: string;
  is_highlighted?: boolean;
  summary: string;
  content: string;
  published_at?: string;
  tags?: Tag[];
  comments?: Comment[];
  author?: User;
  gallery?: Gallery[];
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  image?: string;
  summary: string;
  published_at?: string;
  is_highlighted?: boolean;
  author?: UserSummary;
  tags?: Tag[];
}

export interface Comment extends BaseEntity {
  content: string;
  article?: Article;
  author?: User;
}

export interface Gallery extends BaseEntity {
  image?: string;
  project?: Project;
  event?: Event;
  product?: Product;
  venture?: Venture;
  article?: Article;
}

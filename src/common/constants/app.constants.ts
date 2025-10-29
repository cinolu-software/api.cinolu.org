export const APP_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 40,
  MAX_PAGE_SIZE: 100,
  SESSION_MAX_AGE: 86400000,
  TOKEN_EXPIRY: {
    ACCESS: '1d',
    REFRESH: '7d',
    PASSWORD_RESET: 15 * 60
  },
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  REFERRAL_CODE_LENGTH: 12
} as const;

export const HTTP_MESSAGES = {
  INVALID_CREDENTIALS: 'Les identifiants saisis sont invalides',
  UNAUTHORIZED: 'Non autorisé',
  FORBIDDEN: 'Accès interdit',
  NOT_FOUND: 'Ressource non trouvée',
  BAD_REQUEST: 'Requête invalide',
  INTERNAL_ERROR: 'Erreur interne du serveur',
  CREATED: 'Créé avec succès',
  UPDATED: 'Mis à jour avec succès',
  DELETED: 'Supprimé avec succès'
} as const;

export const EVENTS = {
  CONTACT_SUPPORT: 'contact.support',
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  PASSWORD_RESET_REQUESTED: 'password.reset.requested',
  PASSWORD_RESET_COMPLETED: 'password.reset.completed'
} as const;

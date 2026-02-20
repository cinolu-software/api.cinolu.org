export enum DeliverableType {
  PICTURE = 'picture',
  LINK = 'link',
  DOCUMENT = 'document'
}

export interface DelivrableParams {
  phaseId: string;
  delivrableId: string;
}

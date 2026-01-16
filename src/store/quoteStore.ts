import { map } from 'nanostores';

export type VehicleSize = 'small' | 'medium' | 'large';
export type VehicleCondition = 'new' | 'good' | 'bad';
export type ServiceType = 'sale' | 'shine' | 'defect';

export const quoteStore = map({
  size: 'medium',
  condition: 'good',
  service: 'shine',
});

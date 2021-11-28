import { createAction, props } from '@ngrx/store';

export const addCustomer = createAction(
  '[Customer] Add Customer',
  (customer: any) => ({customer})
);





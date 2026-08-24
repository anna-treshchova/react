import { calcGuests } from '@/entities/search';

export const selectFormState = (state) => state.formState;
export const selectGuests = (state) => calcGuests(state.formState.guestCategories);
export const selectSearchFormActions = (state) => state.actions;



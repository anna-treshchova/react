import { calcTotalGuests } from '@/shared/lib/guests';

export const selectFormState = (state) => state.formState;
export const selectGuests = (state) => calcTotalGuests(state.formState.guestCategories);
export const selectSearchFormActions = (state) => state.actions;



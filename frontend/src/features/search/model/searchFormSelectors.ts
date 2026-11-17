import { calcGuests } from '@/entities/search';
import type { FormStore } from './useSearchFormStore';

export const selectFormState = (state: FormStore) => state.formState;
export const selectGuests = (state: FormStore) => calcGuests(state.formState.guestCategories);
export const selectSearchFormActions = (state: FormStore) => state.actions;



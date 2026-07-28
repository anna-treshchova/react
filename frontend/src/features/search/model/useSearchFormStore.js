import { create } from 'zustand';
import equal from 'fast-deep-equal';

const initialState = {
    destination: { id: null, label: null },
    guestCategories: { adults: 0, children: 0, infants: 0, pets: 0 },
    dates: [null, null],
    page: 1,
};

export const useSearchFormStore = create((set, get) => ({
    formState: initialState,

    actions: {
        setFormState: (newFormState) => {
            const currentFormState = get().formState;

            if(equal(currentFormState, newFormState)) return;

            set({ formState: newFormState})
        },

        setFields: (key, value) => set((state) => ({
            formState: { ...state.formState, [key]: value },
        })),

        setGuestCategory: (key, value) => set((state) => {
            const { formState }= state;

            const newGuestCategories = {
                ...formState.guestCategories,
                [key]: value
            }

            const { adults, children, infants, pets } = newGuestCategories;

            if (adults === 0 && (children > 0 || infants > 0 || pets > 0 )) {
                newGuestCategories.adults = 1;
            }

            return {
                formState: {
                    ...formState,
                    guestCategories: newGuestCategories,
                }
            };
        }),

        resetFormState: () => set({ formState: initialState }),
    }
}));

export const FORM_FIELDS_CONFIG = {
    destination: {
        label: 'Where',
        scrolledText: 'Anywhere',
        emptySearchText: 'Hotels nearby'
    },
    dates: {
        label: 'When',
        scrolledText: 'Anytime',
        emptySearchText: 'Any week'
    },
    guests: {
        label: 'Who',
        scrolledText: 'Add guests',
        emptySearchText: 'Add guests'
    }
} as const;

export type FormFieldConfig = typeof FORM_FIELDS_CONFIG;

const formFieldLabels = Object.values(FORM_FIELDS_CONFIG).map(field => field.label);

export type FormFieldLabels = typeof formFieldLabels[number];
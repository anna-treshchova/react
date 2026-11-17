export const COUNTRIES_BY_COUNTRY_CODE = {
    US: 'United States',
    UA: 'Ukraine',
    GB: 'United Kingdom',
    FR: 'France',
    DE: 'Germany',
    IT: 'Italy',
    ES: 'Spain',
    CA: 'Canada',
    AU: 'Australia',
} as const;

type CountryCode = keyof typeof COUNTRIES_BY_COUNTRY_CODE;

export const isCountryCode = (code: string): code is CountryCode => {
    return Object.hasOwn(COUNTRIES_BY_COUNTRY_CODE, code);
}
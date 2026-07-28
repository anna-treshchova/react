export const parseLocale = (languageHeader) => {
    if (!languageHeader) return 'en-US';

    return languageHeader
        .split(',')[0]
        .split(';')[0]
        .trim();
}
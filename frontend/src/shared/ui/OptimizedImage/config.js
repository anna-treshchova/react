export const imageSizesConfig = {
    card: [
        '(min-width: 1200px) 216px',  // 216  432  ->  320 / 640
        '(min-width: 992px) 23vw',    // 278  556  ->  320 / 640
        '(min-width: 768px) 31vw',    // 306  612  ->  320 / 640
        '(min-width: 576px) 47vw',    // 360  720  ->  640 / 960
        '92vw'                        // 529  1058 ->  640 / 1200
    ].join(', '),
    wideCard: [
        '(min-width: 1200px) 270px',  // 270  540  ->  320 / 640
        '(min-width: 992px) 23vw',    // 276  552  ->  320 / 640
        '(min-width: 768px) 30vw',    // 298  596  ->  320 / 640
        '(min-width: 576px) 47vw',    // 361  722  ->  640 / 960
        '92vw'                        // 529  1058 ->  640 / 1200
    ].join(', '),
    galleryMain: [
        '(min-width: 1200px) 556px',  // 556  1112  ->  640 / 1200
        '(min-width: 768px) 47vw',    // 564  1128  ->  640 / 1200
        '100vw'                       // 767  1534  ->  960 / 1200 ??
    ].join(', '),
    gallerySecondary: [
        '(min-width: 1200px) 274px',  // 274  548  ->  320 / 640
        '(min-width: 768px) 23vw',    // 276  552  ->  320 / 640
        '100vw'                       // 767  1534  ->  960 / 1200 ??
    ].join(', ')
}
export { default as HotelsPage } from './list/HotelsPage.jsx';
export { default as HotelPage } from './details/HotelPage.jsx';

export { default as hotelsReducer } from  './model/hotelsSlice.js'
export { hotelsLoader, hotelDetailsLoader } from './model/hotelsLoader.js';

export { fetchHotels } from  './model/hotelsThunk.js';


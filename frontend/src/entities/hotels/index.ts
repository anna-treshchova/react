export {
    hotelsApi,
    useGetHotelsQuery,
    useGetHotelDetailsQuery,
    hotelsConfig,

    type HotelsQueryFilters,
    type GetHotelsQueryParams,
    type GetHotelDetailsQueryParams,
    type Hotel,
    type HotelDetails,
    type HotelsResponse,
} from './model';

export { HotelsList, type HotelListProps } from './ui/HotelsList';
export { HotelCard } from './ui/HotelCard';
export { HotelsListSkeleton } from './ui/HotelsListSkeleton';
import { baseApi } from '@/shared/api/baseApi.js';
import { entitiesConfig } from './config.js';

const { VITE_WISHLIST_URL } = import.meta.env;

export const wishlistApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        toggleWishlistItem: builder.mutation({
            query: (itemId) => ({
                url: `${VITE_WISHLIST_URL}/${itemId}`,
                method: 'POST',
            }),
            async onQueryStarted(itemId, { getState, dispatch, queryFulfilled }) {
                const [prefix] = itemId.split('_');
                const config = entitiesConfig[prefix];

                if (!config) return;

                const state = getState();
                const allQueries = state[baseApi.reducerPath].queries || {};

                const patches =[];

                Object.values(allQueries).forEach((endpoint) => {
                    if (config.listEndpoint &&
                        endpoint?.endpointName === config.listEndpoint &&
                        endpoint?.status === 'fulfilled'
                    ) {
                       const patch = dispatch(
                           baseApi.util.updateQueryData(
                               config.listEndpoint,
                               endpoint.originalArgs,
                               (draft) => {
                                   const list = draft?.[config.listKey];
                                   if (Array.isArray(list)) {
                                       const item = list.find(i => i.id === itemId);
                                       if (item) item.favorite = !item.favorite;
                                   }
                               }
                           )
                       );
                       patches.push(patch);
                    }

                    if (config.detailsEndpoint &&
                        endpoint?.endpointName === config.detailsEndpoint &&
                        endpoint?.status === 'fulfilled' &&
                        endpoint.originalArgs === itemId
                    ) {
                        const patch = dispatch(
                            baseApi.util.updateQueryData(
                                config.detailsEndpoint,
                                endpoint.originalArgs,
                                (draft) => {
                                    const item = draft?.[config.detailsKey];
                                    if (item) item.favorite = !item.favorite;
                                }
                            )
                        );
                        patches.push(patch);
                    }

                    if (endpoint?.endpointName === 'getWishlist' &&
                        endpoint?.status === 'fulfilled'
                    ) {
                        const wishlistPatch = dispatch(
                            wishlistApi.util.updateQueryData(
                                'getWishlist',
                                endpoint.originalArgs,
                                (draft) => {
                                    const list = draft?.wishlist;
                                    if (Array.isArray(list)) {
                                        const item = list.find(i => i.id === itemId);
                                        if (item) item.favorite = !item.favorite;
                                    }
                                }
                            )
                        );
                        patches.push(wishlistPatch);
                    }
                })

                try {
                    await queryFulfilled;
                } catch {
                    patches.forEach(patch => patch.undo())
                }
            }
        }),

        getWishlist: builder.query({
            query: () => VITE_WISHLIST_URL
        })
    })
})

export const { useToggleWishlistItemMutation, useGetWishlistQuery } = wishlistApi;

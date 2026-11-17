import { baseApi } from '@/shared/api/baseApi';
import { isRecord } from '@/shared/lib/type-guards';

import { entitiesConfig } from './config';
import type { GetWishlistResponse } from './types';

const { VITE_WISHLIST_URL } = import.meta.env;

type EntityPrefix = keyof typeof entitiesConfig;

const isEntityPrefix = (prefix: string): prefix is EntityPrefix => {
    return Object.hasOwn(entitiesConfig, prefix);
}

type UndoablePatch = {
    undo: () => void;
}

export const wishlistApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        toggleWishlistItem: builder.mutation<void, string>({
            query: (itemId) => ({
                url: `${VITE_WISHLIST_URL}/${itemId}`,
                method: 'POST',
            }),
            async onQueryStarted(itemId, { getState, dispatch, queryFulfilled }) {
                const [prefix] = itemId.split('_');

                if (!isEntityPrefix(prefix)) return;

                const entityConfig = entitiesConfig[prefix];

                if (!entityConfig) return;

                const state = getState();
                const allQueries = state[baseApi.reducerPath].queries || {};

                const patches: UndoablePatch[] = [];

                Object.values(allQueries).forEach((endpoint) => {
                    if (
                        entityConfig.listEndpoint &&
                        endpoint?.endpointName === entityConfig.listEndpoint &&
                        endpoint?.status === 'fulfilled' &&
                        entityConfig.isListArgs(endpoint.originalArgs)
                    ) {

                        const recipe = (draft: unknown) => {
                            if (!isRecord(draft)) return;

                            const list = draft[entityConfig.listKey];

                            if (Array.isArray(list)) {
                                const item = list.find(item => isRecord(item) && item.id === itemId);

                                if (item && typeof item.favorite === 'boolean'){
                                    item.favorite = !item.favorite;
                                }
                            }
                        }

                        const updateAction = entityConfig.updateListCache(endpoint.originalArgs, recipe)

                        if (updateAction) {
                           const patch = dispatch(updateAction);
                           patches.push(patch)
                        }
                    }

                    if (entityConfig.detailsEndpoint &&
                        endpoint?.endpointName === entityConfig.detailsEndpoint &&
                        endpoint?.status === 'fulfilled' &&
                        entityConfig.isDetailsArgs(endpoint.originalArgs)
                    ) {

                        const recipe = (draft: unknown) => {
                            if (!isRecord(draft)) return;

                            const item = draft[entityConfig.detailsKey];

                            if (item && isRecord(item) && typeof item.favorite === 'boolean') {
                                item.favorite = !item.favorite;
                            }
                        }

                        const updateAction = entityConfig.updateDetailsCache(endpoint.originalArgs, recipe);

                        if (updateAction) {
                            const patch = dispatch(updateAction);
                            patches.push(patch)
                        }
                    }

                    if (endpoint?.endpointName === 'getWishlist' &&
                        endpoint?.status === 'fulfilled' &&
                        endpoint.originalArgs === undefined
                    ) {
                        const wishlistPatch = dispatch(
                            wishlistApi.util.updateQueryData(
                                'getWishlist',
                                endpoint.originalArgs,
                                (draft) => {
                                    const list = draft.wishlist;

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

        getWishlist: builder.query<GetWishlistResponse, void>({
            query: () => VITE_WISHLIST_URL
        })
    })
})

export const { useToggleWishlistItemMutation, useGetWishlistQuery } = wishlistApi;



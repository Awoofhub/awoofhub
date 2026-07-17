'use client'
import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useInfiniteQuery } from '@tanstack/react-query';


type GetOffersByUsername = {
    username: string,
    search: string,
    category: string,
    minRating: number,
    createdFrom: string,
    createdTo: string,
    page?: number,
    limit: number,
};

export const getOffersByUsername = ({ username, search, category, minRating, createdFrom, createdTo, page = 1, limit }: GetOffersByUsername): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offersByUsername(username, search, category, minRating, createdFrom, createdTo, page, limit);
};

export const useOffersByUsername = ({ username, search, category, minRating, createdFrom, createdTo, limit = 8 }: GetOffersByUsername) => {

    const { data, isFetching, isLoading, isFetched, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['offers', "username", username, search, category, minRating, createdFrom, createdTo, limit],
        queryFn: ({ pageParam = 1 }) => getOffersByUsername({ username, search, category, minRating, createdFrom, createdTo, page: pageParam, limit }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;

            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: !!username,

    });

    return {
        data,
        isFetching,
        isLoading,
        isFetched,
        fetchNextPage,
        hasNextPage,
        isError,
        error,
        isFetchingNextPage
    };
};

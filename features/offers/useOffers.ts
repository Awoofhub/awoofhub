import { useInfiniteQuery } from '@tanstack/react-query';
import OfferService from '../../services/offer-service';
import { ApiResponse } from '../../types/api-response';
import { Offer } from '../../types/offer';


type GetSearchOffersOptions = {
    search: string,
    category: string,
    minRating: number,
    dealType: string,
    createdFrom: string,
    createdTo: string,
    location: string,
    page?: number,
    limit: number,
};

export const getOffers = ({ search, category, dealType, minRating, createdFrom, createdTo, location, page = 1, limit }: GetSearchOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offers(search, category, dealType, minRating, createdFrom, createdTo, location, page, limit);
};

export const useOffers = ({ search, category, dealType, minRating, createdFrom, createdTo, location, limit = 8 }: GetSearchOffersOptions) => {
    const { data, isFetchingNextPage, isLoading, isFetched, isFetching, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['offers', search, category, dealType, minRating, createdFrom, createdTo, limit],
        queryFn: ({ pageParam = 1 }) => getOffers({ search, category, dealType, minRating, createdFrom, createdTo, location, page: pageParam, limit }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;

            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,

    });

    return {
        data,
        isFetching,
        isLoading,
        fetchNextPage,
        isFetched,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error
    };
};


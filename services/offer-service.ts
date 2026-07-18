import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { CreateOfferData, Offer, UpdateOfferData } from "../types/offer";

async function createOffer(payload: CreateOfferData): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post('/offers/', payload);
  return res;
}

async function offers(search: string, category: string, dealType: string, minRating: number, createdFrom: string, createdTo: string, location: string, page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const params: Record<string, any> = { page, limit };
  if (search) params.search = search;
  if (category) params.category = category;
  if (minRating) params.minRating = minRating;
  if (createdFrom) params.createdFrom = createdFrom;
  if (createdTo) params.createdTo = createdTo;
  if (dealType) params.dealType = dealType;
  if (location) params.location = location;

  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/', { params })

  return res;
}

async function grab(id: string): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post(`/clicks/offer/${id}`)

  return res;
}

async function myOffers(search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get(`/offers/mine`, {
    params: { search, category, minRating, createdFrom, createdTo, page, limit },
  })

  return res;
}

async function offersByUsername(username: string, search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get(`/offers/username/${username}`, {
    params: { search, category, minRating, createdFrom, createdTo, page, limit },
  })

  return res;
}

async function offerById(id: string): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.get(`/offers/${id}`)

  return res;
}

async function randomOffers(): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/random')

  return res;
}

async function updateOffer(id: string, payload: UpdateOfferData): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post(`/offers/${id}`, payload)

  return res;
}

async function deleteOffer(id: string): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post(`/offers/${id}`)

  return res;
}

async function trendingOffers(page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/trending', {
    params: { page, limit },
  })

  return res;
}

async function expiringOffers(page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/expiring', {
    params: { page, limit },
  })

  return res;
}

const OfferService = {
  createOffer,
  offers,
  grab,
  offersByUsername,
  myOffers,
  offerById,
  randomOffers,
  trendingOffers,
  expiringOffers,
  updateOffer,
  deleteOffer,
};

export default OfferService;
import { Offer } from "@/types/offer";
import { differenceInSeconds, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export type OfferVariant =
  | "trending"
  | "expiring"
  | "trending-expiring"
  | "regular";

export function getOfferVariant(offer: Offer): OfferVariant {
  const isTrending = offer.isTrending;
  const daysLeft = differenceInSeconds(parseISO(offer.endDate), new Date());
  const isExpiring = daysLeft >= 0 && daysLeft <= 259200; // 3 days in seconds

  if (isTrending && isExpiring) return "trending-expiring";
  if (isTrending) return "trending";
  if (isExpiring) return "expiring";
  return "regular";
}

export function useOfferCountdown(offer: Offer, variant: OfferVariant) {
  const totalSeconds = Math.max(
    0,
    differenceInSeconds(parseISO(offer.endDate), new Date()),
  );

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [prevTotalSeconds, setPrevTotalSeconds] = useState(totalSeconds);

  if (totalSeconds !== prevTotalSeconds) {
    setPrevTotalSeconds(totalSeconds);
    setSecondsLeft(totalSeconds);
  }

  const hasCountdown =
    variant === "expiring" || variant === "trending-expiring";

  useEffect(() => {
    if (!hasCountdown) return;
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasCountdown, secondsLeft]);

  return { secondsLeft, hasCountdown };
}
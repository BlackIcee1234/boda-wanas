import type { GiftsConfig } from "@/types/site-config";

export function hasVisibleGifts(gifts: GiftsConfig): boolean {
  return gifts.bankTransfer.enabled || gifts.liverpool.enabled || gifts.custom.enabled;
}

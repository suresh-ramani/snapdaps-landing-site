"use client";

import { createContext, useContext } from "react";
import { weddingPool, type PhotoName } from "./photos";

/** The sample event the product cards show: its photos, name and folders. */
export type EventSample = { pool: readonly PhotoName[]; name: string; folders: readonly [string, string, string, string] };

const wedding: EventSample = {
  pool: weddingPool,
  name: "Riya & Arjun’s wedding",
  folders: ["Haldi", "Sangeet", "Wedding", "Reception"],
};

const EventSampleContext = createContext<EventSample>(wedding);

/**
 * Sets the sample event the product cards inside it show: the photos every `PhotoTile` without an
 * explicit `photo` picks from, plus the event name and folders in CreateEventCard, UploadCard and
 * GalleryCard. Use-case pages wrap their content in `<PhotoPool {...eventSamples[PATH]}>`, so the
 * bento, workflow and story cards on the birthday page show a birthday, not a wedding.
 * Outside a provider, cards show the wedding sample.
 */
export function PhotoPool({ children, ...sample }: EventSample & { children: React.ReactNode }) {
  return <EventSampleContext.Provider value={sample}>{children}</EventSampleContext.Provider>;
}

export const useEventSample = () => useContext(EventSampleContext);
export const usePhotoPool = () => useContext(EventSampleContext).pool;

// Os formatadores são criados uma só vez, fora das funções,
// porque criar um Intl.*Format é relativamente caro.

const TIME_ZONE = "Europe/Lisbon";

const priceFormatter = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("pt-PT", {
  timeZone: TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
});

const timeFormatter = new Intl.DateTimeFormat("pt-PT", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
});

/** 4500 -> "45,00 €" */
export function formatPrice(priceCents: number): string {
  return priceFormatter.format(priceCents / 100);
}

/** "2026-11-12T10:00:00Z" -> "quinta-feira, 12 de novembro" (hora de Lisboa) */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** "2026-11-12T10:00:00Z" -> "10:00" (hora de Lisboa) */
export function formatTime(iso: string): string {
  return timeFormatter.format(new Date(iso));
}

/** 45 -> "45 min", 60 -> "1 h", 90 -> "1 h 30 min" */
export function formatDuration(durationMin: number): string {
  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

import type { JobRequest } from "../types";

// Lista fixa de cidades para o filtro. Não a calculo a partir dos pedidos
// para que uma cidade não desapareça do filtro quando se aceitam todos
// os pedidos dela.
export const CITIES = ["Lisboa", "Porto", "Braga", "Coimbra"];

export const jobs: JobRequest[] = [
  {
    id: "1",
    service: "Canalização",
    city: "Porto",
    startsAt: "2026-11-12T10:00:00Z",
    durationMin: 60,
    priceCents: 4500,
    urgent: false,
  },
  {
    id: "2",
    service: "Eletricidade",
    city: "Lisboa",
    startsAt: "2026-11-12T14:30:00Z",
    durationMin: 90,
    priceCents: 7000,
    urgent: true,
  },
  {
    id: "3",
    service: "Pintura",
    city: "Braga",
    startsAt: "2026-11-13T09:00:00Z",
    durationMin: 240,
    priceCents: 18000,
    urgent: false,
  },
  {
    id: "4",
    service: "Canalização",
    city: "Coimbra",
    startsAt: "2026-11-11T08:30:00Z",
    durationMin: 45,
    priceCents: 3500,
    urgent: true,
  },
  {
    id: "5",
    service: "Eletricidade",
    city: "Porto",
    startsAt: "2026-11-14T16:00:00Z",
    durationMin: 120,
    priceCents: 9500,
    urgent: false,
  },
  {
    id: "6",
    service: "Pintura",
    city: "Lisboa",
    startsAt: "2026-11-15T09:30:00Z",
    durationMin: 480,
    priceCents: 32000,
    urgent: false,
  },
];

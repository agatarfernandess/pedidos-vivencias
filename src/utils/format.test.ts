import { describe, expect, it } from "vitest";
import { formatDuration, formatPrice, formatTime } from "./format";

// O Intl usa um espaço "não separável" antes do €; normalizo para comparar.
const normalizeSpaces = (text: string) => text.replace(/\s/g, " ");

describe("formatPrice", () => {
  it("converte cêntimos em euros", () => {
    expect(normalizeSpaces(formatPrice(4500))).toBe("45,00 €");
    expect(normalizeSpaces(formatPrice(18000))).toBe("180,00 €");
  });
});

describe("formatDuration", () => {
  it("mostra só minutos quando é menos de uma hora", () => {
    expect(formatDuration(45)).toBe("45 min");
  });

  it("mostra só horas quando é um número certo de horas", () => {
    expect(formatDuration(60)).toBe("1 h");
    expect(formatDuration(240)).toBe("4 h");
  });

  it("mostra horas e minutos", () => {
    expect(formatDuration(90)).toBe("1 h 30 min");
  });
});

describe("formatTime", () => {
  it("mostra a hora de Lisboa no inverno (igual a UTC)", () => {
    expect(formatTime("2026-11-12T10:00:00Z")).toBe("10:00");
  });

  it("mostra a hora de Lisboa no verão (UTC+1)", () => {
    expect(formatTime("2026-07-01T10:00:00Z")).toBe("11:00");
  });
});

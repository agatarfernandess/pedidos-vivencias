import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import { jobs } from "./data/jobs";

// O carregamento demora 1 s, por isso dou um pouco mais de margem.
const waitForJobs = () =>
  screen.findAllByRole("listitem", {}, { timeout: 2000 });

describe("App", () => {
  it("mostra uma mensagem enquanto carrega e depois a lista", async () => {
    render(<App />);

    expect(screen.getByRole("status")).toHaveTextContent("A carregar");

    const items = await waitForJobs();
    expect(items).toHaveLength(jobs.length);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("filtra os pedidos por cidade", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForJobs();

    await user.selectOptions(screen.getByLabelText("Cidade"), "Braga");

    const items = screen.getAllByRole("listitem");
    const bragaJobs = jobs.filter((job) => job.city === "Braga");
    expect(items).toHaveLength(bragaJobs.length);
  });

  it("remove o pedido da lista ao aceitar", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForJobs();

    await user.click(
      screen.getByRole("button", {
        name: "Aceitar pedido de Pintura em Braga",
      }),
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(jobs.length - 1);
  });

  it("mostra uma mensagem quando a cidade escolhida fica sem pedidos", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForJobs();

    await user.selectOptions(screen.getByLabelText("Cidade"), "Braga");
    await user.click(screen.getByRole("button", { name: /Aceitar/ }));

    expect(
      screen.getByText("Não há pedidos disponíveis em Braga."),
    ).toBeInTheDocument();
  });

  it("mostra uma mensagem quando já não há pedidos nenhuns", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForJobs();

    for (const button of screen.getAllByRole("button", { name: /Aceitar/ })) {
      await user.click(button);
    }

    expect(
      screen.getByText(/Não há pedidos disponíveis de momento/),
    ).toBeInTheDocument();
  });
});

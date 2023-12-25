import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { Header } from "../header";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => {
      return {
        pathname: "localhost:3000/",
      };
    },
  };
});

describe("Header", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /pedidos/i })).toBeInTheDocument();
    expect(screen.getByText(/pedidos/i)).toHaveAttribute("href", "/orders");
    expect(screen.getByText(/dashboard/i)).toHaveAttribute("href", "/");
  });
});

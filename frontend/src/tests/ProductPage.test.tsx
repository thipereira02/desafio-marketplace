import { render, screen } from '@testing-library/react';
import { ProductPage } from '../pages/ProductPage'
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
    post: vi.fn(),
  },
}));

describe('ProductPage Component', () => {
  it('should render page title correctly', () => {
    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    // Verifica se o texto "Marketplace" está na tela
    const titleElement = screen.getByText(/Lojinha/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should initially display an empty shopping cart section', () => {
    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    const emptyCartMessage = screen.getByText(/Carrinho vazio/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });
});
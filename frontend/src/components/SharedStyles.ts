import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6; /* gray-100 */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px; /* Lista de Produtos (Livre) | Carrinho (Fixo) */
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Vira coluna no celular */
  }
`;

export const BaseCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
`;

export const BaseButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;

  &:hover {
    background-color: #1d4ed8;
  }
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';
import { PageContainer, ContentGrid, BaseCard, Title, BaseButton, Input } from '../components/SharedStyles';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const ProductCard = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #059669;
  margin: 0.5rem 0;
`;

const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
`;

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/products`, {
        name: newName,
        price: parseFloat(newPrice),
        stock: parseInt(newStock)
      });
      alert('Produto cadastrado!');
      setNewName(''); setNewPrice(''); setNewStock('');
      fetchProducts(); 
    } catch (error) {
      console.error(error);
      alert('Erro ao criar produto. Verifique os dados.');
    }
  }

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert(`Estoque limite (${product.stock}) atingido!`);
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  async function handleCheckout() {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const cartDTO = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

      const response = await axios.post(`${API_URL}/cart/checkout`, cartDTO);
      
      alert(`Compra realizada com sucesso!\nPedido #${response.data.id}\nTotal: R$ ${response.data.total}`);
      setCart([]);
      fetchProducts();

    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.error || 'Erro ao processar compra.';
      alert(`Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <PageContainer>
      <Title>Lojinha do<span style={{color: '#2563eb'}}> Thiago</span></Title>

      <ContentGrid>
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          
          <BaseCard>
            <h3>Cadastrar Novo Produto</h3>
            <form onSubmit={handleCreateProduct} style={{display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap'}}>
              <Input placeholder="Nome" value={newName} onChange={e => setNewName(e.target.value)} required style={{flex: 2}} />
              <Input placeholder="Preço" type="number" step="0.01" value={newPrice} onChange={e => setNewPrice(e.target.value)} required style={{flex: 1}} />
              <Input placeholder="Estoque" type="number" value={newStock} onChange={e => setNewStock(e.target.value)} required style={{flex: 1}} />
              <BaseButton type="submit" style={{width: 'auto'}}><Plus size={20}/></BaseButton>
            </form>
          </BaseCard>

          <ProductGrid>
            {products.map(p => (
              <ProductCard key={p.id}>
                <h4>{p.name}</h4>
                <Price>R$ {p.price.toFixed(2)}</Price>
                <p style={{fontSize: '0.8rem', color: '#6b7280'}}>Estoque: {p.stock}</p>
                <div style={{marginTop: '1rem'}}>
                  <BaseButton 
                    onClick={() => addToCart(p)}
                    disabled={p.stock === 0}
                    style={{backgroundColor: p.stock === 0 ? '#9ca3af' : '#2563eb'}}
                  >
                    {p.stock === 0 ? 'Esgotado' : 'Adicionar'}
                  </BaseButton>
                </div>
              </ProductCard>
            ))}
          </ProductGrid>
        </div>

        <div>
          <BaseCard style={{position: 'sticky', top: '2rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
              <ShoppingCart size={24} />
              <h3>Seu Carrinho</h3>
            </div>

            {cart.length === 0 ? (
              <p style={{color: '#9ca3af', textAlign: 'center'}}>Carrinho vazio.</p>
            ) : (
              <>
                {cart.map(item => (
                  <CartItemRow key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{fontSize: '0.8rem'}}>
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer'}}>
                      <Trash2 size={18}/>
                    </button>
                  </CartItemRow>
                ))}
                
                <div style={{marginTop: '1.5rem', borderTop: '2px solid #eee', paddingTop: '1rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold'}}>
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <BaseButton 
                    onClick={handleCheckout} 
                    disabled={loading}
                    style={{marginTop: '1rem', backgroundColor: '#059669'}}
                  >
                    {loading ? 'Processando...' : 'FINALIZAR COMPRA'}
                  </BaseButton>
                </div>
              </>
            )}
          </BaseCard>
        </div>
      </ContentGrid>
    </PageContainer>
  );
}
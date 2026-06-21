import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { theme } from '../../styles/theme';

const CartButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 24px;
  z-index: 200;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: ${theme.primary};
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${theme.secondary};
  color: ${theme.textMain};
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FloatingCart = ({ itemCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <CartButton onClick={() => navigate('/cart')}>
      <ShoppingCartOutlined />
      <Badge>{itemCount}</Badge>
    </CartButton>
  );
};

export default FloatingCart;

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Card = styled.div`
  background-color: ${theme.surface};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: ${({ $isAvailable }) => ($isAvailable ? 1 : 0.45)};
  pointer-events: ${({ $isAvailable }) => ($isAvailable ? 'auto' : 'none')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.soldOut};
`;

const CardBody = styled.div`
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CardTitle = styled.p`
  color: ${theme.textMain};
  font-size: 15px;
  font-weight: 700;
  margin: 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardPrice = styled.span`
  color: ${theme.textSub};
  font-size: 14px;
`;

const SoldOutBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background-color: ${theme.soldOut};
  padding: 2px 8px;
  border-radius: 4px;
`;

const ProductCard = ({ id, title, price, image, isAvailable }) => {
  const navigate = useNavigate();

  return (
    <Card $isAvailable={isAvailable} onClick={() => navigate(`/product/${id}`)}>
      <ImageBox>
        {image
          ? <CardImage src={image} alt={title} />
          : <ImagePlaceholder />
        }
      </ImageBox>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <PriceRow>
          <CardPrice>$ {price}</CardPrice>
          {!isAvailable && <SoldOutBadge>已售完</SoldOutBadge>}
        </PriceRow>
      </CardBody>
    </Card>
  );
};

export default ProductCard;

import styled from 'styled-components';
import ProductCard from './ProductCard';
import { menuData } from '../../data/menuData';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px 48px;
`;

const ProductGrid = ({ category }) => {
  const filtered = menuData.filter((item) => item.category === category);

  return (
    <Grid>
      {filtered.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          isAvailable={item.isAvailable}
        />
      ))}
    </Grid>
  );
};

export default ProductGrid;

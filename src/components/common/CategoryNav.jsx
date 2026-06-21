import styled from 'styled-components';
import { theme } from '../../styles/theme';

const categories = [
  { label: '飯食類',   id: 'rice' },
  { label: '麵食類',   id: 'noodle' },
  { label: '單點小菜', id: 'side' },
];

const NavWrapper = styled.nav`
  display: flex;
  gap: 10px;
  padding: 12px 36px;
  position: sticky;
  top: 60px;
  z-index: 90;
  background-color: ${theme.bg};
  border-bottom: 1px solid ${theme.secondary}44;
`;

const NavButton = styled.button`
  padding: 6px 18px;
  border-radius: 999px;
  border: 1.5px solid ${theme.primary};
  background-color: transparent;
  color: ${theme.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${theme.primary};
    color: ${theme.surface};
  }
`;

const CategoryNav = () => {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <NavWrapper>
      {categories.map(({ label, id }) => (
        <NavButton key={id} onClick={() => handleClick(id)}>
          {label}
        </NavButton>
      ))}
    </NavWrapper>
  );
};

export default CategoryNav;

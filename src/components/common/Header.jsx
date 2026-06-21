import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { theme } from '../../styles/theme';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background-color: ${theme.bg};
  border-bottom: 1px solid ${theme.textMain};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '-100%')});
  transition: transform 0.3s ease;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.textMain};
  letter-spacing: 1px;
  margin: 0;
`;

const LogoutButton = styled.button`
  padding: 6px 16px;
  font-size: 14px;
  color: ${theme.textMain};
  background-color: transparent;
  border: 1px solid ${theme.textMain};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.textMain};
    color: ${theme.bg};
  }
`;

const Header = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 120) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledHeader $visible={visible}>
      <Logo>藤原（文化店）</Logo>
      <LogoutButton><UserOutlined /> 登出</LogoutButton>
    </StyledHeader>
  );
};

export default Header;

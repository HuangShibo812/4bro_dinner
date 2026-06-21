import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import CategoryNav from '../components/common/CategoryNav';
import ProductGrid from '../components/common/ProductGrid';
import { theme } from '../styles/theme';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${theme.bg};
`;

const Section = styled.section`
  padding: 0 0 24px;
  scroll-margin-top: 120px;

  &:first-of-type {
    margin-top: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.textMain};
  margin: 0;
  padding: 4px 16px 4px;
  border-left: 4px solid ${theme.primary};
  padding-left: 12px;
  margin-left: 16px;
`;

const HomePage = () => {
  return (
    <PageWrapper>
      <Header />
      <CategoryNav />
      <Section id="rice">
        <SectionTitle>飯食類</SectionTitle>
        <ProductGrid category="rice" />
      </Section>
      <Section id="noodle">
        <SectionTitle>麵食類</SectionTitle>
        <ProductGrid category="noodle" />
      </Section>
      <Section id="side">
        <SectionTitle>單點小菜</SectionTitle>
        <ProductGrid category="side" />
      </Section>
    </PageWrapper>
  );
};

export default HomePage;
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Checkbox, Radio, Input } from 'antd';
import { ArrowLeftOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { menuData } from '../data/menuData';
import { customizationOptions, drinkSubOptions } from '../data/customizationOptions';
import { theme } from '../styles/theme';

const { TextArea } = Input;

// ── Layout ──────────────────────────────────────────
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${theme.bg};
  padding-bottom: 90px;
`;

const HeroWrapper = styled.div`
  position: relative;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
`;

const HeroPlaceholder = styled.div`
  width: 100%;
  height: 240px;
  background-color: ${theme.soldOut};
`;

const BackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255,255,255,0.85);
  color: ${theme.textMain};
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${theme.secondary}44;
`;

const ProductTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${theme.textMain};
  margin: 0 0 4px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: ${theme.primary};
  font-weight: 600;
  margin: 0 0 8px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: ${theme.textSub};
  margin: 0;
  line-height: 1.6;
`;

const SectionLabel = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: ${theme.textMain};
  margin: 0 0 12px;
`;

// ── 客製化選項 ──────────────────────────────────────
const OptionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.secondary}22;

  &:last-of-type {
    border-bottom: none;
  }
`;

const OptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const OptionLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.textMain};
`;

const OptionPrice = styled.span`
  font-size: 12px;
  color: ${theme.textSub};
`;

const SubOptionsBlock = styled.div`
  margin-top: 8px;
  padding: 10px 12px;
  background-color: ${theme.secondary}22;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubLabel = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.textSub};
  margin: 0 0 6px;
`;

// ── 數量控制 ────────────────────────────────────────
const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const QtyBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid ${theme.primary};
  background-color: transparent;
  color: ${theme.primary};
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.primary};
    color: #fff;
  }

  &:disabled {
    border-color: ${theme.soldOut};
    color: ${theme.soldOut};
    cursor: default;
    &:hover { background-color: transparent; }
  }
`;

const QtyNum = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.textMain};
  min-width: 24px;
  text-align: center;
`;

// ── Sticky 底部按鈕 ─────────────────────────────────
const StickyFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px;
  background-color: ${theme.bg};
  border-top: 1px solid ${theme.secondary}44;
  z-index: 100;
`;

const AddToCartBtn = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background-color: ${theme.primary};
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.secondary};
    color: ${theme.textMain};
  }
`;

// ── 主元件 ──────────────────────────────────────────
const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = menuData.find((item) => item.id === Number(productId));
  if (!product) return <PageWrapper><p>找不到此商品</p></PageWrapper>;

  const options = customizationOptions[product.category] ?? [];
  const totalPrice = product.price * quantity;

  const renderDrinkSubOptions = () => (
    <SubOptionsBlock>
      <div>
        <SubLabel>飲料種類</SubLabel>
        <Radio.Group options={drinkSubOptions.type} />
      </div>
      <div>
        <SubLabel>甜度</SubLabel>
        <Radio.Group options={drinkSubOptions.sweetness} />
      </div>
      <div>
        <SubLabel>冰塊</SubLabel>
        <Radio.Group options={drinkSubOptions.ice} />
      </div>
    </SubOptionsBlock>
  );

  return (
    <PageWrapper>
      <HeroWrapper>
        {product.image
          ? <HeroImage src={product.image} alt={product.title} />
          : <HeroPlaceholder />
        }
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </BackButton>
      </HeroWrapper>

      {/* 標題區 */}
      <Section>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>NT$ {product.price}</ProductPrice>
        <ProductDescription>
          {product.description ?? '新鮮食材每日現做，歡迎依個人口味客製化。'}
        </ProductDescription>
      </Section>

      {/* 客製化選項 */}
      {options.length > 0 && (
        <Section>
          <SectionLabel>客製化選項</SectionLabel>
          {options.map((option) => (
            <div key={option.id}>
              {option.type === 'radio' ? (
                <div style={{ marginBottom: 12 }}>
                  <SubLabel>{option.label}</SubLabel>
                  <Radio.Group options={option.choices} />
                </div>
              ) : (
                <OptionRow>
                  <Checkbox style={{ marginTop: 2 }} />
                  <OptionInfo>
                    <OptionLabel>{option.label}</OptionLabel>
                    {option.price > 0 && (
                      <OptionPrice>+ NT$ {option.price}</OptionPrice>
                    )}
                    {option.setChoices && (
                      <SubOptionsBlock>
                        <div>
                          <SubLabel>主食選擇</SubLabel>
                          <Radio.Group options={option.setChoices} />
                        </div>
                        {renderDrinkSubOptions()}
                      </SubOptionsBlock>
                    )}
                    {option.hasDrinkSub && !option.setChoices && renderDrinkSubOptions()}
                  </OptionInfo>
                </OptionRow>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* 備註 */}
      <Section>
        <SectionLabel>新增備註</SectionLabel>
        <TextArea
          placeholder="輸入對廚房的特別交代..."
          autoSize={{ minRows: 2, maxRows: 4 }}
          style={{ backgroundColor: theme.surface, borderColor: `${theme.secondary}88` }}
        />
      </Section>

      {/* 數量 */}
      <Section>
        <SectionLabel>數量</SectionLabel>
        <QuantityRow>
          <QtyBtn
            onClick={() => setQuantity((q) => q - 1)}
            disabled={quantity <= 1}
          >
            <MinusOutlined />
          </QtyBtn>
          <QtyNum>{quantity}</QtyNum>
          <QtyBtn onClick={() => setQuantity((q) => q + 1)}>
            <PlusOutlined />
          </QtyBtn>
        </QuantityRow>
      </Section>

      <StickyFooter>
        <AddToCartBtn>
          新增 {quantity} 份至購物車　NT$ {totalPrice}
        </AddToCartBtn>
      </StickyFooter>
    </PageWrapper>
  );
};

export default ProductPage;

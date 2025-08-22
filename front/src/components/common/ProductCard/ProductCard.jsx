import Modal from "../../utils/Modal/Modal";
import HasDiscount from "../../utils/HasDiscount/HasDiscount";
import RenderStars from "../../utils/RenderStars/RenderStars";
import CardShop from "../CardShop/CardShop";
import { CiShoppingBasket } from "react-icons/ci";
import {
  Burst,
  Category,
  IconContainer,
  IconItem,
  ImageContainer,
  ImageWrapper,
  PreviewContainer,
  PriceContainer,
  ProductCardContainer,
  ProductImage,
  ProductName,
  StarsWrapper,
  ThumbnailImage,
} from "./ProductCard.styles";
import useHoverAnimationImg from "../../../hooks/useHoverAnimationImg";
import { CustomLink } from "../../utils/Button/CustomLink";

import Row from "../../utils/Row/Row";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { hovered, exiting, handleMouseEnter, handleMouseLeave } =
    useHoverAnimationImg();
  return (
    <ProductCardContainer
      onMouseEnter={() => handleMouseEnter(product.id)}
      onMouseLeave={() => handleMouseLeave(product.id)}
    >
      {product.discount && (
        <Burst>
          <span>{product.discount}%</span>
        </Burst>
      )}
      <Link to={"/shop/" + product.slug}>
        <ImageContainer>
          <ImageWrapper>
            <ProductImage
              src={`${product.image}`}
              alt={product.title}
              $isHovered={hovered === product.id}
              $isExiting={exiting === product.id}
            />
            
              
            <ThumbnailImage
              src={`${ product.thumbnails.length === 0 ? product.image :product.thumbnails[0]}`}
              alt={`${product.title} thumbnail`}
              $isHovered={hovered === product.id}
              $isExiting={exiting === product.id}
            />

          </ImageWrapper>
        </ImageContainer>
      </Link>
      <IconContainer>
        <IconItem>
          <Modal>
            <Modal.Trigger opens="product-preview">
              <CiShoppingBasket />
            </Modal.Trigger>
            <Modal.Content name="product-preview">
              <CardShop product={product} />
            </Modal.Content>
          </Modal>
        </IconItem>
      </IconContainer>
      <PreviewContainer>
        <Modal>
          <Modal.Trigger opens="product-preview">
            <CustomLink> + QUICK SHOP</CustomLink>
          </Modal.Trigger>
          <Modal.Content name="product-preview">
            <CardShop product={product} />
          </Modal.Content>
        </Modal>
      </PreviewContainer>

      {/* <StarsWrapper>{RenderStars(product.rating.rate)}</StarsWrapper> */}
      <Link to={"/shop/" + product.slug}>
        <ProductName>{product.title}</ProductName>
      </Link>
      <PriceContainer>
        <Row $justifyContent="center" $alignItems="center">
          <HasDiscount product={product} />
        </Row>
      </PriceContainer>
      <Category>{product.category.name}</Category>
    </ProductCardContainer>
  );
};

export default ProductCard;

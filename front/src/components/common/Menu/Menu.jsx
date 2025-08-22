import Search from "../../../assets/icons/search.svg?react";
import Heart from "../../../assets/icons/heart.svg?react";
import User from "../../../assets/icons/user.svg?react";
import Shop from "../../../assets/icons/shop.svg?react";
import LogoWebsite from "../../../assets/img/logo-website/logo.png";
import { Link } from "react-router-dom";
import LoginRegister from "../LoginRegister/LoginRegister";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Badge,
  ContainerLargeScreenMenu,
  ContainerSmallScreenMenu,
  IconButton,
  IconsWrapper,
  LogoContainer,
  MobileMenuContainer,
  Nav,
  NavContainer,
  NavSection,
} from "./Menu.styles";
import { getTotalCartQtity } from "../../../features/shoppingCart/shoppingCartSlice";
import SearchComponent from "../SearchComponent/SearchComponent";
import ShoppingCartWishlist from "../ShoppingCartWishlist/ShoppingCartWishlist";
import Sidebar from "../Sidebar/Sidebar";
import MenuNavigationLargeSC from "./MenuNavigationLargeSC";
import MenuNavigationSmallSC from "./MenuNavigationSmallSC";
import BottomNav from "./BottomNav";
import { UserTab } from "../UserTab/UserTab";
import Image from '../Image/Image';
import EnvironmentIndicator from './EnvironmentIndicator';

const Menu = () => {
  // To get number of product added to cart
  const totalQty = useSelector(getTotalCartQtity);
  const {user} = useSelector((state)=> state.auth);



  // To keep menu sticky
  const [isSticky, setIsSticky] = useState(false);

  // To open or close the search component
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // To open or close the search component
  const handleSearchToggle = (e) => {
    e.preventDefault();
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <Nav $isSticky={isSticky} aria-label="Main navigation">
      <NavContainer>
        <NavSection>
          <LogoContainer $isSticky={isSticky}>
            <Link to="/">
              <Image 
                src={LogoWebsite} 
                alt="Pure Essence Logo" 
                width="auto" 
                height="50px"
                objectFit="contain"
              />
            </Link>
          </LogoContainer>
        </NavSection>
        <NavSection>
          {/* Menu Navigation //the middle one// only for large screen */}
          <ContainerLargeScreenMenu>
            <MenuNavigationLargeSC />
          </ContainerLargeScreenMenu>
          {/* Menu Navigation //hamburguer // only for small screen */}
          <ContainerSmallScreenMenu>
            <MenuNavigationSmallSC />
          </ContainerSmallScreenMenu>
          {/* Environment Indicator */}
          <EnvironmentIndicator />
        </NavSection>
        <NavSection className="icon-wrapper">
          <IconsWrapper>
            <Sidebar.Provider>
              <Sidebar.Trigger opens="mySidebar" position="right">
                <IconButton aria-label="User profile">
                  <User />
                </IconButton>
              </Sidebar.Trigger>
              <Sidebar.Content name="mySidebar">
                {
                  
                user?<UserTab user={user}/> : <LoginRegister />}
              </Sidebar.Content>
            </Sidebar.Provider>

            <IconButton aria-label="Search" onClick={handleSearchToggle}>
              <Search />
            </IconButton>



            <Sidebar.Provider>
              <Sidebar.Trigger opens="myCartShopSidebar" position="right">
                <IconButton aria-label="Cart">
                  <Shop />
                  <Badge>{totalQty}</Badge>
                </IconButton>
              </Sidebar.Trigger>
              <Sidebar.Content name="myCartShopSidebar">
                <ShoppingCartWishlist choice="cart" />
              </Sidebar.Content>
            </Sidebar.Provider>
          </IconsWrapper>
        </NavSection>
      </NavContainer>
      <SearchComponent isOpen={isSearchOpen} onClose={handleSearchToggle} />
      {/* Menu Mobile Navigation //position bottom fixed // only for small screen */}
      <MobileMenuContainer>
        <BottomNav
          totalQty={totalQty}
          handleSearchToggle={handleSearchToggle}
        />
      </MobileMenuContainer>
    </Nav>
  );
};

export default Menu;

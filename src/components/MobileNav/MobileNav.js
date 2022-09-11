import { useRouter } from "next/router";
import { useEffect, useRef, useState, useCallback } from 'react';
import { MdClear, MdMenu } from 'react-icons/md';
import cn from 'classnames';

import useDelayedRender from 'use-delayed-render';

import styles from 'styles/mobile-menu.module.css';

import useSite from 'hooks/use-site';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';


import MobileNavItem from 'components/MobileNavItem';

export default function MobileMenu() {
  const { metadata = {}, menus } = useSite();
  const { title } = metadata;

  const navigation = findMenuByLocation(menus, [
    process.env.WORDPRESS_MENU_LOCATION_NAVIGATION,
    MENU_LOCATION_NAVIGATION_DEFAULT,
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  useEffect(() => {
    const closeMenu = () => isMenuOpen && setIsMenuOpen(false);
    router.events.on("routeChangeStart", closeMenu);
    return function cleanup() {
      document.body.style.overflow = '';
      router.events.off("routeChangeStart", closeMenu);
    };
  }, [isMenuOpen, router]);


  return (
    <>
      <button
        className={cn(styles.burger, 'visible lg:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MdMenu className="absolute h-10 w-10" data-hide={isMenuOpen} />
        <MdClear className="absolute h-10 w-10" data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'flex flex-col absolute text-lg bg-primary shadow-lg',
            isMenuRendered && styles.menuRendered
          )}
        >
          {navigation?.map((listItem) => {
            return <MobileNavItem key={listItem.id} item={listItem} />;
          })}        
        </ul>
      )}
    </>
  );
}
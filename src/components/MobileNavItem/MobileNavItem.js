import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import cn from 'classnames';

import { MdKeyboardArrowDown } from 'react-icons/md';

import useDelayedRender from 'use-delayed-render';

import styles from 'styles/mobile-menu.module.css';


const MobileNavItem = ({ item }) => {
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


  const nestedItems = (item.children || []).map((item) => {
    return <MobileNavItem key={item.id} item={item} />;
  });

  return (
    <li
    className="cursor-pointer hover:text-secondary" 
    key={item.id}
    onClick={toggleMenu}
    >
      {!item.path.includes('http') && !item.target && (
        <Link href={item.path}>
          <a title={item.title}>{item.label}</a>
        </Link>
      )}
      {item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target}>
          {item.label}
        </a>
      )}
      
      {isMenuMounted && nestedItems.length > 0 && (
          <div className="block pt-5">
            <ul
            className={cn(
              styles.mobileMenu,
              isMenuRendered && styles.menuRendered
            )} 
            >
              {nestedItems}
            </ul>
          </div>
          
      )}
    </li>
  );
};

export default MobileNavItem;

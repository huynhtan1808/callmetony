import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import { MdOutlineMenu, MdOutlineSearch, MdMailOutline  } from 'react-icons/md';
import { useTheme } from 'next-themes';

import useSite from 'hooks/use-site';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

import Container from 'components/Container';
import MobileMenu from 'components/MobileNav';
import NavListItem from 'components/NavListItem';
import Button from 'components/Button';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const Nav = () => {
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!isOpen);
  const router = useRouter();

  useEffect(() => {
    const closeMenu = () => isOpen && setOpen(false);
    router.events.on("routeChangeStart", closeMenu);
    return () => {
      router.events.off("routeChangeStart", closeMenu);
    };
  }, [isOpen, router]);

  const formRef = useRef();

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);

  const { metadata = {}, menus } = useSite();
  const { title } = metadata;

  const navigation = findMenuByLocation(menus, [
    process.env.WORDPRESS_MENU_LOCATION_NAVIGATION,
    MENU_LOCATION_NAVIGATION_DEFAULT,
  ]);

  const { query, results, search, clearSearch, state } = useSearch({
    maxResults: 5,
  });

  const searchIsLoaded = state === SEARCH_STATE_LOADED;

  // When the search visibility changes, we want to add an event listener that allows us to
  // detect when someone clicks outside of the search box, allowing us to close the results
  // when focus is drawn away from search

  useEffect(() => {
    // If we don't have a query, don't need to bother adding an event listener
    // but run the cleanup in case the previous state instance exists

    if (searchVisibility === SEARCH_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    // When the search box opens up, additionall find the search input and focus
    // on the element so someone can start typing right away

    const searchInput = Array.from(formRef.current.elements).find((input) => input.type === 'search');

    searchInput.focus();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVisibility]);

  /**
   * addDocumentOnClick
   */

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * removeDocumentOnClick
   */

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * handleOnDocumentClick
   */

  function handleOnDocumentClick(e) {
    if (!e.composedPath().includes(formRef.current)) {
      setSearchVisibility(SEARCH_HIDDEN);
      clearSearch();
    }
  }

  /**
   * handleOnSearch
   */

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  /**
   * handleOnToggleSearch
   */

  function handleOnToggleSearch() {
    setSearchVisibility(SEARCH_VISIBLE);
  }

  /**
   * addResultsRoving
   */

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  /**
   * removeResultsRoving
   */

  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  /**
   * handleResultsRoving
   */

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
        focusElement.nextSibling.children[0].firstChild.firstChild.focus();
      } else if (focusElement.parentElement.nextSibling) {
        focusElement.parentElement.nextSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
        focusElement.parentElement.previousSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  }

  /**
   * escFunction
   */

  // pressing esc while search is focused will close it

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
      setSearchVisibility(SEARCH_HIDDEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <>
    <div className="fixed backdrop-blur-xl bg-white bg-opacity-60 dark:bg-gray-900 dark:bg-opacity-80 z-50 w-full flex flex-col justify-center px-6">
    <nav className="flex items-center justify-between w-full relative max-w-6xl md:px-4 mx-auto py-1 text-gray-900 dark:text-gray-50">
          <div className="flex items-center space-x-8">
          <Link href="/">
          <a className="fill-black dark:fill-white">
          <svg id="svgLogo" xmlns="http://www.w3.org/2000/svg" width="38px" height="38px" viewBox="-10 0 80 65">
            <path className="bottomArrow" d="M32.59 36.14 32.59 32 29.12 32 25.42 32 25.42 36.32 25.42 42.4 25.42 54.52 23.33 53.31 14.87 48.42 6.28 43.48 6.28 50.47 13.52 54.65 20.93 58.92 21.04 58.99 29.36 63.8 36.58 59.62 36.78 59.51 45.18 54.65 51.95 50.74 51.95 43.33 32.59 54.51 32.59 42.34 32.59 36.14"/>
            <path className="leftArrow" d="M9.62,40.75V23.69h0l8.23-4.75,14.56-8.45,5.71,3.29-8.89,5.13L21,23.69,18.6,25.05h0l10.19,5.86L32.44,33v7.7l-1-.57-5.89-3.41-10.1-5.83h0V53.44L9.59,50.08V40.75Z" transform="translate(-9.59 -10.49)"/>
            <path className="rightArrow" d="M67.8,40.75V23.69h0l-8.21-4.78L45,10.49,39.3,13.78l8.89,5.13,8.27,4.78,2.36,1.36h0L48.63,30.91,45,33v7.7l1-.57,5.89-3.41L62,30.91h0V53.44l5.82-3.36V40.75Z" transform="translate(-9.59 -10.49)"/>
          </svg>
          </a>
          </Link>
        <ul className="hidden lg:flex text-gray-800 dark:text-gray-300 space-x-8 py-5">
          {navigation?.map((listItem) => {
            return <NavListItem key={listItem.id} item={listItem} />;
          })}
        </ul>
          </div>
          
        <div className="flex items-center">
          {searchVisibility === SEARCH_HIDDEN && (
            <button className="text-xl cursor-pointer md:py-4 md:px-2 mr-2 md:mr-1" onClick={handleOnToggleSearch} disabled={!searchIsLoaded}>
              <span className="sr-only">Toggle Search</span>
              <MdOutlineSearch className="fill-gray-800 dark:fill-gray-200 w-7 h-7"/>
            </button>
          )}
          {searchVisibility === SEARCH_VISIBLE && (
            <form className="md:flex absolute left-0 md:relative md:w-94 md:h-full justify-center	items-start py-2 md:p-3" ref={formRef} action="/search" data-search-is-active={!!query}>
              <input
              className="bg-gray-200 dark:bg-gray-600 w-64 p-2 md:px-4 text-md focus:outline-none rounded"
                type="search"
                name="q"
                value={query || ''}
                onChange={handleOnSearch}
                autoComplete="off"
                placeholder="Tìm kiếm..."
                required
              />
              <div className="absolute top-full z-50 w-96 left-0 md:-left-20">
                {results.length > 0 && (
                  <div className="shadow-lg bg-white dark:bg-gray-800 p-5 border-secondary border-t-4">
                  <ul>
                    {results.map(({ slug, title }, index) => {
                      return (
                        <li key={slug}>
                          <Link tabIndex={index} href={postPathBySlug(slug)}>
                            <a className="block p-2 list-none hover:text-secondary">{title}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  </div>
                )}
                {results.length === 0 && (
                  <div className={results.length === 0 ? 'hidden' : 'block'} >
                  <p>
                    Sorry, not finding anything for <strong>{query}</strong>
                  </p>
                  </div>
                )}
              </div>
            </form>
          )}
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-8 h-8 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-gray-800 dark:text-gray-200"
              >
                {resolvedTheme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
          {/* CTA Button 
          <Button href="/" className="">
          <a className="hidden lg:flex uppercase px-3 md:px-4 py-2 rounded-lg text-black mr-2 md:mr-0">
            <span>Subscribe</span>
          </a>
          </Button>
          */}
          {/* Hamburger menu on mobile */}
        <MobileMenu />
        </div>
    </nav>
    </div>
    </>
  );
};

export default Nav;

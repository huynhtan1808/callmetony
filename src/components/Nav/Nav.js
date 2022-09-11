import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import { MdOutlineMenu, MdOutlineSearch, MdMailOutline  } from 'react-icons/md';

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

  return (
    <>
    <nav className="bg-white top-0 z-50 shadow py-2 md:py-0">
    <Container>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-8">
          <Link href="/">
          <a className="fill-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="15px" viewBox="0 0 512.39 42.9">
            <g data-name="Layer 2">
              <g data-name="Layer 1">
              <path d="M16.23.45a26.78 26.78 0 0 1 6 .62A14.89 14.89 0 0 1 26.91 3 8.51 8.51 0 0 1 30 6.36a10.88 10.88 0 0 1 1.08 5 9.51 9.51 0 0 1-1.93 6.12 10 10 0 0 1-5.3 3.36 10.89 10.89 0 0 1 5.92 3.53A10 10 0 0 1 32 31q0 5.85-4 8.66t-11.07 2.8H0V.45ZM3.66 3.9v15.45h12.48A23.69 23.69 0 0 0 20.6 19a11.7 11.7 0 0 0 3.48-1.25 6 6 0 0 0 2.36-2.4 7.75 7.75 0 0 0 .83-3.72 7.68 7.68 0 0 0-.83-3.69 5.82 5.82 0 0 0-2.36-2.38 12.2 12.2 0 0 0-3.5-1.25 23 23 0 0 0-4.47-.39Zm0 18.87V39h13.11q5.46 0 8.4-1.89t2.94-6.24a8.51 8.51 0 0 0-.8-3.84 6 6 0 0 0-2.31-2.5 11.38 11.38 0 0 0-3.54-1.34 23.09 23.09 0 0 0-4.68-.42ZM75.33 26.1A19.25 19.25 0 0 1 74 33.42a13.89 13.89 0 0 1-3.66 5.3A15.93 15.93 0 0 1 65 41.83a21.08 21.08 0 0 1-13.26 0 15.8 15.8 0 0 1-5.39-3.11 14 14 0 0 1-3.64-5.3 19.25 19.25 0 0 1-1.32-7.32V.45H45v25.38a16.77 16.77 0 0 0 1 6 10.67 10.67 0 0 0 2.82 4.24A12.44 12.44 0 0 0 53 38.55a17 17 0 0 0 10.56 0 12.39 12.39 0 0 0 4.21-2.46 10.67 10.67 0 0 0 2.82-4.24 16.77 16.77 0 0 0 1-6V.45h3.69ZM114.6 7.59a22.23 22.23 0 0 0-13.14-4.11A14.57 14.57 0 0 0 93 5.73a7.06 7.06 0 0 0-3.27 6.12 6 6 0 0 0 2.49 5.06q2.49 1.88 7.77 2.47l4.59.51q12.9 1.5 12.9 10.77A10.89 10.89 0 0 1 116.2 36a10.64 10.64 0 0 1-3.57 3.85 17.37 17.37 0 0 1-5.23 2.27 25.09 25.09 0 0 1-6.39.78 28.18 28.18 0 0 1-9-1.47 23.35 23.35 0 0 1-7.27-3.78l2-2.91a22.64 22.64 0 0 0 6.3 3.3 23.25 23.25 0 0 0 7.96 1.38 17.23 17.23 0 0 0 9.16-2.19A7 7 0 0 0 113.7 31a5.84 5.84 0 0 0-2.64-5.13q-2.64-1.8-8-2.43l-4.77-.54q-5.91-.66-9.12-3.34A9.17 9.17 0 0 1 86 12.09a10.54 10.54 0 0 1 2.1-6.55 12.7 12.7 0 0 1 5.58-4.16A21.18 21.18 0 0 1 101.49 0a25.26 25.26 0 0 1 15 4.62ZM131.22 42.45h-3.66v-42h3.66ZM178.29 42.45H175l-27.52-35.7v35.7h-3.66v-42h3.3l27.54 35.7V.45h3.66ZM219.78 42.45h-28.92v-42h28.71V3.9h-25v15.69h24.33V23h-24.38v16h25.26ZM258.42 7.59a22.23 22.23 0 0 0-13.14-4.11 14.57 14.57 0 0 0-8.43 2.25 7.06 7.06 0 0 0-3.27 6.12 6 6 0 0 0 2.49 5.06q2.49 1.88 7.77 2.47l4.59.51q12.9 1.5 12.9 10.77A10.89 10.89 0 0 1 260 36a10.64 10.64 0 0 1-3.57 3.85 17.37 17.37 0 0 1-5.23 2.27 25.09 25.09 0 0 1-6.39.78 28.18 28.18 0 0 1-9-1.47 23.35 23.35 0 0 1-7.27-3.78l2-2.91a22.64 22.64 0 0 0 6.3 3.3 23.25 23.25 0 0 0 7.92 1.38 17.23 17.23 0 0 0 9.24-2.19 7 7 0 0 0 3.52-6.23 5.84 5.84 0 0 0-2.64-5.13q-2.64-1.8-8-2.43l-4.77-.54q-5.91-.66-9.12-3.34a9.17 9.17 0 0 1-3.21-7.43 10.54 10.54 0 0 1 2.1-6.55 12.7 12.7 0 0 1 5.58-4.16A21.18 21.18 0 0 1 245.31 0a25.26 25.26 0 0 1 15 4.62ZM298.71 7.59a22.23 22.23 0 0 0-13.14-4.11 14.57 14.57 0 0 0-8.43 2.25 7.06 7.06 0 0 0-3.27 6.12 6 6 0 0 0 2.49 5.06q2.49 1.88 7.77 2.47l4.59.51q12.9 1.5 12.9 10.77a10.89 10.89 0 0 1-1.31 5.34 10.64 10.64 0 0 1-3.57 3.85 17.37 17.37 0 0 1-5.23 2.27 25.09 25.09 0 0 1-6.39.78 28.18 28.18 0 0 1-9-1.47 23.35 23.35 0 0 1-7.27-3.78l2-2.91a22.64 22.64 0 0 0 6.3 3.3 23.25 23.25 0 0 0 7.92 1.38 17.23 17.23 0 0 0 9.16-2.19 7 7 0 0 0 3.58-6.23 5.84 5.84 0 0 0-2.64-5.13q-2.64-1.8-8-2.43l-4.77-.54q-5.91-.66-9.12-3.34a9.17 9.17 0 0 1-3.21-7.43 10.54 10.54 0 0 1 2.1-6.55 12.7 12.7 0 0 1 5.58-4.16A21.18 21.18 0 0 1 285.6 0a25.26 25.26 0 0 1 15 4.62ZM334.44 17.37h20.22V.45H363v42h-8.37V25.17h-20.19v17.28h-8.38v-42h8.38ZM380.94 42.45h-8.38v-42h8.38ZM421 42.45h-30.53v-42h8.37v34.17H421ZM435.14 42.45h-8.37v-42h8.37ZM475.28 8.28h-13v34.17h-8.37V8.28h-13V.45h34.41ZM512.39 42.45H481v-42h31.14v7.68h-22.76v9.3h21.72v7.68h-21.72v9.66h23Z"/>
              </g>
              </g>
              </svg> 
          </a>
          </Link>
        <ul className="text-base text-black font-normal hidden lg:flex space-x-7 md:space-x-8 pt-2">
          {navigation?.map((listItem) => {
            return <NavListItem key={listItem.id} item={listItem} />;
          })}
        </ul>
          </div>
          
        <div className="flex font-4 items-center">
          {searchVisibility === SEARCH_HIDDEN && (
            <button className="text-xl cursor-pointer md:py-4 md:px-7 mr-2 md:mr-1" onClick={handleOnToggleSearch} disabled={!searchIsLoaded}>
              <span className="sr-only">Toggle Search</span>
              <MdOutlineSearch className="fill-black w-8 h-8"/>
            </button>
          )}
          {searchVisibility === SEARCH_VISIBLE && (
            <form className="md:flex absolute top-0 left-1 md:relative md:w-full md:h-full justify-center	items-start p-2 md:p-3" ref={formRef} action="/search" data-search-is-active={!!query}>
              <input
              className="bg-gray-100 w-72 p-2 md:px-4 text-md focus:outline-none"
                type="search"
                name="q"
                value={query || ''}
                onChange={handleOnSearch}
                autoComplete="off"
                placeholder="Search..."
                required
              />
              <div className="absolute top-full z-50 w-96 left-0 md:-left-20">
                {results.length > 0 && (
                  <div className="shadow-lg bg-white p-5 border-secondary border-t-4">
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
          {/* CTA Button */}
          <Button href="/" className="">
          <a className="hidden lg:flex uppercase px-3 md:px-4 py-2 rounded-lg text-black mr-2 md:mr-0">
            <span>Subscribe</span>
          </a>
          </Button>
          {/* Hamburger menu on mobile */}
        <MobileMenu />
        </div>
        </div>
        </Container>     
    </nav>
    </>
  );
};

export default Nav;

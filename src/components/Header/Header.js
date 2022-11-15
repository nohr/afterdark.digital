import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSnapshot } from "valtio";
import { auth } from "../../utils/firebase/api";
import { state } from "../../utils/state";
import { HamburgerIcon, Logo } from "../../utils/svg";
import Contact from "./Contact";
import { CategoryWrapper, MetaNavWrapper, NavWrapper } from "./Header.style";

function Header({ header, user }) {
  const snap = useSnapshot(state);
  let location = useLocation();
  const [filter, setFilter] = useState(true);

  useEffect(() => {
    if (header.current)
      header.current.addEventListener("touchmove", (e) => e.preventDefault(), {
        passive: true,
      });
  });

  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("projects"))
      setFilter(true);
    else setFilter(false);

    if (snap.menu) setFilter(false);
  }, [location.pathname, snap.menu]);

  return (
    <>
      <MetaNavWrapper>
        <NavWrapper ref={header}>
          {!snap.mobile && (
            <div className="Links">
              <NavLink to={"/about"}>About</NavLink>
              <div
                onClick={() => (state.menu = !snap.menu)}
                className={`${snap.menu ? `active` : null} link`}
              >
                Contact
              </div>
              {user && <NavLink to={"/editor"}>Editor</NavLink>}
              <Logo />
              <a
                href="https://www.afterdark.digital/shop/p/dept-ar-t-shirt"
                target="_blank"
                rel="noreferrer"
              >
                Shop
              </a>
              {user && (
                <div className="link" onClick={() => auth.signOut()}>
                  Sign Out
                </div>
              )}
            </div>
          )}
          {snap.mobile && (
            <div className="Links">
              <Logo />
              <div
                className="link"
                onTouchEnd={() => (state.menu = !snap.menu)}
              >
                {" "}
                <HamburgerIcon />{" "}
              </div>
            </div>
          )}
        </NavWrapper>
        {snap.menu && (
          <>
            {snap.mobile && (
              <div className="mobileNav Links">
                <NavLink to={"/about"}>About</NavLink>
                <a
                  href="https://www.afterdark.digital/shop/p/dept-ar-t-shirt"
                  target="_blank"
                  rel="noreferrer"
                >
                  Shop
                </a>
                {user && <NavLink to={"/editor"}>Editor</NavLink>}
              </div>
            )}
            <Contact />
          </>
        )}
      </MetaNavWrapper>
      {filter && <Categories header={header} />}
    </>
  );
}

export default Header;

function Categories({header}) {
  const snap = useSnapshot(state);

  return (
    <CategoryWrapper
      top={header.current ? `${header.current.clientHeight}px` : `-40px`}
    >
      {snap.categories.map((category, i) => {
        return (
          <NavLink
            // className={({ isActive }) => (isActive ? "active" : "")}
            to={`/projects/${category.toLowerCase()}`}
            key={i}
          >
            {category}
          </NavLink>
        );
      })}
    </CategoryWrapper>
  );
}

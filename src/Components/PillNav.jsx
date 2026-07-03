import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  onLoadComplete,
  activeTheme = 'purple'
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const prismRef = useRef(null);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  const hasAnimated = useRef(false);
  const animationDoneRef = useRef(!initialLoadAnimation);

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide the nav while the intro animation is still playing
      if (!animationDoneRef.current) return;

      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down past 100px threshold
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        // Show if scrolling up or close to the top
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Layout calculation for hover circles
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        if (!w || !h) return;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease]);

  // Loading animation logic (Prism Drop -> Border Form -> Elements Fade)
  useEffect(() => {
    if (initialLoadAnimation && !hasAnimated.current) {
      hasAnimated.current = true;
      const navEl = navRef.current;
      const logoEl = logoRef.current;
      const navItemsEl = navItemsRef.current;
      const prismEl = prismRef.current;
      const hamburgerEl = hamburgerRef.current;

      if (navEl && prismEl) {
        // 1. Initial setup for the intro timeline
        gsap.set(navEl, {
          clipPath: 'inset(100% 50% 0% 50% round 9999px)',
          opacity: 1,
          scale: 1
        });
        
        gsap.set(prismEl, {
          y: -80,
          opacity: 0,
          scale: 1,
          borderRadius: '3px',
          height: '18px',
          width: '6px'
        });

        if (logoEl) {
          gsap.set(logoEl, { opacity: 0 });
        }

        if (hamburgerEl) {
          gsap.set(hamburgerEl, { opacity: 0 });
        }

        let menuItems = [];
        if (navItemsEl) {
          menuItems = navItemsEl.querySelectorAll('li');
          if (menuItems.length > 0) {
            gsap.set(menuItems, { opacity: 0, y: 10 });
          }
        }

        const tl = gsap.timeline();

        // 2. Prism fades in and drops from top-center
        tl.to(prismEl, {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.out'
        });
        
        tl.to(prismEl, {
          y: 46, // bottom border impact point
          duration: 0.6,
          ease: 'power2.in'
        });

        // 3. Impact point: morph prism into a dot
        tl.to(prismEl, {
          borderRadius: '50%',
          height: '6px',
          y: 46,
          duration: 0.15,
          ease: 'power1.out'
        });

        // 4. Dot flashes & expands to 0 opacity
        tl.to(prismEl, {
          scale: 3,
          boxShadow: '0 0 30px 10px rgba(255, 255, 255, 1)',
          background: '#ffffff',
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out'
        });

        // 5. Smoothly trace/form the border of the navbar from the bottom-center point
        tl.to(navEl, {
          clipPath: 'inset(0% 0% 0% 0% round 9999px)',
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.25');

        // 6. Once the border is formed, reveal the logo
        if (logoEl) {
          tl.to(logoEl, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          }, '-=0.3');
        }

        // 7. Stagger reveal the menu links
        if (menuItems.length > 0) {
          tl.to(menuItems, {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: 'power2.out'
          }, '-=0.25');
        }

        // 8. Reveal the mobile hamburger button
        if (hamburgerEl) {
          tl.to(hamburgerEl, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          }, '-=0.25');
        }

        // 9. Inform parent when animation is complete
        tl.call(() => {
          animationDoneRef.current = true;
          // Sync lastScrollY so scroll-hide logic starts fresh from current position
          lastScrollY.current = window.scrollY;
          onLoadComplete?.();
        });
      }
    } else if (!initialLoadAnimation) {
      // Direct reset if loading animation is disabled
      const navEl = navRef.current;
      const logoEl = logoRef.current;
      const navItemsEl = navItemsRef.current;
      const hamburgerEl = hamburgerRef.current;
      if (navEl) gsap.set(navEl, { clipPath: 'inset(0% 0% 0% 0% round 9999px)', scale: 1, opacity: 1 });
      if (logoEl) gsap.set(logoEl, { scale: 1, opacity: 1 });
      if (hamburgerEl) gsap.set(hamburgerEl, { opacity: 1 });
      if (navItemsEl) {
        const menuItems = navItemsEl.querySelectorAll('li');
        if (menuItems.length > 0) gsap.set(menuItems, { opacity: 1, y: 0 });
      }
      animationDoneRef.current = true;
      lastScrollY.current = window.scrollY;
      onLoadComplete?.();
    }
  }, [initialLoadAnimation, onLoadComplete]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    // Rotation disabled for signature text logo
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = href =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = href => href && !isExternalLink(href);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        let translateY = 0;
        try {
          const style = window.getComputedStyle(target);
          const transform = style.transform || style.webkitTransform;
          if (transform && transform !== 'none') {
            const matrix = transform.match(/^matrix\((.+)\)$/);
            if (matrix) {
              translateY = parseFloat(matrix[1].split(',')[5]);
            } else {
              const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
              if (matrix3d) {
                translateY = parseFloat(matrix3d[1].split(',')[13]);
              }
            }
          }
        } catch (err) {
          console.error("Error reading transformY:", err);
        }

        const rect = target.getBoundingClientRect();
        const offset = rect.top + window.scrollY - translateY;

        window.isProgrammaticScrolling = true;
        window.dispatchEvent(new Event('scroll'));

        if (window.lenis) {
          window.lenis.scrollTo(offset, {
            duration: 0.8,
            easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
            onComplete: () => {
              window.isProgrammaticScrolling = false;
              window.dispatchEvent(new Event('scroll'));
            }
          });
        } else {
          window.scrollTo({ top: offset, behavior: 'smooth' });
          setTimeout(() => {
            window.isProgrammaticScrolling = false;
            window.dispatchEvent(new Event('scroll'));
          }, 800);
        }
      }
    }
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px',
  };

  return (
    <div 
      className="fixed top-[1em] z-[1000] left-1/2 transition-transform duration-300 ease-out"
      style={{
        transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-180%)'
      }}
    >
      {initialLoadAnimation && (
        <div
          ref={prismRef}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '6px',
            height: '18px',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 0 15px 3px rgba(255, 255, 255, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
            borderRadius: '3px',
            backdropFilter: 'blur(4px)',
            opacity: 0,
            zIndex: 1001,
          }}
        />
      )}

      <nav
        ref={navRef}
        className={`flex items-center box-border transition-all duration-500 ease-in-out ${className}`}
        aria-label="Primary"
        style={{
          ...cssVars,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
          borderRadius: '9999px',
          padding: '3px',
          gap: 'var(--pill-gap)',
          width: 'fit-content',
          maxWidth: '100%',
          clipPath: initialLoadAnimation ? 'inset(100% 50% 0% 50% round 9999px)' : 'inset(0% 0% 0% 0% round 9999px)',
        }}
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            to={items[0].href}
            onClick={(e) => handleNavClick(e, items?.[0]?.href || '#home')}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={el => {
              logoRef.current = el;
            }}
            className="rounded-full p-[3px] inline-flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: '#ffffff',
              border: 'none',
              boxShadow: 'none',
              transition: 'background 0.5s ease, border 0.5s ease, box-shadow 0.5s ease',
            }}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="h-full w-full object-contain block" />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || '#'}
            onClick={(e) => handleNavClick(e, items?.[0]?.href || '#home')}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={el => {
              logoRef.current = el;
            }}
            className="rounded-full p-[3px] inline-flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: '#ffffff',
              border: 'none',
              boxShadow: 'none',
              transition: 'background 0.5s ease, border 0.5s ease, box-shadow 0.5s ease',
            }}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="h-full w-full object-contain block" />
          </a>
        )}

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex transition-all duration-500 ease-in-out"
          style={{
            height: 'var(--nav-h)',
            background: 'transparent',
            border: '1px solid transparent',
            boxShadow: 'none',
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: 'var(--base, #000)',
                      willChange: 'transform'
                    }}
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: 'var(--hover-text, #fff)',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] tracking-[0.2px] whitespace-nowrap cursor-pointer px-0';

              return (
                <li key={item.href} role="none" className="flex h-full relative">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {PillContent}
                    </a>
                  )}
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[12px] -translate-x-1/2 w-1.5 h-1.5 rounded-full z-[4] transition-all duration-[600ms]"
                      style={{ 
                        background: activeTheme === 'purple' ? '#A855F7' : '#00D8F6', 
                        boxShadow: activeTheme === 'purple' ? '0 0 8px #A855F7' : '0 0 8px #00D8F6' 
                      }}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Hamburger button (visible on mobile only) */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative transition-all duration-500 ease-in-out"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'transparent',
            border: '1px solid transparent',
            boxShadow: 'none',
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"
        style={{
          ...cssVars,
          background: 'var(--base, #f0f0f0)'
        }}
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
          {items.map(item => {
            const defaultStyle = {
              background: 'var(--pill-bg, #fff)',
              color: 'var(--pill-text, #fff)'
            };
            const hoverIn = e => {
              e.currentTarget.style.background = 'var(--base)';
              e.currentTarget.style.color = 'var(--hover-text, #fff)';
            };
            const hoverOut = e => {
              e.currentTarget.style.background = 'var(--pill-bg, #fff)';
              e.currentTarget.style.color = 'var(--pill-text, #fff)';
            };

            const linkClasses =
              'block py-3 px-4 text-[16px] font-medium rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]';

            return (
              <li key={item.href}>
                {isRouterLink(item.href) ? (
                  <Link
                    to={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleNavClick(e, item.href);
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;

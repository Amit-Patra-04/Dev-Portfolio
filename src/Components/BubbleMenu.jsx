import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const DEFAULT_ITEMS = [
  {
    label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '#',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '#',
    ariaLabel: 'Documentation',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'blog',
    href: '#',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '#',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const overlayRef = useRef(null);
  const backdropRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

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

  const containerClassName = [
    'bubble-menu',
    useFixedPosition ? 'fixed' : 'absolute',
    'left-0 right-0 top-8',
    'flex items-center justify-between',
    'gap-4 px-8',
    'pointer-events-none',
    'z-[1001]',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    const backdrop = backdropRef.current;
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels, backdrop]);
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      gsap.to(backdrop, {
        opacity: 1,
        duration: animationDuration,
        ease: 'power3.out'
      });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            '-=' + animationDuration * 0.9
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels, backdrop]);
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.25,
        ease: 'power3.in'
      });
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.25,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      {/* Workaround for silly Tailwind capabilities */}
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

      <nav className={containerClassName} style={{ ...style, transform: isVisible ? 'translateY(0)' : 'translateY(-180%)', transition: 'transform 0.3s ease-out' }} aria-label="Main navigation">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className={[
            'bubble logo-bubble',
            'inline-flex items-center justify-center',
            'rounded-full',
            'bg-white',
            'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',
            'pointer-events-auto',
            'w-12 h-12 md:w-14 md:h-14',
            'will-change-transform',
            'cursor-pointer'
          ].join(' ')}
          aria-label="Logo"
          style={{
            background: '#ffffff',
            borderRadius: '9999px'
          }}
        >
          <span
            className={['logo-content', 'inline-flex items-center justify-center', 'w-full h-full p-[3px]'].join(' ')}
          >
            {typeof logo === 'string' ? (
              <img src={logo} alt="Logo" className="bubble-logo max-h-full max-w-full object-contain block" />
            ) : (
              logo
            )}
          </span>
        </a>

        <button
          type="button"
          className={[
            'bubble toggle-bubble menu-btn',
            isMenuOpen ? 'open' : '',
            'inline-flex flex-col items-center justify-center',
            'rounded-full',
            'bg-white',
            'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',
            'pointer-events-auto',
            'w-12 h-12 md:w-14 md:h-14',
            'border-0 cursor-pointer p-0',
            'will-change-transform'
          ].join(' ')}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >
          <span
            className="menu-line block mx-auto rounded-[2px]"
            style={{
              width: 26,
              height: 2,
              background: menuContentColor,
              transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'
            }}
          />
          <span
            className="menu-line short block mx-auto rounded-[2px]"
            style={{
              marginTop: '6px',
              width: 26,
              height: 2,
              background: menuContentColor,
              transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
            }}
          />
        </button>
      </nav>

      {showOverlay && (
        <>
          {/* Glassmorphic Backdrop Overlay */}
          <div
            ref={backdropRef}
            className={[
              'bubble-menu-backdrop',
              useFixedPosition ? 'fixed' : 'absolute',
              'inset-0',
              'bg-black/60',
              'backdrop-blur-md',
              'z-[999]',
              'pointer-events-auto cursor-pointer'
            ].join(' ')}
            onClick={handleToggle}
            aria-hidden="true"
          />
          <div
            ref={overlayRef}
            className={[
              'bubble-menu-items',
              useFixedPosition ? 'fixed' : 'absolute',
              'inset-0',
              'flex items-center justify-center',
              'pointer-events-none',
              'z-[1000]'
            ].join(' ')}
            aria-hidden={!isMenuOpen}
          >
          <ul
            className={[
              'pill-list',
              'list-none m-0 px-6',
              'w-full max-w-[1600px] mx-auto',
              'flex flex-wrap',
              'gap-x-0 gap-y-1',
              'pointer-events-auto'
            ].join(' ')}
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                role="none"
                className={[
                  'pill-col',
                  'flex justify-center items-stretch',
                  '[flex:0_0_calc(100%/3)]',
                  'box-border'
                ].join(' ')}
              >
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className={[
                    'pill-link',
                    'w-full',
                    'rounded-[999px]',
                    'no-underline',
                    'bg-white',
                    'text-inherit',
                    'shadow-[0_4px_14px_rgba(0,0,0,0.10)]',
                    'flex items-center justify-center',
                    'relative',
                    'transition-[background,color] duration-300 ease-in-out',
                    'box-border',
                    'whitespace-nowrap overflow-hidden'
                  ].join(' ')}
                  style={{
                    ['--item-rot']: `${item.rotation ?? 0}deg`,
                    ['--pill-bg']: menuBg,
                    ['--pill-color']: menuContentColor,
                    ['--hover-bg']: item.hoverStyles?.bgColor || '#f3f4f6',
                    ['--hover-color']: item.hoverStyles?.textColor || menuContentColor,
                    background: 'var(--pill-bg)',
                    color: 'var(--pill-color)',
                    minHeight: 'var(--pill-min-h, 160px)',
                    padding: 'clamp(1.5rem, 3vw, 8rem) 0',
                    fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                    fontWeight: 400,
                    lineHeight: 0,
                    willChange: 'transform',
                    height: 10
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                  onClick={(e) => {
                    handleToggle();
                    handleNavClick(e, item.href);
                  }}
                >
                  <span
                    className="pill-label inline-block"
                    style={{
                      willChange: 'transform, opacity',
                      height: '1.2em',
                      lineHeight: 1.2
                    }}
                    ref={el => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        </>
      )}
    </>
  );
}

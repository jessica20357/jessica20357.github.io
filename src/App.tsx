import { createElement, useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';

type Theme = 'light' | 'dark';
type Lang = 'en' | 'zh';
type Route =
  | { name: 'landing' }
  | { name: 'home'; sidebar?: boolean }
  | { name: 'about' }
  | { name: 'card'; category: CardCategory };
type CardCategory = 'paintings' | 'readings' | 'plants' | 'animatics' | 'guitar';
type SoundName = 'door' | 'typing' | 'guitar' | 'drawer' | 'page';

const asset = (path: string) => new URL(path, import.meta.url).href;

const A = {
  background: asset('../resources/pictures/paintings/background.png'),
  computer: asset('../resources/pictures/paintings/computer.png'),
  desk: asset('../resources/pictures/paintings/desk.png'),
  bookshelf: asset('../resources/pictures/paintings/bookshelf.png'),
  books: asset('../resources/pictures/paintings/books.png'),
  plant: asset('../resources/pictures/paintings/plant.png'),
  photo: asset('../resources/pictures/paintings/photo.png'),
  music: asset('../resources/pictures/paintings/music-player.png'),
  guitar: asset('../resources/pictures/paintings/guitar.png'),
  profile: asset('../resources/pictures/paintings/profile.jpg'),
  aboutCharacterLight: asset('../resources/pictures/paintings/about-character-light.png'),
  aboutCharacterDark: asset('../resources/pictures/paintings/about-character-dark.png'),
  paintings: [
    asset('../resources/pictures/paintings/painting1.jpg'),
    asset('../resources/pictures/paintings/painting2.jpg'),
    asset('../resources/pictures/paintings/painting3.jpg'),
    asset('../resources/pictures/paintings/painting4.jpg'),
  ],
  doorClosed: asset('../resources/pictures/UI picture/door-closed.png'),
  doorOpen: asset('../resources/pictures/UI picture/door-opem.png'),
  doorFrameA: asset('../resources/animation/door-closed 1.png'),
  doorFrameB: asset('../resources/animation/Group 14.png'),
  videos: [
    asset('../resources/animatic/1.mp4'),
    asset('../resources/animatic/2.mp4'),
    asset('../resources/animatic/3.mp4'),
  ],
  sounds: {
    bg: asset('../resources/sound/bg.mp3'),
    door: asset('../resources/sound/open-door.mp3'),
    typing: asset('../resources/sound/printer.mp3'),
    guitar: asset('../resources/sound/guitar-re.wav'),
    drawer: asset('../resources/sound/drawer-open.wav'),
    page: asset('../resources/sound/page-flip.wav'),
  },
};

const links = {
  design:
    'https://lumbar-jacket-5e6.notion.site/3970f05b94a28095a205d75d7e526acd?v=3970f05b94a2801482e8000c41ffef9b&source=copy_link',
  blogs:
    'https://app.notion.com/p/3970f05b94a280368da5c7fea81c03d0?v=3970f05b94a280388869000c84360447&source=copy_link',
  research:
    'https://app.notion.com/p/3980f05b94a280549f30d1ff12ac22ca?v=3980f05b94a280379ce4000c40761ac7&source=copy_link',
  toys:
    'https://app.notion.com/p/3980f05b94a2806caa81eb092d5e0053?v=3980f05b94a280569f6a000ca9d1985b&source=copy_link',
  linkedin: 'https://www.linkedin.com/in/suya-wu-934b5038b/',
  github: 'https://github.com/jessica20357',
  instagram: 'https://www.instagram.com/jessi.cayaya?igsh=NHQ1OTMzYTN1dzF4&utm_source=qr',
};

const copy = {
  en: {
    title: "SUYA'S ROOM",
    landing: 'Check out what Jessica has done inside.',
    design: 'Design',
    research: 'Research',
    toys: 'Toys',
    projects: 'Projects',
    blogs: 'Blogs',
    about: 'About',
    portfolio: 'Portfolio',
    readings: 'Readings',
    plants: 'Relax your eyes',
    animatic: 'I love making animatic',
    cube: 'The cube is the key to the past......',
    name: 'SUYA WU',
    bio:
      "Hi, I'm Jessica! I'm from China. For all the years I have lived, I am always obsessed with art and science. To be honest, I really have no idea of introducing myself. I love all the interesting things, but I'm good at none of them. It's fine, though. Just keep trying and learn more.\n\nBy the way, I love playing escape games. Want to make friends with me? Connect me at LinkedIn, Github, Ins.",
    ongoing: 'ONGOING',
    empty: 'More memories are still being collected.',
  },
  zh: {
    title: '苏雅的房间',
    landing: '看看苏雅在里面干了些啥？',
    design: '设计',
    research: '研究',
    toys: '玩具项目',
    projects: '项目',
    blogs: '博客',
    about: '关于我',
    portfolio: '作品集',
    readings: '阅读笔记',
    plants: '放松眼睛',
    animatic: '我喜欢做动态分镜',
    cube: '这个立方体是通向过去的钥匙......',
    name: 'SUYA WU',
    bio:
      '你们好，我是苏雅！我来自中国，我非常喜欢艺术和科学。实话说，我真的不知道该怎么介绍我自己。我喜欢所有好玩的东西，但是一个也不擅长。但是没关系，只要继续尝试，继续学习就好啦。\n\n顺带一说，我很喜欢玩密室逃脱游戏。想要和我交个朋友吗？看看我的LinkedIn, Github, Ins主页。',
    ongoing: '进行中',
    empty: '更多记忆还在整理中。',
  },
};

const routeFromLocation = (): Route => {
  const path = window.location.pathname;
  if (path.startsWith('/card/')) {
    const category = path.split('/')[2] as CardCategory;
    return { name: 'card', category };
  }
  if (path === '/home') return { name: 'home' };
  if (path === '/about') return { name: 'about' };
  return { name: 'landing' };
};

function App() {
  const [route, setRouteState] = useState<Route>(routeFromLocation);
  const [homeRefreshKey, setHomeRefreshKey] = useState(0);
  const [theme, setTheme] = useStoredState<Theme>('suya-theme', 'light');
  const [lang, setLang] = useStoredState<Lang>('suya-lang', 'en');
  const [volumeOn, setVolumeOn] = useStoredState<boolean>('suya-volume', true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { playSound, resumeBackground } = useSoundSystem(volumeOn, hasInteracted);

  useEffect(() => {
    const onPop = () => setRouteState(routeFromLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const markInteracted = () => setHasInteracted(true);
    window.addEventListener('pointerdown', markInteracted, { once: true });
    window.addEventListener('keydown', markInteracted, { once: true });
    return () => {
      window.removeEventListener('pointerdown', markInteracted);
      window.removeEventListener('keydown', markInteracted);
    };
  }, []);

  const setRoute = (next: Route) => {
    const path =
      next.name === 'landing'
        ? '/'
        : next.name === 'card'
          ? `/card/${next.category}`
          : `/${next.name}`;
    window.history.pushState(null, '', path);
    setRouteState(next);
  };

  const t = copy[lang];
  const refreshHome = () => {
    window.history.pushState(null, '', '/home');
    setHomeRefreshKey((key) => key + 1);
    setRouteState({ name: 'home' });
  };
  const shared = {
    t,
    lang,
    theme,
    volumeOn,
    hasInteracted,
    setTheme,
    setLang,
    setVolumeOn,
    setRoute,
    refreshHome,
    playSound,
    resumeBackground,
  };

  return (
    <main className={`app theme-${theme} route-${route.name}`}>
      <CustomCursor />
      {route.name === 'landing' && <LandingPage {...shared} />}
      {route.name === 'home' && <HomePage key={homeRefreshKey} {...shared} sidebar={route.sidebar} />}
      {route.name === 'about' && <AboutPage {...shared} />}
      {route.name === 'card' && <CardPage {...shared} category={route.category} />}
    </main>
  );
}

function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initial;
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue] as const;
}

function useSoundSystem(volumeOn: boolean, hasInteracted: boolean) {
  const bgRef = useRef<HTMLAudioElement | null>(null);
  const sfxRefs = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});
  const volumeOnRef = useRef(volumeOn);

  useEffect(() => {
    volumeOnRef.current = volumeOn;
  }, [volumeOn]);

  const resumeBackground = useCallback((force = false) => {
    if (!force && !volumeOnRef.current) return;
    const bg = bgRef.current;
    if (!bg) return;
    bg.loop = true;
    bg.volume = 0.28;
    void bg.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    bgRef.current = new Audio(A.sounds.bg);
    bgRef.current.loop = true;
    bgRef.current.volume = 0.28;

    sfxRefs.current = {
      door: new Audio(A.sounds.door),
      typing: new Audio(A.sounds.typing),
      guitar: new Audio(A.sounds.guitar),
      drawer: new Audio(A.sounds.drawer),
      page: new Audio(A.sounds.page),
    };

    Object.entries(sfxRefs.current).forEach(([name, audio]) => {
      audio.volume = name === 'guitar' ? 0.46 : 0.58;
      audio.preload = 'auto';
    });

    return () => {
      bgRef.current?.pause();
      Object.values(sfxRefs.current).forEach((audio) => audio?.pause());
    };
  }, []);

  useEffect(() => {
    const resumeOnGesture = () => resumeBackground();
    window.addEventListener('pointerdown', resumeOnGesture, true);
    window.addEventListener('keydown', resumeOnGesture, true);
    window.addEventListener('touchstart', resumeOnGesture, true);
    return () => {
      window.removeEventListener('pointerdown', resumeOnGesture, true);
      window.removeEventListener('keydown', resumeOnGesture, true);
      window.removeEventListener('touchstart', resumeOnGesture, true);
    };
  }, [resumeBackground]);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    if (volumeOn && hasInteracted) {
      resumeBackground(true);
      return;
    }
    bg.pause();
  }, [volumeOn, hasInteracted, resumeBackground]);

  const playSound = useCallback(
    (name: SoundName) => {
      if (!volumeOn) return;
      const audio = sfxRefs.current[name];
      if (!audio) return;
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    },
    [volumeOn],
  );

  return { playSound, resumeBackground };
}

type SharedProps = {
  t: (typeof copy)['en'];
  lang: Lang;
  theme: Theme;
  volumeOn: boolean;
  hasInteracted: boolean;
  setTheme: (theme: Theme) => void;
  setLang: (lang: Lang) => void;
  setVolumeOn: (value: boolean) => void;
  setRoute: (route: Route) => void;
  refreshHome: () => void;
  playSound: (name: SoundName) => void;
  resumeBackground: (force?: boolean) => void;
};

function Scene({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`scene-wrap ${className}`}>
      <div className="scene">{children}</div>
    </section>
  );
}

function LandingPage(props: SharedProps) {
  const [opening, setOpening] = useState(false);
  const { t, theme, setRoute, playSound } = props;

  const openDoor = () => {
    playSound('door');
    setOpening(true);
    window.setTimeout(() => setRoute({ name: 'home' }), 850);
  };

  return (
    <Scene className="landing-scene">
      <img className="room-bg" src={A.background} alt="" />
      {theme === 'dark' && <div className="dark-cover landing-cover" />}
      <div className="landing-copy">
        <h1 className="landing-title interactive">{t.landing}</h1>
        <nav className="landing-links" aria-label="Portfolio sections">
          <ExternalLink href={links.design}>{t.design}</ExternalLink>
          <ExternalLink href={links.research}>{t.research}</ExternalLink>
          <ExternalLink href={links.toys}>{t.toys}</ExternalLink>
        </nav>
      </div>
      <button className={`door-button ${opening ? 'is-opening' : ''}`} onClick={openDoor} aria-label="Open door">
        <img src={opening ? A.doorOpen : A.doorClosed} alt="" />
      </button>
      <ControlBar {...props} />
    </Scene>
  );
}

function HomePage(props: SharedProps & { sidebar?: boolean }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, theme, volumeOn, setRoute, refreshHome, playSound, sidebar } = props;
  const toggleDrawer = () => {
    playSound('drawer');
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Scene className="home-scene">
      <RoomArt theme={theme} />
      <button className="brand-button" onClick={refreshHome}>
        {t.title}
      </button>
      {!sidebar && <button className="side-toggle side-open" onClick={() => setRoute({ name: 'home', sidebar: true })} aria-label="Open sidebar" />}
      <RoomObject
        className="computer"
        src={A.computer}
        label={t.portfolio}
        onClick={() => {
          playSound('typing');
          setRoute({ name: 'landing' });
        }}
      />
      <div className={`desk-wrap ${drawerOpen ? 'drawer-open' : ''}`}>
        <img className="desk-img" src={A.desk} alt="" />
        <button className="drawer-hotspot drawer-one" onClick={toggleDrawer} aria-label="Open desk drawer" />
        <button className="drawer-hotspot drawer-two" onClick={toggleDrawer} aria-label="Open desk drawer" />
        <button className="drawer-hotspot drawer-three" onClick={toggleDrawer} aria-label="Open desk drawer" />
        <div className="drawer-tray">
          {A.paintings.slice(0, 3).map((src, index) => (
            <button key={src} onClick={() => setRoute({ name: 'card', category: 'paintings' })} aria-label={`Open painting ${index + 1}`}>
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>
      <img className="bookshelf" src={A.bookshelf} alt="" />
      <RoomObject
        className="books"
        src={A.books}
        label={t.readings}
        onClick={() => {
          playSound('page');
          setRoute({ name: 'card', category: 'readings' });
        }}
      />
      <RoomObject className="plant" src={A.plant} label={t.plants} onClick={() => setRoute({ name: 'card', category: 'plants' })} />
      <RoomObject className="photo" src={A.photo} label={t.animatic} onClick={() => setRoute({ name: 'card', category: 'animatics' })} />
      <RoomObject
        className="guitar"
        src={A.guitar}
        label=""
        onClick={() => {
          playSound('guitar');
          setRoute({ name: 'card', category: 'guitar' });
        }}
      />
      <button
        className="music-object interactive"
        onClick={() => {
          const nextVolumeOn = !volumeOn;
          props.setVolumeOn(nextVolumeOn);
          if (nextVolumeOn) props.resumeBackground(true);
        }}
        aria-label="Toggle music"
      >
        <img src={A.music} alt="" />
        {volumeOn && <MusicNotes />}
      </button>
      {sidebar && <SidebarOverlay {...props} />}
      <ControlBar {...props} />
    </Scene>
  );
}

function RoomArt({ theme }: { theme: Theme }) {
  return (
    <>
      <img className="room-bg" src={A.background} alt="" />
      {theme === 'dark' && <div className="dark-cover room-cover" />}
    </>
  );
}

function RoomObject({
  src,
  label,
  className,
  onClick,
}: {
  src: string;
  label: string;
  className: string;
  onClick: () => void;
}) {
  return (
    <button className={`room-object interactive ${className}`} onClick={onClick}>
      <img src={src} alt="" />
      {label && <span>{label}</span>}
    </button>
  );
}

function SidebarOverlay(props: SharedProps) {
  const { t, setRoute } = props;
  return (
    <div className="sidebar-layer">
      <button className="sidebar-scrim" onClick={() => setRoute({ name: 'home' })} aria-label="Close sidebar" />
      <button className="side-toggle side-close" onClick={() => setRoute({ name: 'home' })} aria-label="Close sidebar" />
      <aside className="sidebar-menu">
        <button onClick={() => setRoute({ name: 'landing' })}>{t.projects}</button>
        <ExternalLink href={links.blogs}>{t.blogs}</ExternalLink>
        <button onClick={() => setRoute({ name: 'about' })}>{t.about}</button>
      </aside>
    </div>
  );
}

function AboutPage(props: SharedProps) {
  const [profileMode, setProfileMode] = useState(false);
  const [typed, setTyped] = useState('');
  const { t, theme, volumeOn, hasInteracted } = props;

  useEffect(() => {
    let index = 0;
    let timeout = 0;
    const typeNext = () => {
      setTyped(t.cube.slice(0, index));
      if (index < t.cube.length) {
        index += 1;
        timeout = window.setTimeout(typeNext, 48);
        return;
      }

      timeout = window.setTimeout(() => {
        index = 0;
        setTyped('');
        typeNext();
      }, 980);
    };

    typeNext();
    return () => window.clearTimeout(timeout);
  }, [t.cube]);

  useEffect(() => {
    if (!volumeOn || !hasInteracted || profileMode || !('speechSynthesis' in window)) return;
    let cancelled = false;
    let timeout = 0;
    const speak = () => {
      if (cancelled) return;
      const utterance = new SpeechSynthesisUtterance(t.cube);
      utterance.rate = 0.78;
      utterance.pitch = 0.42;
      utterance.volume = 0.82;
      utterance.onend = () => {
        if (!cancelled) timeout = window.setTimeout(speak, 680);
      };
      utterance.onerror = () => {
        if (!cancelled) timeout = window.setTimeout(speak, 1200);
      };
      window.speechSynthesis.speak(utterance);
    };

    timeout = window.setTimeout(speak, 500);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      window.speechSynthesis.cancel();
    };
  }, [t.cube, volumeOn, hasInteracted, profileMode]);

  useEffect(() => {
    const scriptId = 'spline-viewer-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <Scene className={`about-scene about-${profileMode ? 'profile' : 'cube'} about-theme-${theme}`}>
      <button className="brand-button about-brand" onClick={props.refreshHome}>
        {t.title}
      </button>
      {!profileMode ? (
        <>
          <div className="magic-circle" />
          <div className="cube-stage">
            <SplineViewer theme={theme} />
            <button className="cube-hotspot interactive" onClick={() => setProfileMode(true)} aria-label="Open memory cube">
              <span className="cube-ring" />
            </button>
          </div>
          <div className="speech-bubble">{typed}</div>
        </>
      ) : (
        <section className="profile-view">
          <button className="profile-photo-button interactive" onClick={() => setProfileMode(false)} aria-label="Back to memory cube">
            <img src={A.profile} alt="Suya Wu profile" />
          </button>
          <h1>{t.name}</h1>
          <BioText text={t.bio} />
        </section>
      )}
      <ControlBar {...props} />
    </Scene>
  );
}

function BioText({ text }: { text: string }) {
  const socialLinks = {
    LinkedIn: links.linkedin,
    Github: links.github,
    Ins: links.instagram,
  };

  return (
    <p>
      {text.split(/(LinkedIn|Github|Ins|\n\n)/g).map((part, index) => {
        if (part === '\n\n') {
          return (
            <span key={`${part}-${index}`}>
              <br />
              <br />
            </span>
          );
        }

        const href = socialLinks[part as keyof typeof socialLinks];
        if (href) {
          return (
            <a key={`${part}-${index}`} href={href} target="_blank" rel="noreferrer">
              {part}
            </a>
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </p>
  );
}

function SplineViewer({ theme }: { theme: Theme }) {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let attempts = 0;
    const hideSplineBadge = () => {
      attempts += 1;
      const viewer = shellRef.current?.querySelector('spline-viewer') as HTMLElement & { shadowRoot?: ShadowRoot };
      const root = viewer?.shadowRoot;
      if (!root) return;
      root.querySelectorAll('a, button, div, span').forEach((element) => {
        const node = element as HTMLElement;
        const text = node.textContent?.toLowerCase() ?? '';
        const href = element instanceof HTMLAnchorElement ? element.href.toLowerCase() : '';
        if (text.includes('built with spline') || href.includes('spline.design')) {
          node.style.display = 'none';
          node.style.pointerEvents = 'none';
        }
      });
    };

    const interval = window.setInterval(() => {
      hideSplineBadge();
      if (attempts > 24) window.clearInterval(interval);
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="spline-shell" ref={shellRef}>
      <img
        className="spline-fallback"
        src={theme === 'dark' ? A.aboutCharacterDark : A.aboutCharacterLight}
        alt=""
      />
      {createElement('spline-viewer', {
        url: 'https://prod.spline.design/ubbXrPbOmVZ0LfJ9/scene.splinecode',
        'loading-anim-type': 'spinner-small-light',
        'hide-ui': true,
        background: 'transparent',
      })}
    </div>
  );
}

function CardPage(props: SharedProps & { category: CardCategory }) {
  const [active, setActive] = useState(0);
  const { category, t, theme, setRoute } = props;
  const items = category === 'paintings' ? A.paintings : category === 'animatics' ? A.videos : [];
  const hasItems = items.length > 0;
  const current = hasItems ? items[active % items.length] : '';
  const isVideo = current.endsWith('.mp4');
  const label = {
    paintings: 'Paintings',
    readings: 'Readings',
    plants: 'Living',
    animatics: 'Animatics',
    guitar: 'Guitar',
  }[category];

  const move = (delta: number) => {
    if (!items.length) return;
    setActive((items.length + active + delta) % items.length);
  };

  return (
    <Scene className="card-scene">
      <RoomArt theme={theme} />
      <div className="card-dim" />
      <section className="gallery-card" aria-label={`${category} gallery`}>
        <button className="gallery-close interactive" onClick={() => setRoute({ name: 'home' })} aria-label="Close gallery">
          ×
        </button>
        <p className="gallery-kicker">......</p>
        <p className="gallery-status">{t.ongoing}</p>
        <div className={`gallery-preview ${isVideo ? 'video-preview' : ''}`}>
          {hasItems ? (
            isVideo ? (
                <video src={current} controls controlsList="nodownload noremoteplayback" disablePictureInPicture />
            ) : (
              <img src={current} alt="" />
            )
          ) : (
            <div className="gallery-empty">{t.empty}</div>
          )}
          {hasItems && (
            <>
              <button className="gallery-arrow arrow-left interactive" onClick={() => move(-1)} aria-label="Previous item" />
              <button className="gallery-arrow arrow-right interactive" onClick={() => move(1)} aria-label="Next item" />
            </>
          )}
        </div>
        <div className="gallery-thumbs">
          {(hasItems ? items : A.paintings.slice(0, 3)).slice(0, 4).map((item, index) => (
            <button
              key={item}
              className={index === active ? 'active' : ''}
              onClick={() => hasItems && setActive(index)}
              aria-label={`Show gallery item ${index + 1}`}
            >
              {item.endsWith('.mp4') ? <video src={item} muted /> : <img src={item} alt="" />}
            </button>
          ))}
        </div>
        <p className="gallery-label">{label}</p>
      </section>
    </Scene>
  );
}

function ControlBar({ lang, theme, volumeOn, setLang, setTheme, setVolumeOn, resumeBackground }: SharedProps) {
  const nextLang = lang === 'en' ? 'zh' : 'en';
  const toggleVolume = () => {
    const nextVolumeOn = !volumeOn;
    setVolumeOn(nextVolumeOn);
    if (nextVolumeOn) resumeBackground(true);
  };
  return (
    <div className="control-bar">
      <button
        className="interactive control-button language-toggle"
        onClick={() => setLang(nextLang)}
        aria-label={`Switch language to ${nextLang === 'zh' ? 'Chinese' : 'English'}`}
        title={`Switch to ${nextLang === 'zh' ? 'Chinese' : 'English'}`}
      >
        <span className="language-code">{lang === 'en' ? 'EN' : '中'}</span>
      </button>
      <span />
      <button
        className="interactive control-button theme-toggle is-active"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {theme === 'light' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </button>
      <span />
      <button
        className={`interactive control-button sound-toggle ${volumeOn ? 'is-active' : 'muted'}`}
        onClick={toggleVolume}
        aria-label="Toggle sound"
        title="Toggle sound"
      >
        {volumeOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      </button>
    </div>
  );
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      setActive(Boolean((event.target as HTMLElement).closest('button, a, .interactive')));
    };
    window.addEventListener('mousemove', move, true);
    window.addEventListener('pointermove', move, true);
    return () => {
      window.removeEventListener('mousemove', move, true);
      window.removeEventListener('pointermove', move, true);
    };
  }, []);
  return <div className={`cursor ${active ? 'cursor-active' : ''}`} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} />;
}

function MusicNotes() {
  return (
    <div className="music-notes" aria-hidden="true">
      <i>♪</i>
      <i>♫</i>
      <i>♪</i>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="interactive" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default App;

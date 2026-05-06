import 'locomotive-scroll/dist/locomotive-scroll.css';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { ThemeProvider } from 'styled-components';

import Loader from './components/Loader';
import ScrollTriggerProxy from './components/ScrollTriggerProxy';
import About from './sections/About';
import Footer from './sections/Footer';
import Home from './sections/Home';
import Projects from './sections/Projects';
import GlobalStyles from './styles/GlobalStyles';
import { dark } from './styles/Themes';

function App() {
  const containerRef = useRef(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            smartphone: { smooth: true },
            tablet: { smooth: true },
          }}
          watch={[]}
          containerRef={containerRef}
        >
          <AnimatePresence>{Loaded ? null : <Loader />}</AnimatePresence>
          <main className="App" data-scroll-container ref={containerRef}>
            <ScrollTriggerProxy />
            <AnimatePresence>
              {Loaded ? null : <Loader />}
              <Home key="home" />
              <About key="about" />
              <Projects key="projects" />
              <Footer key="Footer" />
            </AnimatePresence>
          </main>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

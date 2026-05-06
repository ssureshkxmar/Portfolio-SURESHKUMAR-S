import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from './data';
import ProjectCard from './ProjectCard';
import GithubViewer from './GithubViewer';
import {
  Section,
  Overlay,
  Title,
  Container,
  Text,
} from './Styles';

const Projects = () => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  const ScrollingRef = useRef(null);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useLayoutEffect(() => {
    let element = ref.current;
    let scrollingElement = ScrollingRef.current;
    let t1 = gsap.timeline();

    setTimeout(() => {
      let mainHeight = scrollingElement.scrollHeight;
      element.style.height = `calc(${mainHeight / 4}px)`;

      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: 'bottom+=100% top-=100%',
          scroller: '.App',
          scrub: 1,
          pin: true,
        },
        ease: 'none',
      });

      t1.fromTo(
        scrollingElement,
        { y: '0' },
        {
          y: '-100%',
          scrollTrigger: {
            trigger: scrollingElement,
            start: 'top top',
            end: 'bottom top',
            scroller: '.App',
            scrub: 1,
          },
        },
      );

      ScrollTrigger.refresh();
    }, 1000);

    ScrollTrigger.refresh();

    return () => {
      t1.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section ref={ref} id="fixed-target" className="projects">
      <Overlay />
      <Title data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal">
        My Projects
      </Title>
      <Container ref={ScrollingRef}>
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onClick={() => setSelectedRepo(project.repo)}
          />
        ))}
      </Container>
      <Text data-scroll data-scroll-speed="-4">
        Building intelligent digital systems that bridge AI, healthcare, and
        next-generation technology.
        <br />
        <br />
        Each project represents a real-world challenge solved through innovative
        engineering — from embedded IoT systems to AI-powered medical platforms.
        <br />
        <br />
        Futuristic. Impactful. Scalable.
      </Text>

      <AnimatePresence>
        {selectedRepo && (
          <GithubViewer repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Projects;

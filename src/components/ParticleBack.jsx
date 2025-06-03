import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "@tsparticles/slim";

const ParticleBack = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // Make sure particles are behind other content
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Particles will repel on hover
            },
          },
        },
        particles: {
          color: {
            value: "#0D9488", // Teal color to match your theme
          },
          links: {
            color: "#0D9488",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
};

export default ParticleBack;

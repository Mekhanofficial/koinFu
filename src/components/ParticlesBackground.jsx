import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import HeaderPage from "./Header";

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  // Initialize particles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: props.bgColor || "#", // Dynamic background color
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "repulse" },
        },
      },
      particles: {
        color: { value: "#FFFFFF" },
        move: {
          direction: "top", // Particles will move upward
          enable: true,
          outModes: { default: "out" }, // Particles will leave the screen when they move out
          random: false, // No random movement (we want it to move only upward)
          speed: 0.5, // Speed of the particles
          straight: true, // Ensures particles move straight up
        },
        number: {
          value: props.particleDensity || 400, // Number of particles (default: 200)
          density: { enable: true },
        },
        opacity: { value: 1.0 },
        shape: { type: "circle" }, // Particle shape as circle (dots)
        size: { value: { min: 1, max: 1 } }, // Size of the dots (between 1 and 3)
      },
      detectRetina: true,
    }),
    [props.bgColor, props.particleDensity]
  );

  return (
   <div className="relative z-0" > {/* Ensure a fixed height */}
  <Particles
    id={props.id}
    init={particlesLoaded}
    options={options}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    }}
  />
</div>
  );
};

export default ParticlesComponent;

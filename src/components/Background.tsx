import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSnowPreset } from "@tsparticles/preset-snow"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function Background() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSnowPreset(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    container;
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: "#F4F3EE",
      },
      particles: {
        color: { value: ["#bbc2e2", "#E0AFA0"] },
        move: {
          random: true,
          speed: 0,
        },
        number: { value: 20, limit: { mode: "wait", value: 19 } },
        opacity: { value: 0.1 },
        size: {
          value: { min: 80, max: 200 },
        },
      },
      preset: "snow",
    }),
    []
  );

  if (init) {
    return (
      <>
        <div id="background-blur"></div>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </>
    );
  }

  return <></>;
}

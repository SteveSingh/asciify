const particleConfig = {
  particles: {
    number: {
      value: 85,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      options: {
        character: {
          value: [
            "@",
            "+",
            "#",
            "&",
            "%",
            "_",
            ":",
            "$",
            "/",
            "-",
            ".",
            "|",
            '▒',
            '■'
          ],
          font: 'Verdana',
          style: '',
          weight: '400',
          fill: true
        }
      },
      type: 'character'

    },

    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 7,
      random: true,
      anim: {
        enable: false,
        speed: 6,
        size_min: 0.3,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "random",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    }
  },
  retina_detect: true
}
export default particleConfig;
<template>
  <div ref="whidCanvas" class="asciiGroup">
    <canvas ref="hiddenCanvas" width="450px" height="300px" class="" />
  </div>
</template>

<script>
import * as THREE from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
  props: {
    shouldStopWhenFacingForward: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      mixer: undefined,
      clock: undefined,
      camera: undefined,
      renderer: undefined,
      model: undefined,
      scene: undefined,
      view: undefined,
      bigCamera: undefined,
      rAF: undefined,
      effect: undefined,
    }
  },
  mounted() {
    const canvas = this.$refs.hiddenCanvas
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      context: canvas.getContext('webgl', {
        willReadFrequently: true,
      }),
    })

    const fov = 45
    const aspect = 0.75 // the canvas default
    const near = 0.1
    const far = 20

    this.scene = new THREE.Scene()
    this.clock = new THREE.Clock()

    const dist = 12

    this.view = {
      left: 0,
      bottom: 0,
      width: 1,
      height: 1,
      fov,
      pos: [dist, 1, 0],
    }

    const camera = new THREE.PerspectiveCamera(this.view.fov, aspect, near, far)
    camera.position.fromArray(this.view.pos)
    // camera.up.fromArray(this.view.up)
    this.view.camera = camera
    this.view.camera.lookAt(0, 1, 0)

    this.scene.add(this.view.camera)

    {
      const skyColor = 0xaaaaff
      const groundColor = 0x222299
      const intensity = 1
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
      this.scene.add(light)
    }

    {
      const color = 0xbebefa
      const intensity = 2
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(100, 10, 20)
      light.target.position.set(0, 0, 0)
      this.scene.add(light)
    }

    {
      const color = 0xdabbaa
      const intensity = 2
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(-100, -10, -20)
      light.target.position.set(0, 0, 0)
      this.scene.add(light)
    }

    const loader = new GLTFLoader()
    loader.load('/whyd/2022/3d/kian.glb', (gltf) => {
      this.model = gltf.scene
      this.scene.add(this.model)
      this.model.rotation.y = Math.PI

      this.rAF = requestAnimationFrame(this.render)
    })

    this.effect = new AsciiEffect(this.renderer, ' .naiK', {
      invert: false,
      resolution: 0.15,
    })
    this.effect.setSize(canvas.width, canvas.height)
    this.effect.domElement.style.color = 'var(--primary)'
    this.effect.domElement.style.backgroundColor = 'var(--background)'
    this.effect.class = 'overlay'
    this.$refs.whidCanvas.appendChild(this.effect.domElement)
    // document.body.appendChild(this.effect.domElement)
  },
  beforeDestroy() {
    cancelAnimationFrame(this.rAF)
  },
  methods: {
    render() {
      const updateDelta = this.clock.getDelta()

      const newY = this.model.rotation.y - updateDelta * 1

      if (this.shouldStopWhenFacingForward && newY !== newY % (2 * Math.PI)) {
        this.model.rotation.y = -0.02

        const camera = this.view.camera
        camera.updateProjectionMatrix()
        this.effect.render(this.scene, camera)

        return
      } else {
        this.model.rotation.y = newY
      }

      if (this.resizeRendererToDisplaySize()) {
        const canvas = this.renderer.domElement
        this.view.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.view.camera.updateProjectionMatrix()
      }

      const camera = this.view.camera

      camera.updateProjectionMatrix()

      this.effect.render(this.scene, camera)

      this.rAF = requestAnimationFrame(this.render)
    },
    resizeRendererToDisplaySize() {
      const canvas = this.renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        this.renderer.setSize(width, height, false)
      }
      return needResize
    },
  },
}
</script>

<style scoped>
.asciiGroup {
  position: relative;
  width: 450px;
  height: 300px;
  overflow: hidden;

  pointer-events: none;
}

.asciiGroup canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 450px;
  height: 300px;
  z-index: -10;
}
</style>

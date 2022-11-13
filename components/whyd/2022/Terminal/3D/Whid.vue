<template>
  <div ref="whidCanvas" class="asciiGroup">
    <canvas ref="hiddenCanvas" class="" />
  </div>
</template>

<script>
import * as THREE from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
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
      effect: undefined
    }
  },
  mounted() {
    const canvas = this.$refs.hiddenCanvas
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      context: canvas.getContext('webgl', {
        willReadFrequently: true
      })
    })

    const fov = 45
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 20

    this.scene = new THREE.Scene()
    this.clock = new THREE.Clock()

    const dist = 2

    this.view = {
      left: 0,
      bottom: 0,
      width: 1,
      height: 1,
      fov,
      pos: [dist, 0.4, 0]
    }

    const camera = new THREE.PerspectiveCamera(this.view.fov, aspect, near, far)
    camera.position.fromArray(this.view.pos)
    // camera.up.fromArray(this.view.up)
    this.view.camera = camera
    this.view.camera.lookAt(0, 0.4, 0)

    this.scene.add(this.view.camera)

    {
      const skyColor = 0xaaaaff
      const groundColor = 0x222299
      const intensity = 10
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
      const color = 0x443322
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(-100, -10, -20)
      light.target.position.set(0, 0, 0)
      this.scene.add(light)
    }

    const loader = new GLTFLoader()
    loader.load('/whyd/2022/3d/whid.glb', (gltf) => {
      this.model = gltf.scene
      this.scene.add(this.model)

      this.rAF = requestAnimationFrame(this.render)
    })

    this.effect = new AsciiEffect(this.renderer, ' .,:;whID08@', {
      invert: false
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

      this.model.rotation.y -= updateDelta * 1

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
    }
  }
}
</script>

<style scoped>
.asciiGroup {
  position: relative;
  width: 350px;
  height: 200px;
  overflow: hidden;
}

.asciiGroup div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.asciiGroup canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}
</style>

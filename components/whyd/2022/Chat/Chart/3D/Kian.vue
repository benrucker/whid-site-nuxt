<template>
  <canvas id="kianCanvas" />
</template>

<script>
// Have the kians fade in one at a time
// Have a large spooky kian show up at some point
// film grain? maybe it flickers on and off, maybe on just some cameras?

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
      views: undefined,
      bigCamera: undefined,
      rAF: undefined
    }
  },
  mounted() {
    const canvas = document.querySelector('#kianCanvas')
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.autoClear = false

    const fov = 45
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 1000

    this.scene = new THREE.Scene()
    this.clock = new THREE.Clock()

    const dist = 20
    const rotationOffset = -10

    this.views = [
      {
        left: 0,
        bottom: -0.05,
        width: 0.5,
        height: 0.3,
        fov,
        pos: [dist, 0, 0],
        updateCamera: function (camera, _scene, _mouseX) {
          // camera.position.x = dist
          // camera.lookAt(0, 0, 0)
        }
      },
      {
        left: 0,
        bottom: 0,
        width: 0.5,
        height: 0.6,
        fov: 160,
        pos: [Math.sqrt(60) / 3, 0, Math.sqrt(60) / 3],
        updateCamera: function (camera, _scene, _mouseX) {
          // camera.position.x = dist
          // camera.lookAt(0, 0, 0)
        }
      },
      {
        left: 0,
        bottom: 0.3375,
        width: 0.5,
        height: 0.3,
        fov: 1.5,
        pos: [0, 0, -9 * 60],
        updateCamera: function (camera, _scene, _mouseX) {
          // camera.position.x = dist
          // camera.lookAt(0, 0, 0)
        }
      },
      {
        left: 0,
        bottom: 0.525,
        width: 0.5,
        height: 0.3,
        fov,
        pos: [-dist, 0, 0],
        updateCamera: function (camera, _scene, _mouseX) {
          // camera.position.x = dist
          // camera.lookAt(0, 0, 0)
        }
      },
      {
        left: 0,
        bottom: 0.7,
        width: 0.5,
        height: 0.3,
        fov,
        pos: [0, 0, dist],
        updateCamera: function (camera, _scene, _mouseX) {
          // camera.position.x = dist
          // camera.lookAt(0, 0, 0)
        }
      }
    ]

    for (const view of this.views) {
      const camera = new THREE.PerspectiveCamera(view.fov, aspect, near, far)
      camera.position.fromArray(view.pos)
      // camera.up.fromArray(view.up)
      view.camera = camera
      view.controls = new OrbitControls(camera, this.renderer.domElement)
      view.controls.enableDamping = true
      view.controls.dampingFactor = 0.02
      view.controls.enableZoom = false
      view.controls.enablePan = false
      view.controls.autoRotate = true
      view.controls.autoRotateSpeed = 5
      view.controls.rotateSpeed = 5
      view.controls.maxPolarAngle = 0.5 * Math.PI
      view.controls.minPolarAngle = 0.5 * Math.PI

      this.scene.add(view.camera)
    }

    const bigCamera = new THREE.PerspectiveCamera(10, aspect, near, far)
    bigCamera.position.set(0, 0, 60)
    bigCamera.lookAt(0.85, 3.5, 0)
    // bigCamera.position.set(10, 20, dist)
    bigCamera.zoom = 10
    // bigCamera.aspect = 0.1
    this.bigCamera = bigCamera

    {
      const planeSize = 100

      const loader = new THREE.TextureLoader()
      const texture = loader.load('/whyd/2022/missing_texture_large.png')

      const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
      })
      planeMat.opacity = 0.02
      const mesh = new THREE.Mesh(planeGeo, planeMat)
      this.scene.add(mesh)
    }

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
      this.views[0].camera.add(light)
    }

    {
      const color = 0xdabbaa
      const intensity = 2
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(-20, 0, -100)
      light.target.position.set(0, 0, 0)
      this.views[0].camera.add(light)
    }

    const loader = new GLTFLoader()
    loader.load('/whyd/2022/3d/kian.glb', (gltf) => {
      this.model = gltf.scene
      this.scene.add(this.model)

      this.model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true
      })

      // this.model.position.y += 10
      // this.model.scale.set(0.3, 0.3, 0.3)

      this.rAF = requestAnimationFrame(this.render)
    })
  },
  beforeDestroy() {
    cancelAnimationFrame(this.rAF)
  },
  methods: {
    render() {
      const updateDelta = this.clock.getDelta()

      // this.model.rotation.y -= updateDelta * 0.5

      // this.renderer.setClearColor(0x000000, 0)
      this.renderer.clear()

      this.resizeRendererToDisplaySize()

      const canvas = this.renderer.domElement

      const left = 0 * canvas.width
      const bottom = 0
      const width = 1 * canvas.width
      const height = canvas.height
      this.renderer.setViewport(left, bottom, width, height)
      this.renderer.setScissor(left, bottom, width, height)
      this.renderer.setScissorTest(true)

      this.bigCamera.aspect = width / height
      this.bigCamera.updateProjectionMatrix()

      if (this.shouldShowBigGuy()) {
        this.renderer.render(this.scene, this.bigCamera)
      }

      for (const view of this.views) {
        const camera = view.camera
        const controls = view.controls

        view.updateCamera(camera, this.scene, 0)

        const left = Math.floor(canvas.width * view.left)
        const bottom = Math.floor(canvas.height * view.bottom)
        const width = Math.floor(canvas.width * view.width)
        const height = Math.floor(canvas.height * view.height)

        this.renderer.setViewport(left, bottom, width, height)
        this.renderer.setScissor(left, bottom, width, height)
        this.renderer.setScissorTest(true)

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        controls.update()

        this.renderer.render(this.scene, camera)
      }

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
    shouldShowBigGuy() {
      const time = Math.floor(this.clock.elapsedTime * 20)
      console.log(time)
      return !(time % 4 || time % 3 || time % 6 || time % 7)
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
</style>

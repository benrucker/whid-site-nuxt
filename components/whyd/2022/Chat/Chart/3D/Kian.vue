<template>
  <canvas id="kianCanvas" />
</template>

<script>
import * as THREE from 'three'
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
      views: undefined
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

    const fov = 10
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 200

    this.scene = new THREE.Scene()
    this.clock = new THREE.Clock()

    const dist = 60
    const rotationOffset = -10

    this.views = [
      {
        left: 0,
        bottom: 0,
        width: 0.5,
        height: 0.2,
        up: [0, 1, 0],
        fov,
        updateCamera: function (camera, _scene, _mouseX) {
          camera.position.x = dist
          camera.position.y = 0
          camera.position.z = 0 * rotationOffset
          camera.lookAt(0, 0, 0)
        }
      },
      {
        left: 0,
        bottom: 0.2,
        width: 0.5,
        height: 0.2,
        up: [0, 1, 0],
        fov,
        updateCamera: function (camera, _scene, _mouseX) {
          camera.position.x = dist
          camera.position.y = 0
          camera.position.z = 1 * rotationOffset
          camera.lookAt(0, 0, 0)
        }
      },
      {
        left: 0,
        bottom: 0.4,
        width: 0.5,
        height: 0.2,
        up: [0, 1, 0],
        fov,
        updateCamera: function (camera, _scene, _mouseX) {
          camera.position.x = dist
          camera.position.y = 0
          camera.position.z = 2 * rotationOffset
          camera.lookAt(0, 0, 0)
        }
      },
      {
        left: 0,
        bottom: 0.6,
        width: 0.5,
        height: 0.2,
        up: [0, 1, 0],
        fov,
        updateCamera: function (camera, _scene, _mouseX) {
          camera.position.x = dist
          camera.position.y = 0
          camera.position.z = 3 * rotationOffset
          camera.lookAt(0, 0, 0)
        }
      },
      {
        left: 0,
        bottom: 0.8,
        width: 0.5,
        height: 0.2,
        up: [0, 1, 0],
        fov,
        updateCamera: function (camera, _scene, _mouseX) {
          camera.position.x = dist
          camera.position.y = 0
          camera.position.z = 4 * rotationOffset
          camera.lookAt(0, 0, 0)
        }
      }
    ]

    for (const view of this.views) {
      const camera = new THREE.PerspectiveCamera(view.fov, aspect, near, far)
      camera.position.fromArray([0, 0, 0])
      camera.up.fromArray(view.up)
      view.camera = camera
    }

    {
      const skyColor = 0xb1e1ff // light blue
      const groundColor = 0xb97a20 // brownish orange
      const intensity = 1
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
      this.scene.add(light)
    }

    {
      const color = 0xffffff
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(5, 10, 2)
      this.scene.add(light)
      this.scene.add(light.target)
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

      requestAnimationFrame(this.render)
    })
  },
  methods: {
    render() {
      const updateDelta = this.clock.getDelta()

      this.model.rotation.y -= updateDelta * 0.5

      this.resizeRendererToDisplaySize()

      for (const view of this.views) {
        const camera = view.camera

        view.updateCamera(camera, this.scene, 0)

        const canvas = this.renderer.domElement

        const left = Math.floor(canvas.width * view.left)
        const bottom = Math.floor(canvas.height * view.bottom)
        const width = Math.floor(canvas.width * view.width)
        const height = Math.floor(canvas.height * view.height)

        this.renderer.setViewport(left, bottom, width, height)
        this.renderer.setScissor(left, bottom, width, height)
        this.renderer.setScissorTest(true)

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        this.renderer.render(this.scene, camera)
      }

      requestAnimationFrame(this.render)
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
canvas {
  width: 100%;
  height: calc(100% - 20px);
  margin-top: 20px;
}
</style>

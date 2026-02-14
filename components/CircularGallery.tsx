'use client'

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { useEffect, useRef } from 'react'
import './CircularGallery.css'

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t
}

function autoBind(instance: object) {
  const proto = Object.getPrototypeOf(instance) as object
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof (instance as Record<string, unknown>)[key] === 'function') {
      (instance as Record<string, unknown>)[key] = (
        (instance as Record<string, unknown>)[key] as Function
      ).bind(instance)
    }
  })
}

function createTextTexture(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  text: string,
  font = 'bold 30px monospace',
  color = 'black'
) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return { texture: new Texture(gl as never), width: 0, height: 0 }
  context.font = font
  const metrics = context.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2)
  canvas.width = textWidth + 20
  canvas.height = textHeight + 20
  context.font = font
  context.fillStyle = color
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new Texture(gl as never, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

type OGLRenderer = InstanceType<typeof Renderer>
type OGLMesh = InstanceType<typeof Mesh>
type OGLPlane = InstanceType<typeof Plane>

class Title {
  gl: never
  plane: OGLPlane
  renderer: OGLRenderer
  text: string
  textColor: string
  font: string
  mesh: OGLMesh
  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = '#545050',
    font = '30px sans-serif'
  }: {
    gl: never
    plane: OGLPlane
    renderer: OGLRenderer
    text: string
    textColor?: string
    font?: string
  }) {
    autoBind(this)
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.mesh = null as unknown as OGLMesh
    this.createMesh()
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl as unknown as WebGL2RenderingContext,
      this.text,
      this.font,
      this.textColor
    )
    const geometry = new Plane(this.gl as never)
    const program = new Program(this.gl as never, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    })
    this.mesh = new Mesh(this.gl as never, { geometry, program }) as OGLMesh
    const aspect = width / height
    const textHeight = (this.plane as unknown as { scale: { y: number } }).scale.y * 0.15
    const textWidth = textHeight * aspect
    ;(this.mesh as unknown as { scale: { set: (x: number, y: number, z: number) => void } }).scale.set(
      textWidth,
      textHeight,
      1
    )
    ;(this.mesh as unknown as { position: { y: number }; setParent: (p: unknown) => void }).position.y =
      -(this.plane as unknown as { scale: { y: number } }).scale.y * 0.5 - textHeight * 0.5 - 0.05
    ;(this.mesh as unknown as { setParent: (p: unknown) => void }).setParent(this.plane)
  }
}

interface MediaOptions {
  geometry: unknown
  gl: never
  image: string
  index: number
  length: number
  renderer: OGLRenderer
  scene: Transform
  screen: { width: number; height: number }
  text: string
  viewport: { width: number; height: number }
  bend: number
  textColor: string
  borderRadius?: number
  font?: string
}

class Media {
  extra: number
  geometry: unknown
  gl: never
  image: string
  index: number
  length: number
  renderer: OGLRenderer
  scene: Transform
  screen: { width: number; height: number }
  text: string
  viewport: { width: number; height: number }
  bend: number
  textColor: string
  borderRadius: number
  font: string
  program: InstanceType<typeof Program>
  plane: OGLMesh
  title: Title
  width: number
  widthTotal: number
  x: number
  scale: number
  padding: number
  speed: number
  isBefore: boolean
  isAfter: boolean
  constructor(opts: MediaOptions) {
    this.extra = 0
    this.geometry = opts.geometry
    this.gl = opts.gl
    this.image = opts.image
    this.index = opts.index
    this.length = opts.length
    this.renderer = opts.renderer
    this.scene = opts.scene
    this.screen = opts.screen
    this.text = opts.text
    this.viewport = opts.viewport
    this.bend = opts.bend
    this.textColor = opts.textColor
    this.borderRadius = opts.borderRadius ?? 0
    this.font = opts.font ?? 'bold 30px Figtree'
    this.program = null as unknown as InstanceType<typeof Program>
    this.plane = null as unknown as OGLMesh
    this.title = null as unknown as Title
    this.width = 0
    this.widthTotal = 0
    this.x = 0
    this.scale = 0
    this.padding = 0
    this.speed = 0
    this.isBefore = false
    this.isAfter = false
    this.createShader()
    this.createMesh()
    this.onResize()
    this.createTitle()
  }
  createShader() {
    const texture = new Texture(this.gl as never, { generateMipmaps: true })
    this.program = new Program(this.gl as never, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] as [number, number] },
        uImageSizes: { value: [0, 0] as [number, number] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    }) as InstanceType<typeof Program>
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = this.image
    img.onload = () => {
      texture.image = img
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
  }
  createMesh() {
    this.plane = new Mesh(this.gl as never, {
      geometry: this.geometry,
      program: this.program
    }) as OGLMesh
    ;(this.plane as unknown as { setParent: (p: unknown) => void }).setParent(this.scene)
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane as unknown as OGLPlane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    })
  }
  update(
    scroll: { current: number; last: number },
    direction: 'left' | 'right'
  ) {
    const plane = this.plane as unknown as { position: { x: number; y: number }; rotation: { z: number }; scale: { x: number }; setParent: unknown }
    plane.position.x = this.x - scroll.current - this.extra

    const x = plane.position.x
    const H = this.viewport.width / 2

    if (this.bend === 0) {
      plane.position.y = 0
      plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        plane.position.y = -arc
        plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        plane.position.y = arc
        plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }

    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed

    const planeOffset = (this.plane as unknown as { scale: { x: number } }).scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = plane.position.x + planeOffset < -viewportOffset
    this.isAfter = plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }
  onResize(opts?: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } }) {
    if (opts?.screen) this.screen = opts.screen
    if (opts?.viewport) {
      this.viewport = opts.viewport
    }
    this.scale = this.screen.height / 1500
    const plane = this.plane as unknown as { scale: { x: number; y: number } }
    plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.program.uniforms.uPlaneSizes.value = [plane.scale.x, plane.scale.y]
    this.padding = 2
    this.width = plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

interface GalleryItem {
  image: string
  text: string
}

interface AppOptions {
  items?: GalleryItem[]
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  scrollSpeed?: number
  scrollEase?: number
}

class App {
  container: HTMLElement
  scrollSpeed: number
  scroll: { ease: number; current: number; target: number; last: number; position?: number }
  onCheckDebounce: () => void
  renderer: OGLRenderer
  gl: WebGL2RenderingContext | WebGLRenderingContext
  camera: InstanceType<typeof Camera>
  scene: Transform
  screen: { width: number; height: number }
  viewport: { width: number; height: number }
  planeGeometry: InstanceType<typeof Plane>
  mediasImages: GalleryItem[]
  medias: Media[]
  raf: number
  boundOnResize: () => void
  boundOnWheel: (e: WheelEvent) => void
  boundOnTouchDown: (e: MouseEvent | TouchEvent) => void
  boundOnTouchMove: (e: MouseEvent | TouchEvent) => void
  boundOnTouchUp: () => void
  isDown: boolean
  start: number

  constructor(container: HTMLElement, opts: AppOptions = {}) {
    document.documentElement.classList.remove('no-js')
    this.container = container
    this.scrollSpeed = opts.scrollSpeed ?? 2
    this.scroll = {
      ease: opts.scrollEase ?? 0.05,
      current: 0,
      target: 0,
      last: 0
    }
    this.isDown = false
    this.start = 0
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200)
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(
      opts.items ?? [],
      opts.bend ?? 1,
      opts.textColor ?? '#ffffff',
      opts.borderRadius ?? 0,
      opts.font ?? 'bold 30px Figtree'
    )
    this.update()
    this.addEventListeners()
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)
    }) as OGLRenderer
    this.gl = this.renderer.gl as WebGL2RenderingContext
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl as never)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl as never, {
      heightSegments: 50,
      widthSegments: 100
    }) as InstanceType<typeof Plane>
  }

  createMedias(
    items: GalleryItem[],
    bend: number,
    textColor: string,
    borderRadius: number,
    font: string
  ) {
    const defaultItems: GalleryItem[] = [
      { image: 'https://picsum.photos/seed/1/800/600?grayscale', text: 'Bridge' },
      { image: 'https://picsum.photos/seed/2/800/600?grayscale', text: 'Desk Setup' },
      { image: 'https://picsum.photos/seed/3/800/600?grayscale', text: 'Waterfall' }
    ]
    const galleryItems = items?.length ? items : defaultItems
    this.mediasImages = galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl as never,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      })
    })
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true
    ;(this.scroll as { position?: number }).position = this.scroll.current
    this.start = (e as TouchEvent).touches
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return
    const x = (e as TouchEvent).touches
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX
    const distance = (this.start - x) * (this.scrollSpeed * 0.025)
    ;(this.scroll as { position?: number }).position =
      (this.scroll as { position?: number }).position ?? this.scroll.current
    this.scroll.target = (this.scroll as { position?: number }).position + distance
  }

  onTouchUp() {
    this.isDown = false
    this.onCheck()
  }

  onWheel(e: WheelEvent) {
    const delta = e.deltaY || (e as unknown as { wheelDelta?: number }).wheelDelta || (e as unknown as { detail?: number }).detail
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2
    this.onCheckDebounce()
  }

  onCheck() {
    if (!this.medias?.length) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * (this.camera as unknown as { aspect: number }).aspect
    this.viewport = { width, height }
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      )
    }
  }

  update = () => {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }
    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    } as never)
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update)
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    window.addEventListener('resize', this.boundOnResize)
    window.addEventListener('mousewheel', this.boundOnWheel as EventListener)
    window.addEventListener('wheel', this.boundOnWheel as EventListener)
    window.addEventListener('mousedown', this.boundOnTouchDown as EventListener)
    window.addEventListener('mousemove', this.boundOnTouchMove as EventListener)
    window.addEventListener('mouseup', this.boundOnTouchUp)
    window.addEventListener('touchstart', this.boundOnTouchDown as EventListener)
    window.addEventListener('touchmove', this.boundOnTouchMove as EventListener)
    window.addEventListener('touchend', this.boundOnTouchUp)
  }

  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    window.removeEventListener('mousewheel', this.boundOnWheel as EventListener)
    window.removeEventListener('wheel', this.boundOnWheel as EventListener)
    window.removeEventListener('mousedown', this.boundOnTouchDown as EventListener)
    window.removeEventListener('mousemove', this.boundOnTouchMove as EventListener)
    window.removeEventListener('mouseup', this.boundOnTouchUp)
    window.removeEventListener('touchstart', this.boundOnTouchDown as EventListener)
    window.removeEventListener('touchmove', this.boundOnTouchMove as EventListener)
    window.removeEventListener('touchend', this.boundOnTouchUp)
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

export interface CircularGalleryProps {
  items?: { image: string; text: string }[]
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  scrollSpeed?: number
  scrollEase?: number
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  scrollSpeed = 2,
  scrollEase = 0.05
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const app = new App(container, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase
    })

    return () => {
      app.destroy()
    }
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase])

  return <div className="circular-gallery" ref={containerRef} />
}

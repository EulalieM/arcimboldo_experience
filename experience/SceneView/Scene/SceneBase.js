import {
    AmbientLight,
    BoxGeometry,
    GridHelper,
    HemisphereLight,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    TextureLoader,
    Vector3,
    WebGLRenderer
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import TWEEN from 'tween.js'

export default class SceneBase {
    constructor () {
        this.init();
    }

    get width () {
        return window.innerWidth;
    }

    get height () {
        return window.innerHeight;
    }

    init () {
        this.setRenderer();
        this.setScene();
        this.setLights();
        this.setCamera();
        this.render();

        // EVENTS
        this.bindEvents();
    }

    bindEvents () {
        window.addEventListener('resize', this.resize.bind(this), false);
    }

    setRenderer () {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);
    }

    setScene () {
        this.scene = new Scene();
        this.scene.background = new TextureLoader().load("assets/images/textures/dark-grunge-texture-background.jpg");
    }

    setLights () {
        this.ambientLight = new AmbientLight(0x808080);
        this.scene.add(this.ambientLight);
        
        const light = new HemisphereLight();
        this.scene.add(light)
    }

    setCamera () {
        this.camera = new PerspectiveCamera(
            45,
            this.width / this.height,
            1,
            10000
        );

        this.camera.position.set(0, 110, 0);

        this.cameraTarget = new Vector3(0, 20, 0)

        this.camera.lookAt(this.cameraTarget)
    }

    setControls () {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.enableDamping = true;
        this.controls.update();
    }

    setHelpers () {
        this.gridHelper = new GridHelper(100, 10);
        this.scene.add(this.gridHelper);

        const cube = new Mesh(
            new BoxGeometry(10, 10, 10),
            new MeshBasicMaterial({ color: 0x000000 })
        );

        cube.position.set(45, 5, -45);
        this.scene.add(cube);
    }

    resize () {
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }

    update () {
        //
    }

    render () {
        TWEEN.update();
        requestAnimationFrame(this.render.bind(this));
        if (this.controls) this.controls.update();
        this.update();
        this.renderer.render(this.scene, this.camera);
    }
}

import SceneBase from './Scene/SceneBase';
import FoodManager from '../Objects/FoodManager';
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three';

export default class SceneView extends SceneBase {

    init () {
        super.init();

        // HELPERS
        // this.setControls();
        // this.setHelpers();

        this.setFrame()

        this.foodManager = new FoodManager(this)

        this.setup();
    }

    setup () {
        this.foodManager.load()
    }

    setFrame () {
        const frameImg = new TextureLoader().load("assets/images/textures/wooden-frame.png");
        const frameGeometry = new PlaneGeometry(90, 90)
        const frameMaterial = new MeshBasicMaterial({ 
            map: frameImg, 
            side: DoubleSide,
            transparent: true
        })

        this.frameMesh = new Mesh(frameGeometry, frameMaterial)
        this.frameMesh.rotateX(Math.PI / 2)

        this.scene.add(this.frameMesh)
    }

}

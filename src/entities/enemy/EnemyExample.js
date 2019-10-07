// I will create an enemy for now.

import AbstractEntity from '../AbstractEntity';

export default class ExampleEnemy extends AbstractEntity {

  constructor() { }


  async load() {
    // Manually load textures for the materials.
    var textureLoader = new THREE.TextureLoader();
    // Load necessary textures.
    var eyeTexture = textureLoader.load('./assets/model/penguin_obj/peng_eye_texture.jpg');
    var bodyTexture = textureLoader.load('./assets/model/penguin_obj/peng_texture.jpg');

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load( './assets/model/penguin_obj/penguin.mtl', function( materials ) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( './assets/model/penguin_obj/penguin.obj', function ( object ) {
            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // For now only use the peng_eye_texture and peng_texture.
                    if (child.name === 'EYE_L') {
                        child.material.map = eyeTexture;
                    } else if (child.name === 'penguin') {
                        child.material.map = bodyTexture;
                    }
                }
            } );
            scene.add( object );
            peng = object;
        } );
    } );
  }
}
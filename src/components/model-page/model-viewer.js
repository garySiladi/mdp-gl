// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import { OrbitControls } from './orbit-controls';

type NoduleType = {
  +WavefrontFilepath: string,
};

type Props = {
  +nodules: Array<NoduleType>,
  +noduleID: string,
  +location: {
    +pathname: string,
  }
};

class ModelViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
    };
    this.ruler = [];
    for (let count = 0; count < 30; count += 1) {
      this.ruler.push(<span className="ruler-unit" key={`key${ count }`} />);
    }
  }
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.aspectRatio = window.devicePixelRatio / 0.6;
    this.camera =
      new THREE.PerspectiveCamera(50, this.aspectRatio, 1, 1000);
    const {
      nodules,
      noduleID,
    } = this.props;
    const neededNodule = nodules && nodules.find(nodule => nodule.NoduleID === noduleID);
    this.objectURL = neededNodule && neededNodule.WavefrontFilepath;
    this.init(this.objectURL);
    this.animate();
    const light = new THREE.PointLight(0xeeeeee, 1, 0, 2);
    this.camera.add(light);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.animation);
  }
  setSize() {
    const {
      aspectRatio,
      renderer,
    } = this;
    const viewerContainer = document.getElementById('viewer-container');
    const viewerContainerWidth = viewerContainer.clientWidth;
    const viewerContainerHeight = viewerContainer.clientWidth / aspectRatio;
    renderer.setSize(viewerContainerWidth, viewerContainerHeight);
  }
  animate = () => {
    const {
      renderer,
      camera,
      scene,
    } = this;
    this.setSize();
    let answer = (camera.position.z ** 2) + (camera.position.y ** 2);
    answer = (Math.sqrt(answer) ** 2) + (camera.position.x ** 2);
    answer = Math.sqrt(answer);
    this.setState({
      zoom: (87 / answer).toFixed(2),
    });
    this.animation = requestAnimationFrame(this.animate);
    renderer.render(scene, camera);
  }
  init = (objectURL, isRetry = false) => {
    const {
      aspectRatio,
      renderer,
      camera,
      scene,
    } = this;
    this.setSize();
    renderer.setPixelRatio(aspectRatio);
    const viewerContainer = document.getElementById('viewer-container');
    viewerContainer.appendChild(renderer.domElement);
    scene.add(camera);
    OBJLoader(THREE);
    OrbitControls(THREE);
    this.THREE = THREE;
    const objLoader = new this.THREE.OBJLoader();
    if (!isRetry) {
      objLoader.load(objectURL, object => {
        const material = new THREE.MeshPhongMaterial({
          color: 0x00aeff,
          side: THREE.DoubleSide,
        });
        const geometry = object.children[0].geometry;
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        geometry.computeBoundingBox();
        mesh.position.set(
          0 - (geometry.boundingBox.max.x / 2),
          0 - (geometry.boundingBox.max.y / 2),
          0 - (geometry.boundingBox.max.z / 2),
        );
      });
    }
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);
    this.controls = new this.THREE.OrbitControls(camera, renderer.domElement); // eslint-disable-line
    renderer.render(scene, camera);
  }
  resetComponent = () => {
    this.init(this.objectURL, true);
  }
  props: Props
  render() {
    const { zoom } = this.state;
    const rulerNumbers = [];
    for (let count = 0; count < 7; count += 1) {
      rulerNumbers.push(<span className="ruler-number" key={`key${ count }`}>{((5 * count) / zoom).toFixed(1)}</span>);
    }
    return (
      /*eslint-disable*/
      <div id="viewer-container" className="viewer-container">
        <p className="reset-button link-button" onClick={() => { this.resetComponent(); }}>Reset View</p>
        <p className="scale-info">Zoom: {zoom}x</p>
        <div className="ruler-info">[mm]</div>
        <div className="ruler-wrapper">{this.ruler}</div>
        <div className="ruler-numbers-wrapper">{rulerNumbers}</div>
      </div>
      /*eslint-enable*/
    );
  }
}

const mapStateToProps = ({ selectedStudy: { nodules } }) => ({
  nodules,
});

export default connect(mapStateToProps)(ModelViewer);

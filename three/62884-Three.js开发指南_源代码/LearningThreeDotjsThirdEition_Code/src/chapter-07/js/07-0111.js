/*
 * @Author: Marlon
 * @Date: 2021-10-28 22:20:37
 * @LastEditors: Marlon
 * @Description: 
 */
var renderer = ''

function init(params) {
    container = document.createElement("div");
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
    );
    camera.position.z = 250;

    //场景
    scene = new THREE.Scene();

    //环境光
    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    //点光源
    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);

    //加载贴图
    // var textureLoader = new THREE.TextureLoader();
    // var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );

    //加载obj模型
    var loader = new THREE.OBJLoader();

    loader.load("../static/data.obj", function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                // child.material.map = texture;
            }
        });

        object.position.y = -95;
        scene.add(object);
    });

    //初始化渲染器
    renderer = new THREE.WebGLRenderer();
    //设置像素值
    renderer.setPixelRatio(window.devicePixelRatio);
    //设置渲染范围为屏幕的大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    //将画布放入dom的div中
    container.appendChild(renderer.domElement);
}

function render(params) {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
import { _decorator, Component, math, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinMovement')
export class CoinMovement extends Component {
    @property
    private height: number = 0.5; 
    @property
    private speed: number = 2; 
    @property
    private rotationSpeed: number = 100; 
    private originalY: number = 0;

    start() {
        this.originalY = this.node.position.y; 
    }

    update(deltaTime: number) {
        const yOffset = Math.sin(this.speed * Date.now() * 0.001) * this.height;
        this.node.position = new Vec3(this.node.position.x, this.originalY + yOffset, this.node.position.z);

        const angle = this.rotationSpeed * deltaTime;
        const rotation = math.Quat.rotateY(new math.Quat(), this.node.rotation, angle); 
        this.node.rotation = rotation;
    }
}
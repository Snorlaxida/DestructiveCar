import { _decorator,  AnimationComponent,  Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property
    moveSpeed: number = 5;

    private isMoving: boolean = false;
    private animation: AnimationComponent = null;
    
    start() {
        this.animation = this.node.getComponent(AnimationComponent);
    }

    update(deltaTime: number) {
        if (this.moveSpeed > 0) {
            if (!this.isMoving) {
                this.isMoving = true;
                this.animation.play("car_move"); 
            }
        } else {            
            if (this.isMoving) {
                this.isMoving = false;
                this.animation.stop(); 
            }
        }
        const forward = new Vec3(1, 0, 0);
        Vec3.multiplyScalar(forward, forward, this.moveSpeed * deltaTime);
        this.node.position = Vec3.add(this.node.position, this.node.position, forward);
    }

    setSpeed(speed: number){
        this.moveSpeed = speed;
    }
}



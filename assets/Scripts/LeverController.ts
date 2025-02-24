import { _decorator, Component, Node, Vec3, UITransform, EventTouch, tween } from 'cc';
import { PlayerController } from './PlayerController';
import { HandOpacity } from './HandOpacity';
const { ccclass, property } = _decorator;

@ccclass('LeverController')
export class LeverController extends Component {
    @property(Node)
    car: Node = null;

    @property(Node)
    hand: Node = null;

    private initialY: number = 0;
    private minY: number = -150; 
    private maxY: number = 150;
    private speedFactor: number = 16; 
    private isMoving: boolean = true;

    start() {
        this.initialY = this.node.position.y;
        this.startLeverAnimation();
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        this.hand.getComponent(HandOpacity).hideHand();
        this.isMoving = false;
        const deltaY = event.getDelta().y;
        const newY = this.node.position.y + deltaY;

        if (newY < this.minY) {
            this.node.setPosition(this.node.position.x, this.minY, this.node.position.z);
        } else if (newY > this.maxY) {
            this.node.setPosition(this.node.position.x, this.maxY, this.node.position.z);
        } else {
            this.node.setPosition(this.node.position.x, newY, this.node.position.z);
        }

        this.updateCarSpeed();
    }
    
    startLeverAnimation() {
        this.schedule(async () => {
            if (!this.isMoving) return;
            this.hand.getComponent(HandOpacity).showHand();
            await this.animateLever(this.maxY);
            await this.animateLever(this.minY);
            this.hand.getComponent(HandOpacity).hideHand();
        }, 2); 
    }

    async animateLever(targetY: number) {
        return new Promise<void>((resolve) => {
            tween(this.node)
                .to(0.5, { position: new Vec3(this.node.position.x, targetY, this.node.position.z) }, { easing: 'sineInOut' })
                .call(() => resolve())
                .start();
        });
    }

    updateCarSpeed() {        
        const normalizedPosition = (this.node.position.y - this.minY) / (this.maxY - this.minY);
        const speed = normalizedPosition * this.speedFactor; 
        if (this.car) {
            this.car.getComponent(PlayerController).setSpeed(speed);
        }
    }
}
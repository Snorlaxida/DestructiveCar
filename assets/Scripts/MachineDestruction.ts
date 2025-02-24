import { _decorator, AnimationComponent, Collider, Component, ICollisionEvent, Node, RigidBody } from 'cc';
import { PlayerController } from './PlayerController';
import { GameState } from './GameState';
const { ccclass, property } = _decorator;

@ccclass('MachineDestruction')
export class MachineDestruction extends Component {

    @property(Node)
    gameStateNode: Node = null;

    private animation: AnimationComponent = null;
    private movement: PlayerController = null;
    private gameState: GameState = null;
    

    start() {
        this.gameState = this.gameStateNode.getComponent(GameState); 
        const collider = this.getComponent(Collider);
        collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.animation = this.node.getComponent(AnimationComponent);
        this.movement = this.node.getComponent(PlayerController);
    }

    onCollisionEnter(event: ICollisionEvent) {
        const otherNode = event.otherCollider.node;
        if (otherNode.name === 'Road_platform.001') {
            this.breakMachine();
        }
    }

    breakMachine() {
        this.animation.play("car_crash");
        this.node.children.forEach(child => {
            child.getComponent(RigidBody).enabled = true;
            child.getComponent(Collider).enabled = true;
        });
        this.node.getComponent(PlayerController).setSpeed(0);
        this.gameState.gameOver();
    }
}



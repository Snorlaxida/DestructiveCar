import { _decorator, Collider, Component, ICollisionEvent, Node, tween, UIOpacity, UITransform, Vec3 } from 'cc';
import { GameState } from './GameState';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('DeadZone')
export class DeadZone extends Component {
    @property(Node)
    gameStateNode: Node = null;


    private gameState: GameState = null;


    start() {
        this.gameState = this.gameStateNode.getComponent(GameState);
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onTriggerEnter(event: ICollisionEvent) {
        const otherNode = event.otherCollider.node;
        if (otherNode.name === 'Machine') {
            otherNode.getComponent(PlayerController).setSpeed(0);
            this.gameState.gameOver();
        }
    }    
}



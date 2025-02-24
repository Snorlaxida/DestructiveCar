import { _decorator, Component, Node, Collider, ITriggerEvent, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinCollect')
export class CoinCollect extends Component {
    @property(Label)
    public scoreLabel: Label = null;
    private score: number = 0; 

    start() {
        const collider = this.node.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        const otherNode = event.otherCollider.node;

        if (otherNode.name === 'Machine') {
            this.collectCoin();
        }
    }

    collectCoin() {
        this.score = parseInt(this.scoreLabel.string) || 0;
        this.score++; 
        this.updateLabel(); 
        this.node.destroy(); 
    }

    updateLabel() {
        if (this.scoreLabel) {
            this.scoreLabel.string = `${this.score}`; 
        }
    }
}
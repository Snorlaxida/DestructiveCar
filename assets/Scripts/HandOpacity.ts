import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HandOpacity')
export class HandOpacity extends Component {
    hideHand() {
        this.node.active = false; 
    }
    showHand() {
        this.node.active = true; 
    }
}



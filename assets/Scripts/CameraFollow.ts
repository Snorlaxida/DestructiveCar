import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node)
    target: Node = null;

    @property
    offset: Vec3 = new Vec3(0, 5, -10);

    start() {
      
    }

    update(deltaTime: number) {
        if (this.target) {
          
            const targetPosition = this.target.position.clone(); 
            Vec3.add(targetPosition, targetPosition, this.offset); 
            this.node.position = targetPosition; 
            const lookAtPosition = this.target.position.clone();
            lookAtPosition.x += 3;
            this.node.lookAt(lookAtPosition);
        }
    }
}
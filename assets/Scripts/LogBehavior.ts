import { _decorator, Component, Node, Collider, ITriggerEvent, RigidBody, Vec3, ICollisionEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LogBehavior')
export class LogBehavior extends Component {
    @property(Boolean)
    needExtraSpeed: Boolean = false;
    private rigidBody: RigidBody = null;

    start() {
        this.rigidBody = this.getComponent(RigidBody);  
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onCollisionEnter', this.onCollisionEnter, this);
        }
    }

    onCollisionEnter(event: ICollisionEvent) {
        const otherNode = event.otherCollider.node;
        if (otherNode.name === 'Machine') {
            this.activatePhysics();
        }
    }

    activatePhysics() {
        if (this.rigidBody) {
            this.rigidBody.type = RigidBody.Type.DYNAMIC;
            if (this.needExtraSpeed) {
                const force = new Vec3(0, -300, 0);
                this.rigidBody.applyForce(force);  
            }

        }
    }
}
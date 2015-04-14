#pragma strict
 
import BehaviourMachine;
 
public class CloseToNextPoint extends ConditionNode {
     
    private var i:int;
    var car : AICar_Script;
    private var carPos : Vector3;
    private var nextPoint : Point;
 
    function Update () : Status {
  			carPos = car.getRigidbody().transform.position;
            nextPoint = car.getNextPoint();
            
            if (Vector3.Distance(carPos, nextPoint.transform.position)< car.distance)	
			{
				//Debug.Log("CLOSE to next point: " + nextPoint);
				i = 1;
			}
			else
			{
				i = -1;
			}
        
        if (i > 0) {
            // Send event?
            
            if (onSuccess.id != 0)
                owner.root.SendEvent(onSuccess.id);
 
            // Update status
            return Status.Success;
        }
        else {
            // Update status
            return Status.Failure;
        }
    }
 
    function Reset () {
        super.Reset ();
 
        // My Reset
        i = -1;
    }
}
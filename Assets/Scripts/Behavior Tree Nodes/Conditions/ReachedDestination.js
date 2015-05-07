#pragma strict
 
import BehaviourMachine;
 
public class ReachedDestination extends ConditionNode {
     
    private var i:int;
    var car : AICar_Script;
    private var path : Array;
    private var destinationPoint : Point;
 
    function Update () : Status {
		path = car.getPath();
    	destinationPoint = path[path.length-1] as Point;	
            
	    if (Vector3.Distance(car.getRigidbody().transform.position, destinationPoint.transform.position)< car.distance+2)
		{
			//Debug.Log("Destination is reached!");
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
        i = -1;//2;
    }
    
    private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
}
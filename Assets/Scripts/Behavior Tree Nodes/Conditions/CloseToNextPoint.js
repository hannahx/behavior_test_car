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
    
    	if(Vector3.Distance(carPos, nextPoint.transform.position)< 3)//car.distance)	
		{
			//Debug.Log(car.name + "CLOSE to next point: " + nextPoint.name);
			i = 1;
			
		}
		else
		{
			i = -1;
		}
        
        if (i > 0) {
            // Send event?
            //car.setUpdatePoint(0);
            
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
    
    private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
}
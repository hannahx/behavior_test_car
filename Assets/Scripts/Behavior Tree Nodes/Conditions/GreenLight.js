#pragma strict
 
import BehaviourMachine;
 
public class GreenLight extends ConditionNode {
     
    private var i:int;
    private var light : TrafficLight;
    var car : AICar_Script;
 
    function Update () : Status {
    	// To keep track of the closest traffic light.
    	if(car.getClosestTrafficLight() != null)
    	{
    		light = car.getClosestTrafficLight();
	    	if(light.getCurrentColor() == Color.green)
	    	{
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
	            return Status.Running;
	        }
         }
         return Status.Running;
    }
 
    function Reset () {
        super.Reset ();
 
        // My Reset
        i = -1;
    }
}
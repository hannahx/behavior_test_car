#pragma strict
 
import BehaviourMachine;
 
public class RedLight extends ConditionNode {
     
      private var i : int;
//    var lightInfo : CloseToLight;
    private var light : TrafficLight;
    var car : AICar_Script;
 
    function Update () : Status {
    
    	// To keep track of the closest traffic light.
//    	light = lightInfo.getCurrentLight();
    	if(car.getClosestTrafficLight() != null)
    	{
    		light = car.getClosestTrafficLight();
	    	if(light.getCurrentColor() == Color.red)
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
	            return Status.Failure;
	        }
        }
        //return Status.Failure;
    }
 
    function Reset () {
        super.Reset ();
 
        // My Reset
        i = -1;
    }
}
#pragma strict

import BehaviourMachine;
 
public class NewSpeedLimit extends ConditionNode {

	private var i : int;
	var car : AICar_Script; 

	function Start () {
	}

	function Update () : Status { 			

 			if (car.getLimiterEntered() == true)
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

	function Reset () {
		super.Reset ();
	 
	        // My Reset
	    i = -1;
	}
}
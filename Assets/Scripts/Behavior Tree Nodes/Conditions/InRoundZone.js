#pragma strict

import BehaviourMachine;
 
public class InRoundZone extends ConditionNode {

    var car : AICar_Script;
	private var i : int;

	function Start () {
		i = -1;
		if(car.getRoundZone()!=null)
		{
			//Debug.Log(car.name + " in " + car.getRoundZone());
			i = 1;
		}
		
	}

	function Update () : Status {
 		
 			
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
	private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
}
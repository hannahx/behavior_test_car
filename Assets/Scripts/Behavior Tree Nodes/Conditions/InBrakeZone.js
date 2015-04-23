#pragma strict

import BehaviourMachine;
 
public class InBrakeZone extends ConditionNode {

	var brakeZoneContainer : GameObject;
	private var i : int;
	private var brakingPower : float = 1120;
	private var enginePower : float = 0;
	var car : AICar_Script; 
	//var insideZone : Array;
	 
	private var zones : Array;
	var inBrakeZone : boolean;


	function Start () {
		zones = new Array();
	}

	function Update () : Status {
 		zones = brakeZoneContainer.GetComponentsInChildren( BrakeZone );
 			
 		for (zone in zones)
 		{
 			if (car.getZoneEntered() == true)
 			{
 				i = 1;
			}
			else
			{
				i = -1;
			}
 	
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
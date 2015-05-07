#pragma strict

import BehaviourMachine;
 
public class StopOrDrive extends ActionNode {
     
    var car : AICar_Script;
    private var brakePower : float;
    
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
    function Start () 
    {
    	brakePower = car.getBrakePower();
    	if (brakePower == 0)
    	{
			// If the car has no brake power, set break power and slow down.		
    		car.setBrakePower(15);
    		//car.EngineTorque = 50;
    	}
    	else
    	{
    	    // If the car is standing still, begin to drive slowly.
    	    car.setBrakePower(15);
    		//car.EngineTorque = 100;
    	}
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
        // Do stuff
         
        // Never forget to set the node status
        return Status.Success;
    }
 
    // Called when the node ends its execution
    function End () {}
 
    // Called when the owner (BehaviourTree or ActionState) is disabled
    function OnDisable () {}
 
    // This function is called to reset the default values of the node
    function Reset () {}
 
    // Called when the script is loaded or a value is changed in the inspector (Called in the editor only)
    function OnValidate () {}
    
    private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
}
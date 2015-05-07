#pragma strict

import BehaviourMachine;
 
public class MoveTowardsNextPoint extends ActionNode {
     
 	var car : AICar_Script;
 	private var carPos : Vector3;
    private var nextPoint : Point;
     
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
    function Start () 
    {
    	nextPoint = car.getNextPoint();
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
        // Do stuff
        nextPoint = car.getNextPoint();
        if(nextPoint != null)
        {
	        car.Drive(nextPoint.transform.position);
	        
	        carPos = car.getRigidbody().transform.position;
	        if (Vector3.Distance(carPos, nextPoint.transform.position)< 6) 			
			{
				return Status.Success;
			}
        }
        // Never forget to set the node status
        return Status.Running;
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
//#pragma strict

import BehaviourMachine;

/** This class rotates the car to the correct direction (is called after the car has been generated in order to not point backwards) */
public class RotateCar extends ActionNode {
     
	var car : AICar_Script;
    private var path;
    private var startPoint : Point;
    private var nextPoint : Point;
     
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
    function Start () 
    {
    	path = car.getPath();
    	startPoint = path[0];
    	nextPoint = path[1];   	
    	var dir : Vector3 = (nextPoint.transform.position - startPoint.transform.position).normalized;
    	car.transform.rotation = Quaternion.LookRotation(dir);
    	
    	if(car.getTakenPosition())
    	{
    		Debug.Log("Change pos...");
    		car.transform.position -= car.transform.forward*30;//TODO if no other car is there!!
    	}
    	
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
        if(startPoint!=null)
        	return Status.Success;
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
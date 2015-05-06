#pragma strict
 
import BehaviourMachine;
 
public class ObeySpeedLimit extends ActionNode {
     
    var car : AICar_Script;
    private var svl : SimpleVelocityLimiter;
    
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
    function Start () 
    {
		
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
    
        svl = car.GetComponent(SimpleVelocityLimiter); 
		var currentBP = car.BrakePower;
		car.BrakePower = 0;   	
		if (car.getSpeedLimit() == 30)
    	{
    		svl.dragStartVelocity = 4;
    		svl.dragMaxVelocity = 9;
    		svl.maxVelocity =  9;
    	}
    	else if (car.getSpeedLimit() == 50)
    	{
    		svl.dragStartVelocity = 9;
    		svl.dragMaxVelocity = 14;
    		svl.maxVelocity =  14;
    	}
    	else if (car.getSpeedLimit() == 70)
    	{
    		svl.dragStartVelocity = 14;
    		svl.dragMaxVelocity = 19;
    		svl.maxVelocity =  19;
    	}
    	else 
    	{
    		svl.dragStartVelocity = 20;
    		svl.dragMaxVelocity = 25;
    		svl.maxVelocity =  25;
    	}
    	car.BrakePower = currentBP;
         
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
}
#pragma strict
 
import BehaviourMachine;
 
public class Drive extends ActionNode {
     
    var car : AICar_Script;
    private var brakePower : float;
    
     
    // Called when the node starts its execution
    function Start () 
    {
    	
    	car.setBrakePower(0);
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
        // Do stuff
         
        // Never forget to set the node status
        return Status.Success;
    }
}
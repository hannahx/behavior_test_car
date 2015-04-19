#pragma strict
 
import BehaviourMachine;
 
public class Drive extends ActionNode {
     
    var car : AICar_Script;
    private var brakePower : float;
    
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
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
 
    // Called when the node ends its execution
    function End () {}
 
    // Called when the owner (BehaviourTree or ActionState) is disabled
    function OnDisable () {}
 
    // This function is called to reset the default values of the node
    function Reset () {}
 
    // Called when the script is loaded or a value is changed in the inspector (Called in the editor only)
    function OnValidate () {}
}
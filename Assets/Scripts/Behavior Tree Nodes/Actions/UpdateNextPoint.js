//#pragma strict

import BehaviourMachine;
 
public class UpdateNextPoint extends ActionNode {
     
	var car : AICar_Script;
 	private var carPos : Vector3;
    private var nextPoint : Point;
    private var currentNextPoint : Point;
    private var path : Array;
    private var indexInPath;
     
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
    function Start () 
    {
    	path = car.getPath();
    }
     
    // This function is called when the node is in execution
    function Update () : Status
    {
        indexInPath = car.getIndexInPath();
        carPos = car.getRigidbody().transform.position;
        currentNextPoint = car.getNextPoint();
        //Debug.Log(indexInPath + " " + path.length);
		nextPoint = path[indexInPath];
		car.setNextPoint(nextPoint);
		if(indexInPath+1<=path.length)
		{
			car.setIndexInPath(indexInPath+1);
			//Debug.Log("Next point updated: next point is " + car.getNextPoint());
			return Status.Success;
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
    
    //private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
}
#pragma strict
import BehaviourMachine;

public class HandleBrakeZone extends ActionNode {

	var car : AICar_Script;
    //private var brakePower : float;
    private var AICar : GameObject;
	private var brakingPower : float = 220;
	//private var enginePower : float = 0;
	private var insideZone : Array;
	var brakeZoneContainer : GameObject; 
	private var zones : Array;
	var inBrakeZone : boolean;
	
	// Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
	function Start () 
	{
		zones = new Array();
		insideZone = new Array();
	}

	// This function is called when the node is in execution
    function Update () : Status {
        
 		zones = brakeZoneContainer.GetComponentsInChildren( BrakeZone );
		
		for (zone in zones)
		{
			// Find a zone that contains car(s).
			if ( zone == car.getActiveZone() )
			{
			var zone2 : BrakeZone = zone as BrakeZone;
			insideZone = zone2.getCarsInZone();
			//Debug.Log(insideZone + "  inside zone");
			// Stop the car.
			car.BrakePower = (brakingPower);
			//car.EngineTorque = (enginePower);
			
				if (insideZone.length == 1)
				{
				// If the car is alone in the zone, then it can drive away.
					//Debug.Log("Cars in zone:  " + insideZone.length);
					car.BrakePower = 0;
					//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
					//Debug.Log("Häst  " + car.name );
				}
				// If the car was the first to enter the zone, then it can drive away first.
				else if (insideZone.length != 1 && car == insideZone[0])
				{
						Debug.Log("Cars in zone:  " + insideZone.length);
						Debug.Log(insideZone);
						car.BrakePower = 0;
						//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
						//Debug.Log("Kobra  " + car.name);
					
				}				
			}				
		}
         
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
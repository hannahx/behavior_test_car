//#pragma strict
import BehaviourMachine;

public class HandleZones_beta extends ActionNode {

	var car : AICar_Script;
    private var AICar : GameObject;
	private var brakingPower : float = 220;
	private var enginePower : float = 0;
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
//				if (car.getStopSign() == false && car.getTriangleSign() == false)
//				{
//					//Debug.Log("Right rule applies!");
//					// Priority to the right 
//					if (insideZone.length == 1)
//					{
//					// If the car is alone in the zone, then it can drive away.
//						//Debug.Log("Cars in zone:  " + insideZone.length);
//						car.BrakePower = 0;
//						Debug.Log(car.name + " was alone and could leave.");
//						//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
//					}
//					// If the car was the first to enter the zone, then it can drive away first.
////					else if (insideZone.length > 1 && car == insideZone[0])
//					else if (insideZone.length > 1 && car.getRightCar() == false)
//					{
//							Debug.Log(car.name + " has car to the right: " + car.getRightCar());
//
//							//Debug.Log("Cars in zone:  " + insideZone.length);
//							car.BrakePower = 0;
//							//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
//						
//					}
//				}
								
				//else 
				if (car.getStopSign()==true && car.getTriangleSign() == false)
				{
					Debug.Log("Stop rule applies!");
					//car.BrakePower = (brakingPower); //making sure the car stops no matter what.
					//car.EngineTorque = (enginePower);
					//Debug.Log("vel. " + car.rigidbody.velocity.magnitude);
					Debug.Log("bil nära: " + car.getCloseCar());
					if (car.rigidbody.velocity.magnitude <= 0.2 ) {
					 // follow the rules for a stop sign
					 	if (insideZone.length == 1)
						{
							// If the car is alone in the zone, then it can drive away.
							//Debug.Log(car.name + "  Stop, ensam");
							//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
							car.BrakePower = 0;
							//Debug.Log("Spårutskrift vid omstart!!");
							
						}
//						else if (insideZone.length > 1 && car.getCloseCar() == false)
//						{
//						// använder sensorerna på bägge sidorna, men man skulle kunna göra
//						// det mer precist så att den inte reagerar på bilar som ska svänga
//						// in på den gatan den står på...
//							car.BrakePower = 0;
//							car.EngineTorque = 100;
//						
//						}
					
					}
				
				}
//				else
//				{
//					Debug.Log("Triangle rule applies!");		
//				 // follow the rules for triangle sign
//				 if (insideZone.length == 1)
//						{
//							// If the car is alone in the zone, then it can drive away.
//							//Debug.Log("Cars in zone:  " + insideZone.length);
//							car.BrakePower = 0;
//						}
//						else if (insideZone.length > 1 && car.getCloseCar() == false)
//						{
//						// använder sensorerna på bägge sidorna, men man skulle kunna göra
//						// det mer precist så att den inte reagerar på bilar som ska svänga
//						// in på den gatan den står på...
//							car.BrakePower = 0;
//						
//						}
//				}				
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
    
    private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
    
}
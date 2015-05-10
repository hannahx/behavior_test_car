#pragma strict
import BehaviourMachine;

public class HandleInterZone extends ActionNode {

	var car : AICar_Script;
    //private var brakePower : float;
    private var AICar : GameObject;
	private var brakingPower : float = 220;
	private var enginePower : float = 0;
	private var insideZone : Array;
	var brakeZoneContainer : GameObject; 
	private var zones : Array;
	private var inBrakeZone : boolean;
	
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

			

				if(car.getStopSign()==true ||  car.getTriangleSign() == true && insideZone.length > 1)
					// Stop the car if the car has a stop sign...
					car.BrakePower = (brakingPower);
				
				if (car.getStopSign()==true || car.getTriangleSign() == true)
				{
					turningDirection();
					
					if (insideZone.length == 1 && Time.time > car.getStopTimer()+2)
					{	
						if(car.longerSensorLength-10>0)
						{
							// Make the sensors shorter again.
//							car.sensorLength -= 10;
//							car.longerSensorLength -= 10;
						}
						if (car.getStopSign()==true && car.getTriangleSign() == false)
						{
							Debug.Log("Stop sign, no other car in zone.");
							car.BrakePower = 0;
							car.setStopSign(false);
						}
						else if (car.getTriangleSign()==true && car.getStopSign() == false)
						{
							Debug.Log("Triangle sign!");
							car.BrakePower = 0;
							car.setTriangleSign(false);
						}
//						else if (car.getHuvudledSign() == true)
//						{
//							car.BrakePower = 0;
//							car.setHuvudledSign(false);
//						}
					}
					else if (insideZone.length > 1 && car.getCloseCar() == false && Time.time > car.getStopTimer()+2)
					{
						if(car.longerSensorLength-10>0)
						{
							//car.sensorLength -= 10;
//							car.longerSensorLength -= 10;
						}
						if (car.getStopSign()==true )
						{	
							//Debug.Log("Cars in zone:  " + insideZone.length);
							Debug.Log("Stop sign, no car close");
							car.BrakePower = (brakingPower);
							car.setStopSign(false);
							//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
						}
						else if (car.getTriangleSign()==true)
						{	
							//Debug.Log("Cars in zone:  " + insideZone.length);
							car.BrakePower = 0;
							car.setTriangleSign(false);
							//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
						}
						
					}
				}
//				else
//				{
//					Debug.Log("No sign...");
//					
//					//Debug.Log("Right rule applies!");
//					// Priority to the right 
//					if (insideZone.length == 1)
//					{
//					// If the car is alone in the zone, then it can drive away.
//						//Debug.Log("Cars in zone:  " + insideZone.length);
//						car.BrakePower = 0;
//						//Debug.Log(car.name + " was alone and could leave.");
//						//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
//					}
//					// If the car don't notice another car coming from right...
//					else if (insideZone.length > 1 && car.getRightCar() == false)
//					{
//							Debug.Log(car.name + " has car to the right: " + car.getRightCar());
//							car.BrakePower = 0;
//							//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
//						
//					}
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
    
    function turningDirection () {
    	var c : AICar_Script;
    	for (c in insideZone){
    		if (c == car){
    			var otherTransform : Transform;
    			var currentPointIndex = c.getIndexInPath();
    			var currentPath = c.getPath();
    			var currentPoint : Point = currentPath[currentPointIndex-1] as Point;
    			var p : int = 0;
    			
    			if (currentPointIndex<currentPath.length)
    			{
	    			var nextPoint : Point =  currentPath[currentPointIndex];
	    			otherTransform = nextPoint.transform;
			    	var relativePoint = currentPoint.transform.InverseTransformPoint(otherTransform.position); 
					var rend = nextPoint.GetComponent.<Renderer>();
					rend.material.color = Color.blue;
					
					var carDir : Vector3;
					var vectr : Vector3;
					var vectr3 : Vector3;
					var dotProd : float;
					var dotProd2 : float;
					
					Debug.Log(relativePoint.x + " akgjb " + relativePoint.z);
									
					carDir = c.getRigidbody().transform.position.forward.normalized;
					vectr = (c.getRigidbody().transform.position - nextPoint.transform.position).normalized;
					vectr3 = (c.getRigidbody().transform.position - currentPoint.transform.position).normalized;
					dotProd = Vector3.Dot(carDir,vectr);
					dotProd2 = Vector3.Dot(carDir,vectr3);
										
					if (dotProd-dotProd2 < 0.2 && dotProd-dotProd2 > -0.2)
					{
						Debug.Log("Straight ahead 1,2,3,4,5...!");
					}

					else if (relativePoint.x < 0.0 )
					{
						if (relativePoint.z > 0.0)
						{	
								Debug.Log("Turning Right 1!");
						}	
						else if (relativePoint.z < 0.0)
						{
							if (relativePoint.x < -0.1)
							{
								Debug.Log("Turning Right 4!");
							}
							else
							{
								Debug.Log("Turning Left 2!");
							}
						}
						else 
						{
							Debug.Log("Turning RightOrLeft 3!");	// Kan vara höger.. något fel iaf
						}
					}			
					else if (relativePoint.x > 0.0)
					{
						if (relativePoint.z > 0.0)
						{	
							if (relativePoint.z > 0.1)
							{
								Debug.Log("Turning Left 1!");
							}
							else
							{
								Debug.Log("Turning Right 3!");
							}
						}
						else if (relativePoint.z < 0.0)
						{
								Debug.Log("Turning Right 2!");
						}
						else
						{
							Debug.Log("Turning Left 3.2!");	
						}
					}				
					else if (relativePoint.x == 0.0 && relativePoint.z != 0.0)
					{
						Debug.Log("Turning Right 5!");
					}
					else
					{
						Debug.Log("Straight ahead 7!");
					}
 		 		
 		 		}

 		 	}
 		 }
    }
    
    private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
    
}
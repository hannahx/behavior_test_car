#pragma strict
import BehaviourMachine;

public class HandleInterZone extends ActionNode {

	var car : AICar_Script;
	var brakeZoneContainer : GameObject; 
    private var AICar : GameObject;
	private var brakingPower : float = 220;
	private var enginePower : float = 0;
	private var insideZone : Array;
	private var zones : Array;
	private var inBrakeZone : boolean;
	private var carToTheRight : boolean;
	private var zoneType : int;
	private var otherCar2 : AICar_Script;
	private var zone2 : BrakeZone;
	
    function Awake () {}
 
    function OnEnable () {}
     
	function Start () 
	{
		zones = new Array();
		insideZone = new Array();			
	}

	// This function is called when the node is in execution
 	function Update () : Status {
        
			zone2  = car.getActiveZone();
			insideZone = zone2.getCarsInZone();
			zoneType = zone2.getZoneType();
			enterDirections(zone2);
			//Debug.Log("Collider points " + zone2.getColliderPoints());

				if(car.getStopSign()==true ||  car.getTriangleSign() == true && insideZone.length > 1)
					// Stop the car if the car has a stop sign.
					car.BrakePower = (brakingPower);
				
				if (car.getStopSign()==true || car.getTriangleSign() == true)
				{
					
					if (insideZone.length == 1 && Time.time > car.getStopTimer()+2)
					{	
						if (car.getStopSign()==true && car.getTriangleSign() == false)
						{
							Debug.Log("Stop sign, no other car in zone.");
							car.BrakePower = 0;  
							setThingsFalse();
							car.setStopSign(false);
						}
						else if (car.getTriangleSign()==true && car.getStopSign() == false)
						{
							car.BrakePower = 0;
							setThingsFalse();
							car.setTriangleSign(false);
						}
					}
					//Kanske stämmer.
					else if (insideZone.length > 1 && Time.time > car.getStopTimer()+3)
					{
						if (car.getStopSign()==true )
						{	
							//Debug.Log("Stop sign, car close");
							Debug.Log("Triangle sign, no other car in zone.");
							car.BrakePower = 0;
							zone2.removeColliderPoint(car);
							car.setTriangleSign(false);
						}
						else if (car.getTriangleSign()==true)
						{	
							car.BrakePower = (brakingPower);
							setThingsFalse();
							car.setTriangleSign(false);	
						}			
					}
				}
				else
				{
					// Handle a crossing without a sign... 
					// Priority to the right or other priority
					if (insideZone.length == 1)
					{
					// If the car is alone in the zone, then it can drive away.
						car.BrakePower = 0;							
						setThingsFalse();
					}
					else if (insideZone.length > 1 && zoneType ==1)
					{
						
						for (otherCar in insideZone)
						{
							otherCar2 = otherCar as AICar_Script;
							if ( otherCar2.getStopSign()== false && otherCar2.getTriangleSign()== false && otherCar2 != car && otherCar2 != null )
							{
								if ( car.getTurningLeft()==true && otherCar2.getGoingStraight()==true )
								{
									// The car must yield to let the other pass
								  	car.BrakePower = (brakingPower);
								}
								else if ( car.getTurningLeft() == true && otherCar2.getTurningRight() == true )
								{
									// The car must yield to let the other pass
									car.BrakePower = (brakingPower);
								}
								else if (car.getTurningLeft() == true && otherCar2.getTurningLeft() == true)
								{
										if (car.getPriority() < otherCar2.getPriority())
										{
											car.BrakePower = (brakingPower);
										}
										else if (car.getPriority() == otherCar2.getPriority())
										{
											car.setPriority(Random.Range(0,100+1));
										}
										else
										{
											car.BrakePower = 0;
											setThingsFalse();
										}
								}
								else
								{
									// OK to drive.	
									car.BrakePower = 0;
									setThingsFalse();
	
								}
							}
							else
							{
									car.BrakePower = 0;
									setThingsFalse();	
														}
						
						}
					}
					else if (insideZone.length > 1 && zoneType == 2)
					{
						var carOnRight : boolean = car.getRightCar();
						for (otherCar in insideZone)
						{						
							otherCar2 = otherCar as AICar_Script;
							if (carOnRight == true ) // Kan behövas läggas till något mer condition...
							{
								car.BrakePower = (brakingPower);
							}
							else if (car.getLeftCar() == false && car.getRightCar() == false && car.getOppositeCar() == true )
							{
								if (car.getTurningLeft() == true && otherCar2.getTurningRight() == true)
								{
									car.BrakePower = (brakingPower);
								}
							} // Kan behövas läggas till några grejer mer så att det funkar för 4-way junctions

							else if ( car.getPriority() < otherCar2.getPriority() )
							{
								car.BrakePower = (brakingPower);
							}
							else
							{
								car.BrakePower = 0;
								setThingsFalse();

							}
						}
					}
				}  // Här tar feta else-satsen slut													
//			}				
//		}
         
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

 	function enterDirections(zone : BrakeZone)
 	{
 		var colliderPoints = zone.getColliderPoints();
 		if(colliderPoints.length > 1)
 		{
	 		for (point2 in colliderPoints)
	 		{
	 			var point : Vector3 = point2;
	 			if (point != car.getColliderPoint())
		 			{
		 			
		 			var carPos : Vector3 = car.getRigidbody().transform.position;
					var carDir : Vector3 = car.getRigidbody().transform.forward.normalized;
		 			var collDir : Vector3 = (point - carPos).normalized;
					var angle = Vector3.Angle(collDir, carDir);
					var cross : Vector3 = Vector3.Cross(collDir, carDir);
		
					
					if (cross.y > 0) //this means left angle  
				    {
				    	angle = -angle;
					}
					//Debug.Log(car.name + " angle " + angle + " colliding point: " + point + " Own coll point " + car.getColliderPoint() + " cross.y: " + cross.y);	
	    
					if (angle > -50 && angle < 10)
					{
						//Debug.Log(car.name + ": Car from opposite direction? ...on " + point + " ... angle " + angle + " ... forward dir: " + carDir);
						car.setOppositeCar(true);
					}
					else if (angle < 0)//< -32 && angle > -175)
					{
						//Debug.Log(car.name + ": Car to Left? ....on " + point + " ... angle " + angle + " ... forward dir: " + carDir);
						car.setLeftCar(true);
					}
					else if (angle > 0)//32 && angle < 175)
					{
						//Debug.Log(car.name + ": Car to Right? ....on " + point + " ... angle " + angle + " ... forward dir: " + carDir);
						car.setRightCar(true);
					}
		
				}
	 		}
 		}
 	}
 	
 	function setThingsFalse()
 	{
		zone2.removeColliderPoint(car);
		car.setPriority(0);
		car.setLeftCar(false);
		car.setRightCar(false);
		car.setOppositeCar(false);
		car.setGoingStraight(false);
		car.setTurningLeft(false);
		car.setTurningRight(false);
							
 	}
 	  
    private function SilenceWarnings() : void 
    { 
    var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); 
    } 
    
}
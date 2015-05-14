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
	private var carToTheRight : boolean;
	private var zoneType : int;
	private var otherCar2 : AICar_Script;
	
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
        
 		//zones = brakeZoneContainer.GetComponentsInChildren( BrakeZone );
		turningDirection(1);
		
		var zone2 : BrakeZone = car.getActiveZone();
		
		//for (zone in zones)
		//{
			// Find a zone that contains car(s).
			//if ( zone == car.getActiveZone() )
			//{
			//var zone2 : BrakeZone = zone as BrakeZone;
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
							car.BrakePower = (brakingPower);  // SKa egentligen vara 0
							car.setStopSign(false);
						}
						else if (car.getTriangleSign()==true && car.getStopSign() == false)
						{
							Debug.Log("Triangle sign, no other car in zone.");
							car.BrakePower = 0;
							zone2.removeColliderPoint(car);
							car.setTriangleSign(false);
						}
					}
					//Detta måste nog skrivas om
					else if (insideZone.length > 1 && car.getCloseCar() == false && Time.time > car.getStopTimer()+2)
					{
						if (car.getStopSign()==true )
						{	
							Debug.Log("Stop sign, car close");
							car.BrakePower = (brakingPower);
							car.setStopSign(false);
						}
						else if (car.getTriangleSign()==true && car.getRightCar() == true || car.getTriangleSign()==true && car.getRightCar() )
						{	
							car.BrakePower = (brakingPower);
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
						zone2.removeColliderPoint(car);
						car.setGoingStraight(false);
						car.setTurningLeft(false);
						car.setTurningRight(false);
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
										else if (car.getPriority() > otherCar2.getPriority())
										{
											car.setPriority(Random.Range(0,100+1));
										}
										else
										{
											car.BrakePower = 0;
											zone2.removeColliderPoint(car);
											car.setPriority(0);
											car.setGoingStraight(false);
											car.setTurningLeft(false);
											car.setTurningRight(false);
										}
								}
								else
								{
									// OK to drive.	
									car.BrakePower = 0;
									zone2.removeColliderPoint(car);
									car.setPriority(0);
									car.setGoingStraight(false);
									car.setTurningLeft(false);
									car.setTurningRight(false);
								}
							}
							else
							{
									car.BrakePower = 0;
									zone2.removeColliderPoint(car);
									car.setPriority(0);
									car.setGoingStraight(false);
									car.setTurningLeft(false);
									car.setTurningRight(false);							}
						}
					}
					else if (insideZone.length > 1 && zoneType == 2)
					{
						var carOnRight : boolean = car.getRightCar();
						for (otherCar in insideZone)
						{						
							otherCar2 = otherCar as AICar_Script;
							if (carOnRight == true) // Kan behövas läggas till något mer condition...
							{
								car.BrakePower = (brakingPower);
							}
							else if ( car.getPriority() < otherCar2.getPriority() )
							{
								// Någon måste köra, något med priority!!! (För fyrvägskorsning bla).
								//Någon måste äta glass!!
								// Mycket sant!
								car.BrakePower = (brakingPower);
							}
							else
							{
								car.BrakePower = 0;
								zone2.removeColliderPoint(car);
								car.setPriority(0);
								car.setGoingStraight(false);
								car.setTurningLeft(false);
								car.setTurningRight(false);
							}
						}
					}
				}  // Här tar feta else-satsen slut													
			//}				
		//}
         
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
    
    function turningDirection (t : int) {
    			var otherTransform : Transform;
    			var currentPointIndex = car.getIndexInPath();
    			var currentPath = car.getPath();
    			var p : int = t;
    			if (currentPointIndex+p<currentPath.length)
    			{
    				
    				var currentPoint : Point = currentPath[currentPointIndex-1] as Point;
	    			var nextPoint : Point =  currentPath[currentPointIndex+p];
	    			otherTransform = nextPoint.transform;
			    	var relativePoint = currentPoint.transform.InverseTransformPoint(otherTransform.position); 
//					var rend = nextPoint.GetComponent.<Renderer>();
//					rend.material.color = Color.blue;
//					
					var carDir : Vector3;
					var vectr : Vector3;
					var vectr3 : Vector3;
					var dotProd : float;
					var dotProd2 : float;
					
					//Debug.Log(relativePoint.x + " akgjb " + relativePoint.z);
									
					carDir = car.getRigidbody().transform.position.forward.normalized;
					vectr = (car.getRigidbody().transform.position - nextPoint.transform.position).normalized;
					vectr3 = (car.getRigidbody().transform.position - currentPoint.transform.position).normalized;
					dotProd = Vector3.Dot(carDir,vectr);
					dotProd2 = Vector3.Dot(carDir,vectr3);
										
					if (dotProd-dotProd2 < 0.2 && dotProd-dotProd2 > -0.2)
					{
						//Debug.Log("Straight ahead 1,2,3,4,5...!");
						car.setGoingStraight(true);
						car.setTurningLeft(false);
						car.setTurningRight(false);
					}

					else if (relativePoint.x < 0.0 )
					{
						if (relativePoint.z > 0.0)
						{	
							//Debug.Log("Turning Right 1!");
							car.setGoingStraight(false);
							car.setTurningLeft(false);
							car.setTurningRight(true);
						}	
						else if (relativePoint.z < 0.0)
						{
							if (relativePoint.x < -0.1)
							{
								//Debug.Log("Turning Right 4!");
								car.setGoingStraight(false);
								car.setTurningLeft(false);
								car.setTurningRight(true);
							}
							else
							{
								//Debug.Log("Turning Left 2!");
								car.setGoingStraight(false);
								car.setTurningLeft(true);
								car.setTurningRight(false);
							}
						}
						else 
						{
								//Debug.Log("Turning RightOrLeft 3!");	// Kan vara höger.. något fel iaf
								car.setGoingStraight(false);
								car.setTurningLeft(false);
								car.setTurningRight(true);
						}
					}			
					else if (relativePoint.x > 0.0)
					{
						if (relativePoint.z > 0.0)
						{	
							if (relativePoint.z > 0.1)
							{
								//Debug.Log("Turning Left 1!");
								car.setGoingStraight(false);
								car.setTurningLeft(true);
								car.setTurningRight(false);
							}
							else
							{
								//Debug.Log("Turning Right 3!");
								car.setGoingStraight(false);
								car.setTurningLeft(false);
								car.setTurningRight(true);
							}
						}
						else if (relativePoint.z < 0.0)
						{
								//Debug.Log("Turning Right 2!");
								car.setGoingStraight(false);
								car.setTurningLeft(false);
								car.setTurningRight(true);
						}
						else
						{
							//Debug.Log("Turning Left 3.2!");									
							car.setGoingStraight(false);
							car.setTurningLeft(true);
							car.setTurningRight(false);
						}
					}				
					else if (relativePoint.x == 0.0 && relativePoint.z != 0.0)
					{
						//Debug.Log("Turning Right 5!");
						car.setGoingStraight(false);
						car.setTurningLeft(false);
						car.setTurningRight(true);
						
					}
					else
					{
						//Debug.Log("Straight ahead 7!");
						car.setGoingStraight(true);
						car.setTurningLeft(false);
						car.setTurningRight(false);
					}
 		 		
 				}
 	}
 	function enterDirections(zone : BrakeZone)
 	{
 		//var point2 : Vector3;
 		var colliderPoints = zone.getColliderPoints();
 		if(colliderPoints.length > 1)
 		{
	 		for (point2 in colliderPoints)
	 		{
	 			//Debug.Log("collider points length: " + colliderPoints.length);
	 			var point : Vector3 = point2;
	 			if (point != car.getColliderPoint())
		 			{
		 			
		 			var carPos : Vector3 = car.getRigidbody().transform.position;
		 			
		 			//point.y = carPos.y;
		 			var carDir : Vector3 = car.getRigidbody().transform.forward.normalized;
		 			//var carDir = carPos.forward.normalized;
		 			var collDir : Vector3 = (point - carPos).normalized;

					var angle = Vector3.Angle(collDir, carDir);
					
					//var cross : Vector3 = Vector3.Cross(carDir, collDir);
					var cross : Vector3 = Vector3.Cross(collDir, carDir);
					
					//var sign : float = Mathf.Sign (Vector3.Dot(carDir, collDir));
					//Debug.Log(car.name + " cross " + cross);
					//Debug.Log(car.name + " sign " + sign);
					
					if (cross.y > 0) //this means left angle  
				    {
				    	angle = -angle;
					}
					//Debug.Log(car.name + " angle " + angle + " colliding point: " + point + " Own coll point " + car.getColliderPoint() + " cross.y: " + cross.y);
					
	    
					if (angle > -50 && angle < 10)
					{
						Debug.Log(car.name + ": Car from opposite direction? ...on " + point + " ... angle " + angle + " ... forward dir: " + carDir);
					}
					else if (angle < 0)//< -32 && angle > -175)
					{
						Debug.Log(car.name + ": Car to Left? ....on " + point + " ... angle " + angle + " ... forward dir: " + carDir);
						//car.setLeftCar(true);
					}
					else if (angle > 0)//32 && angle < 175)
					{
						Debug.Log(car.name + ": Car to Right? ....on " + point + " ... angle " + angle + " ... forward dir: " + carDir);
						//car.setRightCar(true);
					}
		
				}
	 		}
 		}
 	}
 	  
    private function SilenceWarnings() : void 
    { 
    var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); 
    } 
    
}
//#pragma strict

import System.Collections.Generic;
private var enterCar : AICar_Script; 
private var exitCar : AICar_Script; 
private var insideZone : Array;
private var carList : List.<AICar_Script>;
private var contactPos : Vector3;
private var colliderPoints : Array;
private var collisionList : List.<Vector3>;
var zoneType : int;

function Start() {

	insideZone = new Array();
	carList = new List.<AICar_Script>();
	colliderPoints = new Array();
	collisionList = new List.<Vector3>();
}

function OnTriggerEnter (c : Collider) {

	var parentparent = c.gameObject.transform.parent.gameObject;
	enterCar = parentparent.GetComponent(AICar_Script);
	//Debug.Log(enterCar.name + "  enters inter zone!");
	
	var collPoint = enterCar.getRigidbody().transform.position;
	collisionList.Add(collPoint);
	enterCar.setColliderPoint(collPoint);
	enterCar.setActiveZone(this);
	enterCar.setZoneEntered(true);
	turningDirection(1);	

	enterCar.setStopTimer(Time.time);
	carList.Add(enterCar);
	enterCar.setPriority(Mathf.Floor(Random.Range(0,100+1)));
	//Debug.Log(enterCar.name + " collided with zone at " + enterCar.getColliderPoint());
	//turningDirection(1);
}

function OnTriggerExit (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	exitCar = parentparent.GetComponent(AICar_Script);
	exitCar.BrakePower = 0;
	exitCar.setActiveZone(null);
	exitCar.setZoneEntered(false);
	var contactPos : Vector3 = exitCar.getColliderPoint();
	for(var k = 0; k < carList.Count; k++)
	{
		var someCar : AICar_Script = carList[k] as AICar_Script ;
		if(someCar == exitCar && exitCar.getZoneEntered() == false)
		{	
			exitCar.setActiveZone(null);
			exitCar.setZoneEntered(false);	
			carList.RemoveAt(k);		

			//Debug.Log(exitCar.name + " removed");
		}
		
	}
		
	carList.Remove(exitCar);
	collisionList.Remove(contactPos);

//	Debug.Log(exitCar.name + " left zone, " + carList.Count + " cars left");	
}

function getCarsInZone()
{
	insideZone = carList.ToArray();
	return insideZone;
}

function getColliderPoints()
{
	colliderPoints = collisionList.ToArray();
	return colliderPoints;
}

function removeColliderPoint(car : AICar_Script)
{
	var theCar : AICar_Script = car;
	var contactPosition : Vector3 = theCar.getColliderPoint();
	for(var l = 0; l < collisionList.Count; l++)
		{
			var somePoint : Vector3 = collisionList[l] ;
			if(somePoint == contactPosition)
			{	
				collisionList.RemoveAt(l);		
			}
			
		}
		collisionList.Remove(contactPos);
}

function getZoneType()
{
	return zoneType;
}

function turningDirection (t : int) {
    			var currentPointIndex = enterCar.getIndexInPath();
    			var currentPath = enterCar.getPath();
    			var p : int = t;
    			if (currentPointIndex+p<currentPath.length)
    			{
    				
    				var currentPoint : Point = currentPath[currentPointIndex-1] as Point;
	    			var nextPoint : Point =  currentPath[currentPointIndex+p];
//					var rend = nextPoint.GetComponent.<Renderer>();
//					rend.material.color = Color.blue;
					
					carDir = enterCar.getRigidbody().transform.forward.normalized;				
					
					var carPos : Vector3 = enterCar.getRigidbody().transform.position;
		 			var pointDir : Vector3 = (nextPoint.transform.position - carPos).normalized;
					var angle = Vector3.Angle(pointDir, carDir);
					var cross : Vector3 = Vector3.Cross(pointDir, carDir);
					
					
					if (cross.y > 0) //this means left angle  
				    {
				    	angle = -angle;
					}
					
	    
					if (angle > -10 && angle < 10)
					{
						//Debug.Log("Going Straight 0!");
						enterCar.setGoingStraight(true);
						enterCar.setTurningLeft(false);
						enterCar.setTurningRight(false);
					}
					else if (angle < 0)
					{
						//Debug.Log("Going Left 0");
						enterCar.setGoingStraight(false);
						enterCar.setTurningLeft(true);
						enterCar.setTurningRight(false);
					}
					else
					{
						//Debug.Log("Going Right");
						enterCar.setGoingStraight(false);
						enterCar.setTurningLeft(false);
						enterCar.setTurningRight(true);
					}
 				}
 }

private function SilenceWarnings() : void 
{
 var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); 
 } 
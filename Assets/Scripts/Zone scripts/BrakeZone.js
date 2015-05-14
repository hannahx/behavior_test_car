//#pragma strict

import System.Collections.Generic;
private var enterCar : AICar_Script; 
private var exitCar : AICar_Script; 
<<<<<<< HEAD
private var insideZone : Array;
private var carList : List.<AICar_Script>;
private var contactPos : Vector3;
private var colliderPoints : Array;
private var collisionList : List.<Vector3>;
=======
var insideZone : Array;
var list : List.<AICar_Script>;
private var contact : ContactPoint;
var contactPos : Vector3;
var colliderPoints : Array;
var list2 : List.<Vector3>;
>>>>>>> origin/master
var zoneType : int;

function Start() {

	insideZone = new Array();
<<<<<<< HEAD
	carList = new List.<AICar_Script>();
	colliderPoints = new Array();
	collisionList = new List.<Vector3>();
=======
	list = new List.<AICar_Script>();
	colliderPoints = new Array();
	list2 = new List.<Vector3>();
>>>>>>> origin/master
}

function OnTriggerEnter (c : Collider) {

	var parentparent = c.gameObject.transform.parent.gameObject;
	enterCar = parentparent.GetComponent(AICar_Script);
	//Debug.Log(enterCar.name + "  enters inter zone!");
	
	var collPoint = enterCar.getRigidbody().transform.position;
<<<<<<< HEAD
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
=======
	list2.Add(collPoint);
	enterCar.setColliderPoint(collPoint);
		
	enterCar.setActiveZone(this);
	enterCar.setZoneEntered(true);
//	Debug.Log(enterCar.name + " " + enterCar.getZoneEntered());
	enterCar.setStopTimer(Time.time);
	list.Add(enterCar);
	enterCar.setPriority(Mathf.Floor(Random.Range(0,100+1)));
	//Debug.Log(enterCar.name + " has priority " + enterCar.getPriority());
	
	Debug.Log(enterCar.name + " collided with zone at " + enterCar.getColliderPoint());
>>>>>>> origin/master
}

function OnTriggerExit (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	exitCar = parentparent.GetComponent(AICar_Script);
	exitCar.BrakePower = 0;
	exitCar.setActiveZone(null);
	exitCar.setZoneEntered(false);
	var contactPos : Vector3 = exitCar.getColliderPoint();
<<<<<<< HEAD
	for(var k = 0; k < carList.Count; k++)
=======
	for(var k = 0; k < list.Count; k++)
>>>>>>> origin/master
	{
		var someCar : AICar_Script = carList[k] as AICar_Script ;
		if(someCar == exitCar && exitCar.getZoneEntered() == false)
		{	
			exitCar.setActiveZone(null);
			exitCar.setZoneEntered(false);	
<<<<<<< HEAD
			carList.RemoveAt(k);		
=======
			list2.RemoveAt(k);		

			//Debug.Log(exitCar.name + " removed");
		}
		
	}
	
	for(var l = 0; l < list2.Count; l++)
	{
		var somePoint : Vector3 = list2[l];
		if(somePoint == contactPos)
		{	
//			exitCar.setColliderPoint(null);	
			list.RemoveAt(k);		
>>>>>>> origin/master

			//Debug.Log(exitCar.name + " removed");
		}
		
	}
<<<<<<< HEAD
		
	carList.Remove(exitCar);
	collisionList.Remove(contactPos);

//	Debug.Log(exitCar.name + " left zone, " + carList.Count + " cars left");	
=======
	list.Remove(exitCar);
	list2.Remove(contactPos);
//	exitCar.setGoingStraight(false);
//	exitCar.setTurningLeft(false);
//	exitCar.setTurningRight(false);
//	enterCar.setPriority(false);
//	Debug.Log(exitCar.name + " left zone, " + list.Count + " cars left");	
>>>>>>> origin/master
}

function getCarsInZone()
{
<<<<<<< HEAD
	insideZone = carList.ToArray();
=======
	insideZone = list.ToArray();
>>>>>>> origin/master
	return insideZone;
}

function getColliderPoints()
{
<<<<<<< HEAD
	colliderPoints = collisionList.ToArray();
=======
	colliderPoints = list2.ToArray();
	//Debug.Log(colliderPoints);
>>>>>>> origin/master
	return colliderPoints;
}

function removeColliderPoint(car : AICar_Script)
{
	var theCar : AICar_Script = car;
	var contactPosition : Vector3 = theCar.getColliderPoint();
<<<<<<< HEAD
	for(var l = 0; l < collisionList.Count; l++)
		{
			var somePoint : Vector3 = collisionList[l] ;
			if(somePoint == contactPosition)
			{	
				collisionList.RemoveAt(l);		
			}
			
		}
		collisionList.Remove(contactPos);
=======
	for(var l = 0; l < list2.Count; l++)
		{
			var somePoint : Vector3 = list2[l] ;
			if(somePoint == contactPosition)
			{	
//				exitCar.setColliderPoint(null);	
				list2.RemoveAt(l);		

				//Debug.Log(exitCar.name + " removed");
			}
			
		}
		list2.Remove(contactPos);
>>>>>>> origin/master
}

function getZoneType()
{
	return zoneType;
}

<<<<<<< HEAD
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
=======
private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
>>>>>>> origin/master

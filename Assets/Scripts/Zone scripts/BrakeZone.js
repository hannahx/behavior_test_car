//#pragma strict
import System.Collections.Generic;
//var AICar : GameObject;
var brakingPower : float = 1120;
var enginePower : float = 0;
private var enterCar : AICar_Script; 
private var exitCar : AICar_Script; 
var insideZone : Array;
var list : List.<AICar_Script>;
private var contact : ContactPoint;
var contactPos : Vector3;
var colliderPoints : Array;
var list2 : List.<Vector3>;
var zoneType : int;

function Start() {

	insideZone = new Array();
	list = new List.<AICar_Script>();
	colliderPoints = new Array();
	list2 = new List.<Vector3>();
}

function OnTriggerEnter (c : Collider) {

	var parentparent = c.gameObject.transform.parent.gameObject;
	enterCar = parentparent.GetComponent(AICar_Script);
	//Debug.Log(enterCar.name + "  enters inter zone!");
	
	var collPoint = enterCar.getRigidbody().transform.position;
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
}

function OnTriggerExit (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	exitCar = parentparent.GetComponent(AICar_Script);
	exitCar.BrakePower = 0;
	exitCar.setActiveZone(null);
	exitCar.setZoneEntered(false);
	var contactPos : Vector3 = exitCar.getColliderPoint();
	for(var k = 0; k < list.Count; k++)
	{
		var someCar : AICar_Script = list[k] as AICar_Script ;
		if(someCar == exitCar && exitCar.getZoneEntered() == false)
		{	
			exitCar.setActiveZone(null);
			exitCar.setZoneEntered(false);	
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

			//Debug.Log(exitCar.name + " removed");
		}
		
	}
	list.Remove(exitCar);
	list2.Remove(contactPos);
//	exitCar.setGoingStraight(false);
//	exitCar.setTurningLeft(false);
//	exitCar.setTurningRight(false);
//	enterCar.setPriority(false);
//	Debug.Log(exitCar.name + " left zone, " + list.Count + " cars left");	
}

function getCarsInZone()
{
	insideZone = list.ToArray();
	return insideZone;
}

function getColliderPoints()
{
	colliderPoints = list2.ToArray();
	//Debug.Log(colliderPoints);
	return colliderPoints;
}

function removeColliderPoint(car : AICar_Script)
{
	var theCar : AICar_Script = car;
	var contactPosition : Vector3 = theCar.getColliderPoint();
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
}

function getZoneType()
{
	return zoneType;
}

private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
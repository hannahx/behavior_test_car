#pragma strict
import System.Collections.Generic;
var AICar : GameObject;
var brakingPower : float = 1120;
var enginePower : float = 0;
var car : AICar_Script; 
var insideZone : Array;
var list : List.<AICar_Script>;

function Start() {
	//This is where the script finds the AI car and plugs it into the variable of this script.
	//AICar = GameObject.FindGameObjectWithTag("AI"); 
	insideZone = new Array();
	list = new List.<AICar_Script>();

}

function Update() {
	insideZone = list.ToArray();

}


// Hit the brakes when the AI enters the trigger
function OnTriggerEnter (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	car = parentparent.GetComponent(AICar_Script);
	Debug.Log(car.name + "  enters!");

	
	car.setActiveZone(this);
	car.setZoneEntered(true);
	Debug.Log(car.name + " " + car.getZoneEntered());

	//insideZone.Push(car);
	list.Add(car);
	
	
	
}

function OnTriggerExit (other : Collider) {

	car.BrakePower = 0;
	//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
	//Debug.Log("What is this for?");
			car.setActiveZone(null);
			car.setZoneEntered(false);
//	for(var k = 0; k < insideZone.length; k++)
	for(var k = 0; k < list.Count; k++)
	{
//		var someCar : AICar_Script = insideZone[k] as AICar_Script ;
		var someCar : AICar_Script = list[k] as AICar_Script ;
		if(someCar == car && car.getZoneEntered() == false)
		{	
			//Debug.Log(insideZone);
			//insideZone.RemoveAt(k);
			//insideZone[k] = null;
			car.setActiveZone(null);
			car.setZoneEntered(false);
			list.RemoveAt(k);		

			Debug.Log(car.name + " removed");
//			Debug.Log(list);
		}
		
			
	}
	list.Remove(car);
	Debug.Log(car.name + " " + car.getZoneEntered());
	Debug.Log(car.name + " left zone, " + list.Count + " cars left");
	
	//Debug.Log(car.getZoneEntered());
	
}

function getCarsInZone()
{
//	list.Reverse();
	
	Debug.Log("Car array:  " + insideZone);
	//Debug.Log("gciz: " + car.name + " " + car.getZoneEntered());

	return insideZone;
}
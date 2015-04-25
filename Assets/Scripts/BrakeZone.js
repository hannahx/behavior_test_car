//#pragma strict
import System.Collections.Generic;
//var AICar : GameObject;
var brakingPower : float = 1120;
var enginePower : float = 0;
private var enterCar : AICar_Script; 
private var exitCar : AICar_Script; 
var insideZone : Array;
var list : List.<AICar_Script>;

function Start() {
	//This is where the script finds the AI car and plugs it into the variable of this script.
	//AICar = GameObject.FindGameObjectWithTag("AI"); 
	insideZone = new Array();
	list = new List.<AICar_Script>();

}

// Hit the brakes when the AI enters the trigger
function OnTriggerEnter (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	enterCar = parentparent.GetComponent(AICar_Script);
	Debug.Log(enterCar.name + "  enters!");

	
	enterCar.setActiveZone(this);
	enterCar.setZoneEntered(true);
	Debug.Log(enterCar.name + " " + enterCar.getZoneEntered());

	//insideZone.Push(car);
	list.Add(enterCar);
	
	
	
}

function OnTriggerExit (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	exitCar = parentparent.GetComponent(AICar_Script);
	exitCar.BrakePower = 0;
	exitCar.setActiveZone(null);
	exitCar.setZoneEntered(false);
	for(var k = 0; k < list.Count; k++)
	{
		var someCar : AICar_Script = list[k] as AICar_Script ;
		if(someCar == exitCar && exitCar.getZoneEntered() == false)
		{	
			exitCar.setActiveZone(null);
			exitCar.setZoneEntered(false);
			list.RemoveAt(k);		

			Debug.Log(exitCar.name + " removed");
		}
		
	}
	list.Remove(exitCar);
	Debug.Log(exitCar.name + " " + exitCar.getZoneEntered());
	Debug.Log(exitCar.name + " left zone, " + list.Count + " cars left");	
}

function getCarsInZone()
{
	insideZone = list.ToArray();
	Debug.Log("Car array:  " + insideZone);

	return insideZone;
}
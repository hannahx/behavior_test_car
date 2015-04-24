#pragma strict

var AICar : GameObject;
var brakingPower : float = 1120;
var enginePower : float = 0;
var car : AICar_Script; 
var insideZone : Array;

function Start() {
	//This is where the script finds the AI car and plugs it into the variable of this script.
	AICar = GameObject.FindGameObjectWithTag("AI"); 
	insideZone = new Array();
}


// Hit the brakes when the AI enters the trigger
function OnTriggerEnter (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	car = parentparent.GetComponent(AICar_Script);
	Debug.Log(car.name + "  enters!");

	
	car.setActiveZone(this);
	car.setZoneEntered(true);
	//Debug.Log(car.getZoneEntered());

	insideZone.Push(car);
	
	
}

function OnTriggerExit (other : Collider) {

	car.BrakePower = 0;
	//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
	//Debug.Log("What is this for?");
	
	for(var k : int = 0; k < insideZone.length; k++)
	{
		var someCar : AICar_Script = insideZone[k] as AICar_Script ;
		
		if(someCar == car)
		{
			Debug.Log("Array before: " +insideZone);
			insideZone.RemoveAt(k);
			Debug.Log("Array after: " + insideZone);
		}
		
	}
	
	car.setActiveZone(null);
	car.setZoneEntered(false);
	Debug.Log(car.name + " left zone!");
	//Debug.Log(car.getZoneEntered());
	
}

function getCarsInZone()
{
	return insideZone;
}
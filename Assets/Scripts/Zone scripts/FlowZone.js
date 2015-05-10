private var nrOfCars;

function Start () 
{
	nrOfCars = 0;
}


function OnTriggerEnter (c : Collider) 
{
	nrOfCars++;
	Debug.Log(nrOfCars);
}
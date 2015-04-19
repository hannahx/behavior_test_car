#pragma strict


var car : AICar_Script;
var NumberOfCars : int;
private var points : Array = new Array();
private var max : int;
private var I;
private var carArray : Array;
function Start ()
{
	I = 0; // I = 1 if pointarray is filled :)
	carArray = new Array();
}

function Update () 
{
	points = Array(car.getPointArray());
	if(points.length>1 && I == 0) //if points.length>1 pga att kolla om vektorn med punkterna är fylld!
	{
		I = 1;
		max = points.length - 1;
		
		var i : int;
		for(i=0; i<NumberOfCars; i++)
		{	
			//Generate car on a random point in the network
			var rand : int = Mathf.Floor(Random.Range(0,max+1));
			
			var point = points[rand] as Point;
			var startPos : Vector3 = point.transform.position;

			//var point = points[0] as Point;
			//var startPos : Vector3 = point.transform.position;
			//startPos.z -= i*20;
			
			var car = Instantiate(car, startPos, Quaternion.identity);
			car.name = "car" + i;
			car.setNextPoint(points[rand]);
			
			carArray.push(car);
				
		}	
	}
}


function getCars()
{
	if(carArray.length > 0)
	{
		return carArray;
	}	
	else
	{
		Debug.Log("No cars :(");
	}
}
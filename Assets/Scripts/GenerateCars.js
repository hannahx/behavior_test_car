#pragma strict


var car : AICar_Script;
var NumberOfCars : int;
private var points : Array = new Array();
private var max : int;
private var I;
private var carArray : Array;
private var p : int;
private var posTaken : boolean;
private var aMatrix = new Array();

function Start ()
{
	I = 0; // I = 1 if pointarray is filled :)
	carArray = new Array();
	carArray.push(car);


	while (I==0)
	{
		points = Array(car.getPointArray());
		if(points.length>1) //if points.length>1 pga att kolla om vektorn med punkterna är fylld!
		{
			I = 1;
			
			max = points.length - 1;
			
			var i : int;
			for(i=0; i<NumberOfCars; i++)
			{	
				//Generate car on a random point in the network
				var rand : int = Mathf.Floor(Random.Range(0,max+1));				
				var point = points[rand] as Point;
				
				//Don't generate the car on points you don't want to! (apparently this doesn't apply to Red_Car...)
				while (point.startOK==false)
				{
					rand = Mathf.Floor(Random.Range(0,max+1));	
					point = points[rand] as Point;
				}
				//Debug.Log(i);
				var startPos : Vector3 = getStartPos(point.transform.position);
				
				var newCar = Instantiate(car, startPos, Quaternion.identity);
				newCar.name = "car" + i;
				newCar.setNextPoint(points[rand]);
				newCar.setStartPoint(points[rand]);
				
				
				if(posTaken==true)
				{
					newCar.setTakenPosition(true);
					Debug.Log(newCar.name);
				}
				
				posTaken = false;
				
				var chassis : Transform = newCar.transform.Find("Chassis"); 			
				chassis.renderer.material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1.0)); //random color for the car
				
				yield WaitForSeconds (1);
			}	
			break;
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

function getStartPos(pos : Vector3)
{
	if(carArray.length>0)
	{
		var c : AICar_Script;
		for (c in carArray)
		{		
			//Debug.Log("" + c + "  " + c.transform.position);
			if(Vector3.Distance(pos, c.transform.position)< 30)
			{
				posTaken = true;
				Debug.Log("Same position as " + c.name);
			}
		}
	}
	else
	{
		return pos;
	}
	return pos;
}

private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 

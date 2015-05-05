#pragma strict


var car : AICar_Script;
var NumberOfCars : int;
private var points : Array = new Array();
private var max : int;
private var I;
private var carArray : Array;
private var p : int;
private var posTaken : boolean;

function Start ()
{
	I = 0; // I = 1 if pointarray is filled :)
	carArray = new Array();
	carArray.push(car);
	p = 0;

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
				//var rand : int = Mathf.Floor(Random.Range(0,max+1));
				getP();
				var point = points[p] as Point;
				var startPos : Vector3 = getStartPos(point.transform.position);
				
				var newCar = Instantiate(car, startPos, Quaternion.identity);
				newCar.name = "car" + i;
				newCar.setNextPoint(points[p]);
				newCar.setStartPoint(points[p]);
				
				
				if(posTaken==true)
				{
					newCar.setTakenPosition(true);
					Debug.Log(newCar.name);
				}
				
				posTaken = false;
				
				var chassis : Transform = newCar.transform.Find("Chassis"); 			
				chassis.renderer.material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1.0)); //random color for the car
				
				yield WaitForSeconds (1);
				
				p++;	
				if(p==points.length)
				{
					p=0;
				}
			}	
			break;
		}
		
	}	
}

/** Don not generate a car in an intersection */
function getP()
{
	var po : Point = points[p] as Point;
	if(po.InIntersection()==true)
	{
		p++;
		if(p==points.length)
		{
			p=0;
		}
		getP();
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
			if(Vector3.Distance(pos, c.transform.position)< 10)
			{
				posTaken = true;
				Debug.Log("Same position as " + c.name);
				//pos.x -= 50;
			}
		}
	}
	else
	{
		return pos;
	}
	return pos;
}

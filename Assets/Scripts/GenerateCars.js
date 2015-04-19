//#pragma strict
//
//
//var car : AICar_Script;
//var NumberOfCars : int;
//private var points : Array = new Array();
//private var max : int;
//private var I;
//private var carArray : Array;
//
//function Start ()
//{
//	I = 0; // I = 1 if pointarray is filled :)
//	carArray = new Array();
//	carArray.push(car);
//	
//	var ii : int = 0;
//	while (I==0)
//	{
//		ii++;
//		points = Array(car.getPointArray());
//		if(points.length>1)// && I == 0) //if points.length>1 pga att kolla om vektorn med punkterna är fylld!
//		{
//			I = 1;
//			
//			max = points.length - 1;
//			
//			var i : int;
//			for(i=0; i<NumberOfCars; i++)
//			{	
//				//Generate car on a random point in the network
//				var rand : int = Mathf.Floor(Random.Range(0,max+1));
//				
//				var point = points[rand] as Point;
//				//var startPos : Vector3 = point.transform.position;
//				var startPos : Vector3 = getStartPos(point.transform.position);
//				
//				var newCar = Instantiate(car, startPos, Quaternion.identity);
//				newCar.name = "car" + i;
//				newCar.setNextPoint(points[rand]);
//				//Debug.Log("- " + newCar + " -");
//				carArray.push(newCar);
//					
//			}	
//			break;
//		}
//	}	
//	Debug.Log(ii);
//}
//
//
//function getCars()
//{
//	if(carArray.length > 0)
//	{
//		return carArray;
//	}	
//	else
//	{
//		Debug.Log("No cars :(");
//	}
//}
//
//function getStartPos(pos : Vector3)
//{
//	if(carArray.length>0)
//	{
//		var c : AICar_Script;
//		for (c in carArray)
//		{		
//			Debug.Log("" + c + "  " + c.transform.position);
//			if(Vector3.Distance(pos, c.transform.position)< 1)
//			{
//				Debug.Log("Same position as " + c);
//				pos.x -= 20;
//			}
//		}
//	}
//	else
//	{
//		return pos;
//	}
//	return pos;
//}




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
	carArray.push(car);
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
			//var startPos : Vector3 = point.transform.position;
			var startPos : Vector3 = getStartPos(point.transform.position);
			
			var newCar = Instantiate(car, startPos, Quaternion.identity);
			newCar.name = "car" + i;
			newCar.setNextPoint(points[rand]);
			newCar.setStartPoint(points[rand]);
			//Debug.Log("- " + newCar + " -");
			carArray.push(newCar);
				
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
			if(Vector3.Distance(pos, c.transform.position)< 1)
			{
				//Debug.Log("Same position as " + c);
				pos.x -= 20.0;
			}
		}
	}
	else
	{
		return pos;
	}
	return pos;
}
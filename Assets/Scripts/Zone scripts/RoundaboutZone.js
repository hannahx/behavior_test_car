var r_PointContainer : GameObject;
private var car : AICar_Script;
private var inner_points;
private var outer_points;
private var chassis;
private var carColor;


function Start () 
{
	inner_points = new Array();
	outer_points = new Array();
	var points = r_PointContainer.GetComponentsInChildren( Point );
	for(r in points)
	{
		if(r.innerPoint && r.outerPoint)
		{
			inner_points.push(r as Point);
			outer_points.push(r as Point);
		}
		else if(r.innerPoint && r.outerPoint==false)
		{
			inner_points.push(r as Point);
		}	
		else if(r.innerPoint==false && r.outerPoint)
		{
			outer_points.push(r as Point);
		}
	}	
}


function OnTriggerEnter (c : Collider) 
{
	chassis = c;
	var parentparent = c.gameObject.transform.parent.gameObject;
	car = parentparent.GetComponent(AICar_Script);
	
	carColor = chassis.renderer.material.GetColor("_Color");
		
	var extraPath : Array = new Array();
	var oldPath : Array = car.getPath();
	
	enter = oldPath[car.getIndexInPath()-1];
	exit = oldPath[car.getIndexInPath()];
	
	//random temp variables:
	var currentPoint : Point;
	var rend : Renderer;
    
	//find out of next point is on left, right or straight forward
	var dir = turningDirection(enter, exit);
    
    if(dir==1)//if right
    {
    	Debug.Log(car.name + " Turning Right - follow outer");
		for(p in outer_points)
		{
			if(car.transform.InverseTransformPoint(p.transform.position).x > 0 && Vector3.Distance(car.transform.position,p.transform.position) < 100)
			{
				currentPoint = p as Point;
				rend = currentPoint.GetComponent.<Renderer>();
				rend.material.color = carColor;
				//Debug.Log(currentPoint);
				extraPath.push(currentPoint);
			}
		}
    }			
	else if(dir==0)//if straight forward
	{
		Debug.Log(car.name + " Straight ahead?? - follow outer");
		for(p in outer_points)
		{
			if(car.transform.InverseTransformPoint(p.transform.position).x > 0)
			{
				currentPoint = p as Point;
				rend = currentPoint.GetComponent.<Renderer>();
				rend.material.color = carColor;
				//Debug.Log(currentPoint);
				extraPath.push(currentPoint);
			}
		}
	}
	else if(dir==-1)//if left 
	{
		Debug.Log(car.name + " Turning Left - follow inner");
		for(p in inner_points)
		{
			if(car.transform.InverseTransformPoint(p.transform.position).x > 0 || car.transform.InverseTransformPoint(p.transform.position).x < 0 && Vector3.Distance(car.transform.position,p.transform.position) > 110)
			{
				currentPoint = p as Point;
				rend = currentPoint.GetComponent.<Renderer>();
				rend.material.color = carColor;
				extraPath.push(currentPoint);
			}
		}
	}
	
	//remove all elements in path up to getIndexInPath()-1
	Debug.Log(car.name + " - Old Path: " + oldPath);
	for(var i=0; i<car.getIndexInPath(); i++)
	{
		oldPath.shift();
	}
	//Debug.Log("old after " + oldPath);
	var newPath = extraPath.concat(oldPath);
	car.setPath(newPath);
	car.setIndexInPath(0);
	for(p in newPath)
	{
		currentPoint = p as Point;
		var ren = currentPoint.GetComponent.<Renderer>();
		ren.material.color = carColor;
	}
	Debug.Log(car.name + " - New Path: " + newPath);
		
}

function turningDirection (enter, exit) 
{
	var ret : int;
	var currentPoint = enter as Point;
	var nextPoint = exit as Point;
		otherTransform = nextPoint.transform;
    	var relativePoint = currentPoint.transform.InverseTransformPoint(otherTransform.position); 
		var rend = nextPoint.GetComponent.<Renderer>();
		rend.material.color = carColor;
 		if(Vector3.Distance(otherTransform.position, car.transform.position) > 130)
 		{
 			ret = 0;
 		}
		else if (relativePoint.x < 0) 
		{
			ret = -1;
		}
 		else if (relativePoint.x > 0) 
 		{
 			ret = 1;
 		}
	return ret;
}

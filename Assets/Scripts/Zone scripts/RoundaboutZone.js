var r_PointContainer : GameObject;
private var car : AICar_Script;
private var inner_points;
private var outer_points;
private var chassis;
private var carColor;
private var infinity;


function Start () 
{
	infinity = float.PositiveInfinity;
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
	//var directions : Array = new Array();
	var oldPath : Array = car.getPath();
	
	enter = oldPath[car.getIndexInPath()-1];
	exit = oldPath[car.getIndexInPath()]; //out of range ibland :/
	
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
				////Debug.Log(currentPoint);
				extraPath.push(currentPoint);
			}
		}
    }			
	else if(dir==0)//if straight forward
	{
		Debug.Log(car.name + " Straight ahead - follow outer");
		for(p in outer_points)
		{
			if(car.transform.InverseTransformPoint(p.transform.position).x > 0)
			{
				currentPoint = p as Point;
				rend = currentPoint.GetComponent.<Renderer>();
				rend.material.color = carColor;
				////Debug.Log(currentPoint);
				extraPath.push(currentPoint);
			}
		}
	}
	else if(dir==-1)//if left 
	{
		Debug.Log(car.name + " Turning Left - follow inner");
		for(p in inner_points)
		{
			if(car.transform.InverseTransformPoint(p.transform.position).x > 0 || car.transform.InverseTransformPoint(p.transform.position).x < 0 && Vector3.Distance(p.transform.position, car.transform.position) > 100)
			{
				currentPoint = p as Point;
				rend = currentPoint.GetComponent.<Renderer>();
				rend.material.color = carColor;
				extraPath.push(currentPoint);
			}
		}
	}
	else if(dir==-2)//if U-turn 
	{
		Debug.Log(car.name + " U-turn - follow inner");
		for(p in inner_points)
		{
			currentPoint = p as Point;
			rend = currentPoint.GetComponent.<Renderer>();
			rend.material.color = carColor;
			extraPath.push(currentPoint);
		}
	}
	
	//remove all elements in path up to getIndexInPath()-1
	////Debug.Log(car.name + " - Old Path: " + oldPath);
	for(var i=0; i<car.getIndexInPath(); i++)
	{
		oldPath.shift();
	}
	////Debug.Log(car.name + " - Extra Path: " + extraPath);
	
	var extraPathSorted = sortPoints(enter, extraPath);
	var newPath = extraPathSorted.concat(oldPath);
	
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
	
	var tonextPoint : Vector3 = (nextPoint.transform.position - currentPoint.transform.position);
	var angle2 = Vector3.Angle(tonextPoint, car.transform.forward);

	var cross:Vector3 = Vector3.Cross(tonextPoint, car.transform.forward);
    if (cross.y > 0) //this means left angle :) 
    	angle2 = -angle2;

	
	//Debug.Log(angle2);
	if (angle2 > -10 && angle2 < 10)
	{
		ret = 0;
	}
	else if(angle2 < 0)
	{
		ret = -1;
	}
	else// if(angle2 > 0)
	{
		ret = 1;
	}
				
	if(ret == -1 && Vector3.Distance(currentPoint.transform.position,nextPoint.transform.position) < 5)
	{
		ret = -2;
	}
	
	return ret;
}

function sortPoints(startPoint : Point, path : Array)
{
	var retPath = new Array();
	
	var leftPoints = new Array();
	var rightPoints = new Array();
	
	for(p in path)
	{
		//split path into left and right points
		var dir = turningDirection(startPoint, p);
		if(dir >= 0)
		{
			rightPoints.push(p);
		}
		else
		{
			leftPoints.push(p);
		}
	}
	Debug.Log("rightPoints " + rightPoints);
	Debug.Log("leftPoints " + leftPoints);
	
	//sort right points (shortest distance --> longest)
	var part1 = new Array();
	var minDist = infinity;
	var maxDist = -infinity;
	var b : boolean = false;
	
	for(r in rightPoints)
	{
		var rPoint = r as Point;
		var distTo_rPoint = Vector3.Distance(startPoint.transform.position, rPoint.transform.position);
		if(part1.length > 0)
		{	
			var temp = new Array();	
			for(p in part1)
			{
				var distTo_p = Vector3.Distance(startPoint.transform.position, p.transform.position);
				if(distTo_rPoint>distTo_p)
				{
					temp.push(rPoint);
					b = true;
					break;
				}
			}
			if(b == false)
				temp.unshift(rPoint); 
			for(t in temp)
			{
				var tPoint = t as Point;
				part1.push(tPoint);
			}
		}
		else
		{
			part1.push(rPoint);
		}
	}
	
	Debug.Log("Part 1: " + part1);
	
	//sort left points (longest distance --> shortest)
	var part2 = new Array();
	
	for(l in leftPoints)
	{
		var lPoint = l as Point;
		distTo_lPoint = Vector3.Distance(startPoint.transform.position, lPoint.transform.position);
		if(part2.length > 0)
		{	
			temp = new Array();	
			for(p in part2)
			{
				distTo_p = Vector3.Distance(startPoint.transform.position, p.transform.position);
				if(distTo_lPoint>distTo_p)
				{
					temp.unshift(lPoint); 
					b = true;
					break;
				}
			}
			if(b==false)
				temp.push(lPoint);
				
			for(t in temp)
			{
				tPoint = t as Point;
				part2.push(tPoint);
			}
		}
		else
		{
			part2.push(lPoint);
		}
	}
	
	Debug.Log("Part 2: " + part2);	
	retPath = part1.Concat(part2);
	
	return retPath;	
}
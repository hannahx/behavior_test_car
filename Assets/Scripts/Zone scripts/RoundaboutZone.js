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
	
	car.steeringSharpness -= 10;
	
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
		//var ren = currentPoint.GetComponent.<Renderer>();
		//ren.material.color = carColor;
	}
	Debug.Log(car.name + " - New Path: " + newPath);
		
}

function OnTriggerExit (c : Collider) 
{
	var parentparent = c.gameObject.transform.parent.gameObject;
	car = parentparent.GetComponent(AICar_Script);
	
	car.steeringSharpness += 10;
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
	Debug.Log("startPoint: " + startPoint);
	
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
	//Debug.Log("rightPoints " + rightPoints);
	//Debug.Log("leftPoints " + leftPoints);
	
	//sort right points (shortest distance --> longest)
	

	
	var part1 = new Array();
	var part2 = new Array();
	var spliced : boolean;
	for(var i=0; i<rightPoints.length; i++)
	{
		spliced = false;
		var temp : Array = part1;
		var dist_startToPoint = Vector3.Distance(startPoint.transform.position, rightPoints[i].transform.position);
		var point = rightPoints[i] as Point;
		if(part1.length==0)
		{
			part1.push(rightPoints[i]);
		}
		else
		{
			for(var j=0; j<part1.length; j++)
			{
				var dist_startToThis = Vector3.Distance(startPoint.transform.position, part1[j].transform.position);
				if(dist_startToPoint < dist_startToThis)
				{
					temp.splice(j,0, point);
					spliced = true;
					break;
				}
				
			}
			if(spliced==false)
				temp.push(point);
			
			part1 = temp;
		}
	}
	
	for(i=0; i<leftPoints.length; i++)
	{
		spliced = false;
		temp = part2;
		dist_startToPoint = Vector3.Distance(startPoint.transform.position, leftPoints[i].transform.position);
		point = leftPoints[i] as Point;
		if(part2.length==0)
		{
			part2.push(leftPoints[i]);
		}
		else
		{
			for(j=0; j<part1.length; j++)
			{
				dist_startToThis = Vector3.Distance(startPoint.transform.position, part2[j].transform.position);
				if(dist_startToPoint > dist_startToThis)
				{
					temp.splice(j,0, point);
					spliced = true;
					break;
				}
				
			}
			if(spliced==false)
				temp.push(point);
			
			part2 = temp;
		}
	}
	
	retPath = part1.Concat(part2);

	return retPath;	
}

private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
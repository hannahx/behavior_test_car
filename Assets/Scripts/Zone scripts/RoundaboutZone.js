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
	
	//car.steeringSharpness -= 10;
	
	carColor = chassis.renderer.material.GetColor("_Color");
		
	var extraPath : Array = new Array();
	var oldPath : Array = car.getPath();
	
	if(car.getIndexInPath()<oldPath.length)
	{
		enter = oldPath[car.getIndexInPath()-1];
		exit = oldPath[car.getIndexInPath()]; //out of range ibland :/
	}
	else
	{
		enter = oldPath[car.getIndexInPath()-2];
		exit = oldPath[car.getIndexInPath()-1]; //out of range ibland :/
	}
	
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

//function OnTriggerExit (c : Collider) 
//{
//	var parentparent = c.gameObject.transform.parent.gameObject;
//	car = parentparent.GetComponent(AICar_Script);
//	
//	car.steeringSharpness += 10;
//}

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
				
	if(ret == -1 && Vector3.Distance(currentPoint.transform.position,nextPoint.transform.position) < 10)
	{
		ret = -2;
	}
	
	return ret;
}

function sortPoints(startPoint : Point, path : Array)
{
	//Debug.Log("startPoint: " + startPoint);
	
	var retPath = new Array();
	
	var leftPoints = new Array();
	var rightPoints = new Array();
	var centerPoints = new Array();
	
	for(p in path)
	{
		//split path into left, center and right points
		var dir = turningDirection(startPoint, p);
		if(dir == 0 && Vector3.Distance(startPoint.transform.position, p.transform.position) > 80)
		{
			centerPoints.push(p);
		}
		else if(dir >= 0)
		{
			rightPoints.push(p);
		}
		else if(dir < 0)
		{
			leftPoints.push(p);
		}
	}
	//Debug.Log("rightPoints " + rightPoints);
	//Debug.Log("centerPoints " + centerPoints);
	//Debug.Log("leftPoints " + leftPoints);
	
	//sort right points (shortest distance --> longest)	
	var part1 = new Array();
	var partCenter = new Array();
	var part2 = new Array();
	
	var spliced : boolean;
	for(var i=0; i<rightPoints.length; i++)
	{
		spliced = false;
		var temp : Array = part1;
		var dist_startToPoint = Vector3.Distance(startPoint.transform.position, rightPoints[i].transform.position);
		var point = rightPoints[i] as Point;
		//Debug.Log("dist to " + point + ": " + dist_startToPoint);
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
	
	if(centerPoints.length<=1)
	{
		partCenter = centerPoints;
	}
	else
	{
		for(i=0; i<centerPoints.length; i++)
		{
			spliced = false;
			temp = partCenter;
			point = centerPoints[i] as Point;
			if(partCenter.length==0)
			{
				partCenter.push(centerPoints[i]);
			}
			else
			{
				for(j=0; j<partCenter.length; j++)
				{
					//kolla om point till höger om partCenter[j]
					if(turningDirection(point, partCenter[j])<0)
					{						
						temp.splice(j,0, point);
						spliced = true;
						break;
					}
				}
				if(spliced==false)
					temp.push(point);
			
				partCenter = temp;
			}
		}
	}
	
	var firstPart = part1.Concat(partCenter);
	
	var endRightPoint = firstPart[firstPart.length-1];
	//Debug.Log("endpoint: " + endRightPoint);
	//sort left points (longest distance --> shortest)	
	//Debug.Log("------- left -------");
	for(i=0; i<leftPoints.length; i++)
	{
		spliced = false;
		temp = part2;
		var dist_rightEndToPoint = Vector3.Distance(endRightPoint.transform.position, leftPoints[i].transform.position);
		//dist_startToPoint = Vector3.Distance(startPoint.transform.position, leftPoints[i].transform.position);
		point = leftPoints[i] as Point;
		//Debug.Log("dist to " + point + ": " + dist_rightEndToPoint);
		if(part2.length==0)
		{
			part2.push(leftPoints[i]);
		}
		else
		{
			for(j=0; j<part2.length; j++)
			{
				//var dir1 : Vector3 = (part2[j].transform.position - startPoint.transform.position);
				//var dir2 : Vector3 = (point.transform.position - startPoint.transform.position);
				
				dist_startToThis = Vector3.Distance(endRightPoint.transform.position, part2[j].transform.position);
				//if(Vector3.Angle(dir1, car.transform.forward) < Vector3.Angle(dir2, car.transform.forward))
				//if(dist_startToPoint > dist_startToThis)
				if(dist_rightEndToPoint < dist_startToThis)
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
	
	retPath = firstPart.Concat(part2);

	return retPath;	
}

private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
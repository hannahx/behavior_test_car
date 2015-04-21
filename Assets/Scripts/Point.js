#pragma strict

// The connected points:
var next1 : Point;
var next2 : Point;
var next3 : Point;

/** Draw the point lines only when you connect two points
  * You go from light grey to dark grey (can't go the other direction) */
function OnDrawGizmos() 
{
	var next : Array = [next1, next2, next3];

	for (n in next)
	{
		if (n) 
		{
		 	var Next : Point = n;
			Gizmos.color = Color.gray;
			Gizmos.DrawLine (transform.position, Next.transform.position);
			Gizmos.color = Vector4(0.4,0.4,0.4,1);
			Gizmos.DrawLine ((transform.position+Next.transform.position)/2, Next.transform.position);
		}
	}

}

//function OnTriggerEnter(c : Collider)
//{
//	var parentparent = c.gameObject.transform.parent.gameObject;
//	var car : AICar_Script = parentparent.GetComponent(AICar_Script);
//	//Debug.Log(car.getPath());
//	
//	//Debug.Log(this);
//	
//	//updatera nästa punkt OM punkten finns i bilens path.
//	//car.setNextPoint(this);
//	
//	car.setUpdatePoint(1);
//	//Debug.Log(1);
//}
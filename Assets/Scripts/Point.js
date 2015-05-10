#pragma strict

// The connected points:
var next1 : Point;
var next2 : Point;
var next3 : Point;
var innerPoint = false;
var outerPoint = false;
var startOK = true;


/** Draw the point lines only when you connect two points
  * You go from light grey to dark grey (can't go the other direction) */
function OnDrawGizmos() 
{
	var next : Array = [next1, next2, next3];

	for (n in next)
	{
		if (n) 
		{
		 	var Next : Point = n as Point;
			Gizmos.color = Color.gray;
			Gizmos.DrawLine (transform.position, Next.transform.position);
			Gizmos.color = Vector4(0.4,0.4,0.4,1);
			Gizmos.DrawLine ((transform.position+Next.transform.position)/2, Next.transform.position);
		}
	}
<<<<<<< HEAD


}


private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 


=======
}

private function SilenceWarnings() : void 
{ 
var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); 
} 


>>>>>>> origin/master

public class rapper implements System.IComparable 
{
	var point : Point; 
	var distance : float;
	function rapper(p : Point, target : Transform) 
	{
		point = p;
		distance = Vector3.Distance(p.transform.position, target.position);
	}
	       
	function CompareTo(obj: Object) : int 
	{
	      var other : rapper = obj; // Typecast to own class
	      return distance.CompareTo(other.distance);
	}
}
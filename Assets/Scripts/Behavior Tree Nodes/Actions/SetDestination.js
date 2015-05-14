//#pragma strict

import BehaviourMachine;

/** Sets the start point and destination for the car */
public class SetDestination extends ActionNode {
     
	var car : AICar_Script;
	var pointA : Point;
	var pointB : Point;
    //private var path : Array;
    private var points;
    private var I : int;
    private var startTime : float;
    private var endTime : float;
    private var times : Array;
     
    // Called when the node starts its execution
    function Start () 
    {
    	times = new Array();
    	I = 0;
    	//Debug.Log("Set destination for " + car);
		points = car.getPointArray();
		if(points.length>1)
		{
			var max : int = points.length - 1;
			var rand : int;
			var destPoint : Point;
			I = 1;
	    	if(car.getDestinationPoint()==null && car.getStartPoint()==null)//this means the "original car"
	    	{	
	    		if(pointA != null)
	    		{
	    			car.setStartPoint(pointA);
	    			startTime = Time.time;
	    		}
	    		else
	    		{
					rand = Mathf.Floor(Random.Range(0,max+1));
					while(points[rand].startOK==false)
					{
						rand = Mathf.Floor(Random.Range(0,max+1));
					}
					car.setStartPoint(points[rand]);
	    		}
	    		
	    		if(pointB != null)
	    		{
	    			car.setDestinationPoint(pointB);
	    		}
	    		else
	    		{
					rand = Mathf.Floor(Random.Range(0,max+1));
					car.setDestinationPoint(points[rand]);
	    		}
	    		
				car.transform.position = car.getStartPoint().transform.position;
				//Debug.Log(car.getStartPoint().transform.position);
				car.transform.rotation = Quaternion.identity;
				
	    	}
	    	else if(car.getDestinationPoint()==null && car.getStartPoint()!= null)//this means "nyss genererad bil"
	    	{
	    		//Debug.Log("case 2");    
	    		rand = Mathf.Floor(Random.Range(0,max+1));
	    		destPoint = points[rand] as Point;
				while (destPoint.startOK==false)
				{
					rand = Mathf.Floor(Random.Range(0,max+1));	
					destPoint = points[rand] as Point;
				}
	    		car.setDestinationPoint(destPoint);
	    		//Debug.Log(car.getStartPoint().transform.position);
	    		car.transform.position = car.getStartPoint().transform.position;
	    	}
	    	else //this means that the car has reached its destination
	    	{
	    		car.setStartPoint(car.getDestinationPoint());
				if(car.name == "Red_Car" && pointA != null && pointB != null)
				{
					endTime = Time.time;
					var resultTime : float = endTime - startTime;
					times.push(resultTime);
					//Debug.Log("Time: " + resultTime + " s");
					Debug.Log("Times: " + times); //det här funkar inte pga en ny nod kollas varje gång och man kan inte fortsätta lägga in saker i arrayen... 
					if(car.getDestinationPoint().name==pointB.name)
					{
						car.setDestinationPoint(pointA);
					}
					else
					{
						car.setDestinationPoint(pointB);
					}
					startTime = Time.time;
				}
				else
				{   
					rand = Mathf.Floor(Random.Range(0,max+1)); //TODO: should not be same as startpoint or destination - fix!
		    		destPoint = points[rand] as Point;
					while (destPoint.startOK==false)
					{
						rand = Mathf.Floor(Random.Range(0,max+1));	
						destPoint = points[rand] as Point;
					}
		    		car.setDestinationPoint(destPoint);
		    		car.setDestinationPoint(points[rand]);
	    		}
	    	}
	    	//car.getRigidbody().transform.position = car.getStartpoint();//
	    	
	    	//Debug.Log("Start: " + car.getStartPoint() + "  Destination: " + car.getDestinationPoint());
	    	car.setIndexInPath(0);
	    	car.setNextPoint(car.getStartPoint());
    	}
    	else
    	{
    		Start();
    	}
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
        if(I==1)
       		return Status.Success;
		else
			return Status.Running;
        
    }
    
    private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
    
}
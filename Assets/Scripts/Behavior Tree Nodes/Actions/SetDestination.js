//#pragma strict

import BehaviourMachine;

/** Sets the start point and destination for the car */
public class SetDestination extends ActionNode {
     
	var car : AICar_Script;
    //private var path : Array;
    private var points;
     
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
    function Start () 
    {
		points = car.getPointArray();
		if(points.length>1)
		{
	    	if(car.getDestinationPoint()==null && car.getStartPoint()==null)//this means the "original car"
	    	{	    		
				var max1 : int = points.length - 1;
				var rand1 : int = Mathf.Floor(Random.Range(0,max1+1));
				car.setStartPoint(points[rand1]);
				rand1 = Mathf.Floor(Random.Range(0,max1+1));
				car.setDestinationPoint(points[rand1]);
				
				car.transform.position = car.getStartPoint().transform.position;
				//Debug.Log(car.getStartPoint().transform.position);
				car.transform.rotation = Quaternion.identity;
				
	    		//car.setStartPoint(points[0]); //<---- this will be a random point, where the car is placed. For now, the car is placed behing point1
	    		//car.setDestinationPoint(points[points.length - 2]); //<---- this will be a random point
	    	}
	    	else if(car.getDestinationPoint()==null && car.getStartPoint()!= null)//this means "nyss genererad bil"
	    	{
	    		var max2 : int = points.length - 1;
	    		var rand2 : int = Mathf.Floor(Random.Range(0,max1+1));
	    		car.setDestinationPoint(points[rand2]);
	    		//Debug.Log(car.getStartPoint().transform.position);
	    		car.transform.position = car.getStartPoint().transform.position;
	    	}
	    	else //this means that the car has reached its destination
	    	{
	    		car.setStartPoint(car.getDestinationPoint());
	    		var max : int = points.length - 1;
				var rand : int = Mathf.Floor(Random.Range(0,max+1)); //TODO: should not be same as startpoint or destination - fix!
	    		car.setDestinationPoint(points[rand]);
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
        // Do stuff
        //return Status.Running
        return Status.Success;
        
    }
 
    // Called when the node ends its execution
    function End () {}
 
    // Called when the owner (BehaviourTree or ActionState) is disabled
    function OnDisable () {}
 
    // This function is called to reset the default values of the node
    function Reset () {}
 
    // Called when the script is loaded or a value is changed in the inspector (Called in the editor only)
    function OnValidate () {}
    
}
//#pragma strict

import BehaviourMachine;

/** Sets the start point and destination for the car */
public class SetDestination extends ActionNode {
     
	var car : AICar_Script;
    //private var path : Array;
    private var points;
    var I : int;
     
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
    function Start () 
    {
    	I = 0;
    	//Debug.Log("Set destination for " + car);
		points = car.getPointArray();
		if(points.length>1)
		{
			var max : int = points.length - 1;
			var rand : int;
			var destPoint : Point;
			I = 1;
	    	if(car.getDestinationPoint()==null && car.getStartPoint()==null)//this means the "original car" TODO: this is RedCar!!!
	    	{	
	    		//Debug.Log("case 1");    		
				rand = Mathf.Floor(Random.Range(0,max+1));
				while(points[rand].startOK==false)
				{
					rand = Mathf.Floor(Random.Range(0,max+1));
				}
				car.setStartPoint(points[rand]);
				rand = Mathf.Floor(Random.Range(0,max+1));
				car.setDestinationPoint(points[rand]);
				
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
	    		//Debug.Log("case 3");    
	    		car.setStartPoint(car.getDestinationPoint());
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
 
    // Called when the node ends its execution
    function End () {}
 
    // Called when the owner (BehaviourTree or ActionState) is disabled
    function OnDisable () {}
 
    // This function is called to reset the default values of the node
    function Reset () {}
 
    // Called when the script is loaded or a value is changed in the inspector (Called in the editor only)
    function OnValidate () {}
    
    private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
    
}
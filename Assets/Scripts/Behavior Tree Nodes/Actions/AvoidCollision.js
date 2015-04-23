import BehaviourMachine;

 
public class AvoidCollision extends ActionNode {
     
    var car : AICar_Script;
    private var closeCar : AICar_Script;
    private var timer : int;
     
    // Called when the node starts its execution
    function Start () 
    {
    	car.setBrakePower(200);
    	timer = Time.time;
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
        // Do stuff
  		if(Time.time > timer+0.3 && Time.time < timer+0.4 )
        {
        	car.setBrakePower(100);
        	//return Status.Success;
		}         
        if(Time.time > timer+0.5)
        {
        	Debug.Log("drive");
        	car.setBrakePower(0);
        	//return Status.Success;
		}
		else
			return Status.Running;
    }
}

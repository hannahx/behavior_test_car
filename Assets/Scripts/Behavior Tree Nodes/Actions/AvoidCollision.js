import BehaviourMachine;

 
public class AvoidCollision extends ActionNode {
     
    var car : AICar_Script;
    private var closeCar : AICar_Script;
    private var timer : int;
     
    // Called when the node starts its execution
    function Start () 
    {
    	car.setBrakePower(300);
    	timer = Time.time;
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
        // Do stuff
  		if(Time.time > timer+0.5 && Time.time < timer+0.6 )
        {
        	car.setBrakePower(40);
        	//return Status.Success;
		}         
        if(Time.time > timer+1 && car.getCloseCar()==false)
        {
        	//Debug.Log("drive");
        	car.setBrakePower(0);
        	//return Status.Success;
		}
		else
			return Status.Running;
    }
}

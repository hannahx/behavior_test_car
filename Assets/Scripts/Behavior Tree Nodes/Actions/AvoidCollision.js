import BehaviourMachine;

 
public class AvoidCollision extends ActionNode {
     
    var car : AICar_Script;
    private var closeCar : AICar_Script;
    private var startBrakePower;
     
    // Called when the node starts its execution
    function Start () 
    {
    	startBrakePower = car.getBrakePower();
    	car.setBrakePower(startBrakePower+10);
    }
     
    // This function is called when the node is in execution
    function Update () : Status 
    {
		if(car.getCloseCar()==false)
		{
			car.setBrakePower(startBrakePower);
			return Status.Success;
		}
		else
		{
			car.setBrakePower(car.getBrakePower()+10);
			return Status.Running;
		}
    }
}

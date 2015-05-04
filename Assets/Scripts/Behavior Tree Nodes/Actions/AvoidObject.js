import BehaviourMachine;

 
public class AvoidObject extends ActionNode {
     
    var car : AICar_Script;
    private var closeCar : AICar_Script;
     
    // Called when the node starts its execution
    function Start () 
    {
    	car.AvoidSteer(car.getCloseObject());
    }
     
    // This function is called when the node is in execution
    function Update () : Status 
    {
		if(car.getCloseCar()==false)
		{
			car.setBrakePower(0);
			return Status.Success;
		}
		else
		{
			car.setBrakePower(car.getBrakePower()+20);
			return Status.Running;
		}
    }
}

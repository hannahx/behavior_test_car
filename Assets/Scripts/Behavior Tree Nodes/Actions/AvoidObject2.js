import BehaviourMachine;

 
public class AvoidObject2 extends ActionNode {
     
    var car : AICar_Script;
    private var closeCar : AICar_Script;
     
    // Called when the node starts its execution
    function Start () 
    {
    	car.AvoidSteer(car.getCloseObject());
    	car.steeringSharpness = 70;
    }
     
    // This function is called when the node is in execution
    function Update () : Status 
    {
		return Status.Success;
    }
}

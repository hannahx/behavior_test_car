import BehaviourMachine;

 
public class AvoidObject1 extends ActionNode {
     
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
    
    private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 
}

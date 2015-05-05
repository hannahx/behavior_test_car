#pragma strict
import BehaviourMachine;
 
public class ObjectClose extends ConditionNode {
     
    private var i : int;
    var car : AICar_Script;
    
    
    function Update () : Status 
    {
    	var i : int;
    	if (car.getCloseObject()!=0)
    	{
    		i = 1;
    		//Debug.Log(car.name + " is close to a car!!");
    	}
    	else
    	{
    		i = -1;
		}
        
        if (i > 0) {
            // Send event?
            
            if (onSuccess.id != 0)
                owner.root.SendEvent(onSuccess.id);
 
            // Update status
            return Status.Success;
        }
        else 
        {
            // Update status
            return Status.Failure;
        }
    }
 
    function Reset () {
        super.Reset ();
 
        // My Reset
        i = 0;
    }
}
#pragma strict
import BehaviourMachine;
 
public class CloseToTrafficLight extends ConditionNode {
     
    private var i:int;
    var car : AICar_Script;
    var trafficLightContainer : GameObject; //this is an object that contains all the traffic lights!
    
    private var carPos : Vector3;
    private var trafficLights : Array;
    private var closestTrafficLight : TrafficLight;    
 
    function Update () : Status {
  			carPos = car.getRigidbody().transform.position;
            trafficLights = trafficLightContainer.GetComponentsInChildren( TrafficLight );
            
            for(light in trafficLights)
            {
            	closestTrafficLight = light;
            	var trafficLightPos = closestTrafficLight.transform.position;
	            if (Vector3.Distance(carPos, trafficLightPos)< car.distance-3)	
				{
					i = 1;
					break;
				}
				else
				{
					i = -1;
				}
			}
        
        if (i > 0) {
            // Send event?
            
            if (onSuccess.id != 0)
                owner.root.SendEvent(onSuccess.id);
 
            // Update status
            return Status.Success;
        }
        else {
            // Update status
            return Status.Failure;
        }
    }
 
    function Reset () {
        super.Reset ();
 
        // My Reset
        i = -1;
    }
}
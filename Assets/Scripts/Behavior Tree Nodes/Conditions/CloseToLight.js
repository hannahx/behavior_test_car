#pragma strict
import BehaviourMachine;
 
public class CloseToLight extends ConditionNode {
     
    private var i : int;
    var car : AICar_Script;
    var trafficLightContainer : GameObject; //this is an object that contains all the traffic lights!
    var gos : TrafficLight[];
		
    private var carPos : Vector3;
    private var trafficLights : Array;
    var closestTrafficLight : TrafficLight;    
 	private var dir : Vector3;
 	var distToLight : float;
 	var dotProduct : float;

    function Update () : Status {
  			carPos = car.getRigidbody().transform.position;
            trafficLights = trafficLightContainer.GetComponentsInChildren( TrafficLight );

            for(light in trafficLights)
            {
            	closestTrafficLight = light as TrafficLight;
            	var trafficLightPos = closestTrafficLight.transform.position;
            	
            	// Calculating the cross product between directional vector to the traffic light 
            	// and the car's forward directional direction.
            	
            	// Gets a vector that points from the car's position to the light's. 
            	dir = ( carPos - trafficLightPos ).normalized;
            	var crossProd : Vector3 ;
            	var carDir = carPos.forward.normalized;
            	crossProd = Vector3.Cross(dir,carDir);
            	dotProduct = Vector3.Dot(-dir,carDir);
    			//Debug.Log("" + light + crossProd.y);
            	//Debug.Log("Dot:  " + light + dotProduct);
            	distToLight = Vector3.Distance(carPos, trafficLightPos);
//            	Debug.Log("Dist to " + light + ":  " + distToLight);

            	
 				if (distToLight < car.distance+7 && crossProd.y > 0 && dotProduct < 0.97 && dotProduct > -0.57)
				{
					//Debug.Log("Closest lightW:   " + closestTrafficLight + " in  " + distToLight);
					car.setClosestTrafficLight(closestTrafficLight);
					i = 1;
					break;
				}
				else if (distToLight < car.distance+7 && dotProduct < 0.97 && dotProduct > -0.87)
				{
					//Debug.Log("Closest lightQ:   " + closestTrafficLight + " in  " + distToLight);
					car.setClosestTrafficLight(closestTrafficLight);
					i = 1;
					break;
				}
				else //if (crossProd.y < 0)
				{
//					if(car.getClosestTrafficLight() != null)
//					{
//						//dDebug.Log("No light close!");
//						//car.setClosestTrafficLight(null);
//					}
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
 	
// 	function getCurrentLight()
// 	{
// 		return closestTrafficLight;
// 	}	
// 
    function Reset () {
        super.Reset ();
 
        // My Reset
        i = -1;
    }
}
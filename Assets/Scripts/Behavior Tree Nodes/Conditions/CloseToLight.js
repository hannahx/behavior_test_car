#pragma strict
import BehaviourMachine;
 
public class CloseToLight extends ConditionNode {
     
    private var i:int;
    var car : AICar_Script;
    var trafficLightContainer : GameObject; //this is an object that contains all the traffic lights!
    var gos : TrafficLight[];
		
    private var carPos : Vector3;
    private var trafficLights : Array;
    var closestTrafficLight : TrafficLight;    
 	private var dir : Vector3;
 	
 	// Saving in case we should use the angle between light and car instead...
// 			var targetDir : Vector3;
// 			var forward : Vector3;
// 			targetDir = trafficLightPos - carPos;
//     		forward = car.transform.forward;
//     		var angle = Vector3.Angle(targetDir, forward);
//    		Debug.Log ('angle  ' + angle);
 	
// Red,Green,YellowLight måste få veta vilket traffic light som är aktuellt. Har inte fått det att funka än!	
// har 120 som break power i Stop. 	
    function Update () : Status {
  			carPos = car.getRigidbody().transform.position;
            trafficLights = trafficLightContainer.GetComponentsInChildren( TrafficLight );
            //gos = UnityEngine.GameObject.GetComponentsInChildren( TrafficLight ); 
            //Debug.Log(gos);
            for(light in trafficLights)
            {
            	closestTrafficLight = light;
            	var trafficLightPos = closestTrafficLight.transform.position;
            	
            	// Calculating the cross product between directional vector to the traffic light 
            	// and the car's forward directional direction.
            	
            	// Gets a vector that points from the car's position to the light's. 
            	dir = ( carPos - trafficLightPos ).normalized;
            	var crossProd : Vector3 ;
            	var carDir = carPos.forward.normalized;
            	crossProd = Vector3.Cross(dir,carDir);
    			//Debug.Log("" + light + crossProd.y);
            	
            	
	            if (Vector3.Distance(carPos, trafficLightPos)< car.distance+2 && crossProd.y > 0)
				{
					Debug.Log("Closest light:   " + closestTrafficLight);
					car.setClosestTrafficLight(closestTrafficLight);
					i = 1;
					break;
				}
				else //if (crossProd.y < 0)
				{
					if(car.getClosestTrafficLight() != null)
					{
						Debug.Log("No light close!");
						car.setClosestTrafficLight(null);
					}
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
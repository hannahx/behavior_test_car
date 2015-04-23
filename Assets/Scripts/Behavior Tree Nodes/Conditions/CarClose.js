#pragma strict
import BehaviourMachine;
 
public class CarClose extends ConditionNode {
     
    private var i : int;
    var car : AICar_Script;
    private var cars : Array;
    var carGenerator : GenerateCars;
    private var dir : Vector3;
    var distToCar : float;
 	var dotProduct : float;
    
    
    function Update () : Status 
    {
    	var i : int;
    	if (car.getCloseCar())
    	{
    		i = 1;
    		Debug.Log(car.name + " is close to a car!!");
    	}
    	else
    	{
    		i = -1;
		}
//    	//i = 1;
//		cars = carGenerator.getCars();
//		for(c in cars)
//		{
//    		var closeCar : AICar_Script = c;
//	    	if(car != closeCar)
//	    	{
//	    		car.setCloseCar(closeCar);
//	    		var carPos : Vector3 = car.transform.position;
//		    	dir = ( carPos - closeCar.transform.position ).normalized;
//		    	var crossProd : Vector3 ;
//		    	var carDir = carPos.forward.normalized;
//		    	crossProd = Vector3.Cross(dir,carDir);
//		    	dotProduct = Vector3.Dot(-dir,carDir);
//		    	distToCar = Vector3.Distance(carPos, closeCar.transform.position);
//				if (distToCar < car.distance+30 && crossProd.y > 0 && dotProduct < 0.97 && dotProduct > -0.57)
//				{
//					i = 1;
//					//Debug.Log("Car close!!!");
//					Debug.Log(car.name + " close to " + closeCar.name);
//					//car.setBrakePower(50);
//					//if (distToCar < car.distance+3)
//					//{
//					//	car.setBrakePower(500);
//					//}
//					return Status.Success;
//				}
//				else
//				{
//					i = 0;
//				}
////				else if (distToCar > car.distance+7)
////				{
////					car.setBrakePower(0);
////				}
//			}
//		}
        
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
        i = 0;
    }
}
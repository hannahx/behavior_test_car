﻿#pragma strict
import BehaviourMachine;

public class FudgeBrakeZone extends ActionNode {

	var car : AICar_Script;
    //private var brakePower : float;
    private var AICar : GameObject;
	private var brakingPower : float = 220;
	private var enginePower : float = 0;
	private var insideZone : Array;
	var brakeZoneContainer : GameObject; 
	private var zones : Array;
	var inBrakeZone : boolean;
	
	// Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
	function Start () 
	{
		zones = new Array();
		insideZone = new Array();
	}

	// This function is called when the node is in execution
    function Update () : Status {
        
 		zones = brakeZoneContainer.GetComponentsInChildren( BrakeZone );
		
		for (zone in zones)
		{
			// Find a zone that contains car(s).
			if ( zone == car.getActiveZone() )
			{
			var zone2 : BrakeZone = zone as BrakeZone;
			insideZone = zone2.getCarsInZone();
			//Debug.Log(insideZone);
			//Debug.Log(insideZone + "  inside zone");
			// Stop the car.
//			if (car.stopCounter < 1){
				car.BrakePower = (brakingPower);
//				car.stopCounter ++;
//				Debug.Log("stopCounter " + car.stopCounter);
	//		}
			
			//car.EngineTorque = (enginePower);
				if (car.getStopSign()==true || car.getTriangleSign() == true)
				{
					if (insideZone.length == 1)
					{	
						
						if (car.getStopSign()==true && car.getTriangleSign() == false)
						{
							if (car.rigidbody.velocity.magnitude == 0) {
								car.BrakePower = 0;
								//var blah = Time.time;
								//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
								Debug.Log(car.name + "stopped och can drive again");
							}
						}
						else if (car.getTriangleSign()==true && car.getStopSign() == false)
						{
							car.BrakePower = 0;
						}
						Debug.Log("Foxes  " + car.name );
					}

					else if (insideZone.length > 1 && car.getCloseCar() == false)
					{
						if (car.getStopSign()==true)
						{	
							Debug.Log("Cars in zone:  " + insideZone.length);
							car.BrakePower = 0;
							//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
						}
						else if (car.getTriangleSign()==true)
						{	
							Debug.Log("Cars in zone:  " + insideZone.length);
							car.BrakePower = 0;
							//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
						}
							Debug.Log("Kobras  " + car.name);
						
					}
				}
				else
				{
					//Debug.Log("Right rule applies!");
					// Priority to the right 
					if (insideZone.length == 1)
					{
					// If the car is alone in the zone, then it can drive away.
						//Debug.Log("Cars in zone:  " + insideZone.length);
						car.BrakePower = 0;
						Debug.Log(car.name + " was alone and could leave.");
						//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
					}
					// If the car don't notice another car coming from right...
					else if (insideZone.length > 1 && car.getRightCar() == false)
					{
							Debug.Log(car.name + " has car to the right: " + car.getRightCar());
							car.BrakePower = 0;
							//car.EngineTorque = (Mathf.Lerp(enginePower, 600, Time.deltaTime));
						
					}
				}				
			}				
		}
         
        // Never forget to set the node status
        return Status.Success;
    }
 
    // Called when the node ends its execution
    function End () {}
 
    // Called when the owner (BehaviourTree or ActionState) is disabled
    function OnDisable () {}
 
    // This function is called to reset the default values of the node
    function Reset () {}
 
    // Called when the script is loaded or a value is changed in the inspector (Called in the editor only)
    function OnValidate () {}
    
}
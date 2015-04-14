// These variables allow the script to power the wheels of the car.
var FrontLeftWheel : WheelCollider;
var FrontRightWheel : WheelCollider;
var RearLeftWheel : WheelCollider;
var RearRightWheel : WheelCollider;
 
var mphDisplay : GUIText;
 
var vehicleCenterOfMass : float = 0.0;
var steeringSharpness : float = 12.0;
 
// These variables are for the gears, the array is the list of ratios. The script
// uses the defined gear ratios to determine how much torque to apply to the wheels.
var GearRatio : float[];
var CurrentGear : int = 0;
 
// These variables are just for applying torque to the wheels and shifting gears.
// using the defined Max and Min Engine RPM, the script can determine what gear the
// car needs to be in.
var EngineTorque : float = 600.0;
var BrakePower : float = 0;
var MaxEngineRPM : float = 3000.0;
var MinEngineRPM : float = 1000.0;
private var EngineRPM : float = 0.0;

var distance : float = 6.0; //global distance variable for att mäta avstånd....!?

//Points
var pointContainer : GameObject;
var points;								//array with all points
var pointMatrix = new Array();			//matrix with road netwotk (has info about which roads that are connected)
private var nextPoint : Point; 			//next point in path
var path = new Array(); 				//the calculated path
private var indexInPath = 0;
private var startPoint : Point = null;
private var destinationPoint : Point = null;
 
// input steer and input torque are the values substituted out for the player input. The 
// "NavigateTowardsWaypoint" function determines values to use for these variables to move the car
// in the desired direction.
private var inputSteer : float = 0.0;
private var inputTorque : float = 0.0;
 
//Viariables for the sensors
var SENSORS : boolean = false;
var sensorLength : float = 5;  
private var frontSensorStartPoint : float = 2.8;
private var frontSensorSideDist : float = 1;  
var frontSensorAngle : float = 30;
var sidewaySensorLength : float = 5;
private var flag : int = 0;
 
var decellarationSpeed : float = 2000; 

function Start () 
{
    // I usually alter the center of mass to make the car more stable. I'ts less likely to flip this way.
    rigidbody.centerOfMass.y = (vehicleCenterOfMass);
	GetPoints();
}
 
function FixedUpdate () 
{    
    var mph = rigidbody.velocity.magnitude * 2.237;
    mphDisplay.text = mph.ToString("F0") + " : MPH"; // displays one digit after the dot
     
    // This is to limith the maximum speed of the car, adjusting the drag probably isn't the best way of doing it,
    // but it's easy, and it doesn't interfere with the physics processing.
    rigidbody.drag = rigidbody.velocity.magnitude / 250;
     
    //Add sensors to the car
    Sensors();
     
    // Compute the engine RPM based on the average RPM of the two wheels, then call the shift gear function
    EngineRPM = (FrontLeftWheel.rpm + FrontRightWheel.rpm)/2 * GearRatio[CurrentGear];
    ShiftGears();
 
    // set the audio pitch to the percentage of RPM to the maximum RPM plus one, this makes the sound play
    // up to twice it's pitch, where it will suddenly drop when it switches gears.
    audio.pitch = Mathf.Abs(EngineRPM / MaxEngineRPM) + 1.0 ;
    // this line is just to ensure that the pitch does not reach a value higher than is desired.
    if ( audio.pitch > 2.0 ) { //TODO remove audio? finns det ens nåt ljud?
        audio.pitch = 2.0;
    }
     
    // finally, apply the values to the wheels. The torque applied is divided by the current gear, and
    // multiplied by the calculated AI input variable.
    FrontLeftWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * inputTorque;
    FrontRightWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * inputTorque;
     
    RearLeftWheel.brakeTorque = BrakePower;
    RearRightWheel.brakeTorque = BrakePower;
         
    // the steer angle is an arbitrary value multiplied by the calculated AI input.
    FrontLeftWheel.steerAngle = (steeringSharpness) * inputSteer;
    FrontRightWheel.steerAngle = (steeringSharpness) * inputSteer;
     
}
 
function ShiftGears() {
    // this funciton shifts the gears of the vehcile, it loops through all the gears, checking which will make
    // the engine RPM fall within the desired range. The gear is then set to this "appropriate" value.
    if ( EngineRPM >= MaxEngineRPM ) {
        var AppropriateGear : int = CurrentGear;
         
        for ( var i = 0; i < GearRatio.length; i ++ ) {
            if ( FrontLeftWheel.rpm * GearRatio[i] < MaxEngineRPM ) {
                AppropriateGear = i;
                break;
            }
        }
         
        CurrentGear = AppropriateGear;
    }
     
    if ( EngineRPM <= MinEngineRPM ) {
        AppropriateGear = CurrentGear;
         
        for ( var j = GearRatio.length-1; j >= 0; j -- ) {
            if ( FrontLeftWheel.rpm * GearRatio[j] > MinEngineRPM ) {
                AppropriateGear = j;
                break;
            }
        }
         
        CurrentGear = AppropriateGear;
    }
}

/** Drives the car towards PostProcessAttribute. This function is used in MoveTowardsNextPoint (in behavior tree) */
function Drive (pos) {
    // Drive towards pos                                                                                                    
    var RelativeWaypointPosition : Vector3 = transform.InverseTransformPoint(pos);                                                                                     
                                                                                                                                      
    // by dividing the horizontal position by the magnitude, we get a decimal percentage of the turn angle that we can use to drive the wheels
    inputSteer = RelativeWaypointPosition.x / RelativeWaypointPosition.magnitude;
     
    // now we do the same for torque, but make sure that it doesn't apply any engine torque when going around a sharp turn...
    if ( Mathf.Abs( inputSteer ) < 0.5 ) 
    {
        inputTorque = RelativeWaypointPosition.z / RelativeWaypointPosition.magnitude - Mathf.Abs( inputSteer );
    }
    else
    {
        inputTorque = 0.0;
    }
}
 
function Sensors()
{
if(SENSORS == true)
{
flag = 0;
 
var pos : Vector3;
var hit : RaycastHit;
var rightAngle = Quaternion.AngleAxis(frontSensorAngle, transform.up)*transform.forward;
var rightAngle2 = Quaternion.AngleAxis((frontSensorAngle+20), transform.up)*transform.forward;
var leftAngle = Quaternion.AngleAxis(-frontSensorAngle, transform.up)*transform.forward;
var leftAngle2 = Quaternion.AngleAxis((-frontSensorAngle-20), transform.up)*transform.forward;
var avoidSensitivity : float = 0;
 
pos = transform.position;  
pos += transform.forward*frontSensorStartPoint;  
   
//BRAKING SENSOR  
if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){  
if (hit.transform.tag != "DriveThrough"){  
flag++;  
RearLeftWheel.brakeTorque = decellarationSpeed;  
RearRightWheel.brakeTorque = decellarationSpeed;  
Debug.DrawLine(pos,hit.point,Color.red);  
}  
}  
else {  
RearLeftWheel.brakeTorque = 0;  
RearRightWheel.brakeTorque = 0;  
}
 
////Front Mid Sensor  
//pos = transform.position;  
//pos += transform.forward*frontSensorStartPoint;  
//if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){  
//  
//Debug.DrawLine(pos,hit.point,Color.red);  
//}  
   
//Front Straight Right Sensor  
pos += transform.right*frontSensorSideDist;  
   
if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){  
if (hit.transform.tag != "DriveThrough"){  
flag++;  
avoidSensitivity -= 1;   
////Debug.Log("Avoiding");  
Debug.DrawLine(pos,hit.point,Color.red);  
}  
}  
else if (Physics.Raycast(pos,rightAngle,hit,sensorLength)){  //angle(RIGHT)
if (hit.transform.tag != "DriveThrough"){  
avoidSensitivity -= 0.5;   
flag++;  
Debug.DrawLine(pos,hit.point,Color.red);  
}  
}  
else if (Physics.Raycast(pos,rightAngle2,hit,sensorLength)){  //angle2(RIGHT)
if (hit.transform.tag != "DriveThrough"){  
avoidSensitivity -= 0.5;   
flag++;  
Debug.DrawLine(pos,hit.point,Color.blue);  
}  
}  
 
 
   
//Front Straight left Sensor  
pos = transform.position;  
pos += transform.forward*frontSensorStartPoint;  
pos -= transform.right*frontSensorSideDist;  
   
if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){  
if (hit.transform.tag != "DriveThrough"){  
flag++;  
avoidSensitivity += 1;   
////Debug.Log("Avoiding");  
Debug.DrawLine(pos,hit.point,Color.red);  
}  
}  
else if (Physics.Raycast(pos,leftAngle,hit,sensorLength)){  //angle(LEFT)
if (hit.transform.tag != "DriveThrough"){  
flag++;  
avoidSensitivity += 0.5;  
Debug.DrawLine(pos,hit.point,Color.red);  
}  
}  
else if (Physics.Raycast(pos,leftAngle2,hit,sensorLength)){  //angle2(LEFT)
if (hit.transform.tag != "DriveThrough"){  
flag++;  
avoidSensitivity += 0.5;  
Debug.DrawLine(pos,hit.point,Color.blue);  
}  
}  
   
//Right SideWay Sensor  
if (Physics.Raycast(transform.position,transform.right,hit,sidewaySensorLength)){  
if (hit.transform.tag != "DriveThrough"){  
flag++;  
avoidSensitivity -= 0.5;  
Debug.DrawLine(transform.position,hit.point,Color.red);  
}  
}  
   
   
//Left SideWay Sensor  
if (Physics.Raycast(transform.position,-transform.right,hit,sidewaySensorLength)){  
if (hit.transform.tag != "DriveThrough"){  
flag++;  
avoidSensitivity += 0.5;  
Debug.DrawLine(transform.position,hit.point,Color.red);  
}  
}  
 
pos = transform.position;
pos += transform.forward*frontSensorStartPoint;  
//Front Mid Sensor  
if (avoidSensitivity == 0){  
   
if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){  
if (hit.transform.tag == "AI")
{
//Debug.Log("CAR!!!!");  
if(EngineTorque>0)
{
    EngineTorque -= 10; //Slow down if car in front of you. (Fixa så att hastigheten inte blir negativ!)
}
}
if (hit.transform.tag != "DriveThrough"){  
if (hit.normal.x < 0 )  
avoidSensitivity = -1;  
else  
avoidSensitivity = 1;  
Debug.DrawLine(pos,hit.point,Color.red);  
}  
}  
}  
 
 
if (flag != 0)  
AvoidSteer (avoidSensitivity); 
 
}
}
 
function AvoidSteer(sensitivity : float)
{  
    ////Debug.Log("Sensitivity:");
    ////Debug.Log(sensitivity);
    inputSteer = sensitivity*steeringSharpness;
    //FrontLeftWheel.steerAngle = steeringSharpness*sensitivity*10;  
    //FrontRightWheel.steerAngle = steeringSharpness*sensitivity*10;
}  

function GetPoints()
{
	var POINTS : Array = pointContainer.GetComponentsInChildren( Point );
	
	var zeroArray : Array = new Array(POINTS.lenght);
	
	points = new Array(POINTS.length);
	var i : int = 0;
	for(p in POINTS)
	{
		points[i] = p;
		////Debug.Log(points[i].transform.position);
		zeroArray[i] = 0;		
		i++;
	}
	
	//generate pointMatrix (zeros)
	var j : int;
	for(i=0; i<POINTS.length; i++)
	{
		pointMatrix[i] = new Array();
		for(j=0; j<POINTS.length; j++)
		{
			pointMatrix[i][j] = 0;
		}
		
	}
	
	//fill pointMatrix (ones)
	var x : int = 0;
	var y : int;	
	for(p in pointMatrix)
	{
		var next = [points[x].next1, points[x].next2, points[x].next3];
		for(n in next)
		{
			if(n)
			{
				var Next : Point = n;
				////Debug.Log("next1");
				y = 0;
				for(P in p)
				{
					if(points[y]==Next)
					{
						//P = 1;
						P = Vector3.Distance(points[x].transform.position, Next.transform.position);
					}
					////Debug.Log(P);
					y++;
				}
			}
		}
		x++;
	}	 				
}


function getRigidbody()
{
	return rigidbody;
}

function getNextPoint()
{
	return nextPoint;
}

function setNextPoint(p)
{
	nextPoint = p;
}

function getPointArray()
{
	return points;
}

function getPointMatrix()
{
	return pointMatrix;
}

function setPath(p)
{
	path = p;
}

function getPath()
{
	return path;
}

function getIndexInPath()
{
	return indexInPath;
}

function setIndexInPath(i)
{
	indexInPath = i;
}

function setStartPoint(p)
{
	startPoint = p;
}

function getStartPoint()
{
	return startPoint;
}

function setDestinationPoint(p)
{
	destinationPoint = p;
}

function getDestinationPoint()
{
	return destinationPoint;
}
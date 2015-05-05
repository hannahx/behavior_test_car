#pragma strict

private var color; //can be green, yellow or red
var material : Material;
private var rend: Renderer;
private var colorRed : Color = Color.red;
private var colorGreen : Color = Color.green;
private var colorYellow : Color = Color.yellow;
private var currentColor : Color;
var StartTimerLater : boolean;
var TimeDelay : float;
var RandomLight : boolean;
private var randomDelay : float;
private var delay : float;
private var slack : boolean;



function Start() {
	rend = GetComponent.<Renderer>();
	
	if(StartTimerLater==true)
	{	
		delay = TimeDelay * 4;
		yield new WaitForSeconds(delay);
		
	}
	ChangeLight();
}

function Update()
{	
}

function ChangeLight() {
	while (true)
	{
		rend.material.color = colorGreen;
		currentColor = colorGreen;
		yield new WaitForSeconds(3);
		rend.material.color = colorYellow;
		currentColor = colorYellow;
		yield new WaitForSeconds(0.5);
		rend.material.color = colorRed;
		currentColor = colorRed;
		yield new WaitForSeconds(3);
		if (RandomLight == true)
		{
			if (slack == true){
			
				randomDelay = Random.value;	
				yield new WaitForSeconds(randomDelay*3);	
			}
		}
		rend.material.color = colorYellow;
		currentColor = colorYellow;
		yield new WaitForSeconds(0.5);
		slack = randomBoolean();
	}
}


function getCurrentColor()
{
	return currentColor;
}
	
function getMaterial()
{
	return material;
}

function randomBoolean() :boolean
{
   return (Random.value > 0.5f);
}
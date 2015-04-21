#pragma strict

private var color; //can be green, yellow or red
var material : Material;
private var rend: Renderer;
private var colorRed : Color = Color.red;
private var colorGreen : Color = Color.green;
private var colorYellow : Color = Color.yellow;
private var currentColor : Color;
var StartTimerLater : boolean;

function Start() {
	rend = GetComponent.<Renderer>();
	
	if(StartTimerLater==true)
	{
		yield new WaitForSeconds(3.5);
	}
	
	var i = 1;
	while (i==1)
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
		rend.material.color = colorYellow;
		currentColor = colorYellow;
		yield new WaitForSeconds(0.5);
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
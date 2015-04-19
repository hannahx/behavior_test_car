#pragma strict

private var color; //can be green, yellow or red
var material : Material;
var rend: Renderer;
var colorRed : Color = Color.red;
var colorGreen : Color = Color.green;
var colorYellow : Color = Color.yellow;
var currentColor : Color;

//var shader : Shader;

function Start() {
	rend = GetComponent.<Renderer>();
	//shader = Shader.Find("Transparent/Diffuse");
	
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
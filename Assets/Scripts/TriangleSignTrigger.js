﻿//#pragma strict

private var hasTriangleSign : boolean;
private var enterCar : AICar_Script; 

function Start() {

}

// 
function OnTriggerEnter (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	enterCar = parentparent.GetComponent(AICar_Script);
	Debug.Log(enterCar.name + "  has triangle sign!");
	enterCar.setTriangleSign(true);
	
}

private function SilenceWarnings() : void { var al : ArrayList; if(al == null); var ae : AccelerationEvent; if(ae == 10) SilenceWarnings(); } 

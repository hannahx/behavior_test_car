#pragma strict

private var enterCar : AICar_Script; 
private var exitCar : AICar_Script; 
function Start() {

}

// 
function OnTriggerEnter (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	enterCar = parentparent.GetComponent(AICar_Script);
	enterCar.setSpeedLimit(30);
	enterCar.setLimiterEntered(true);
	
}

function OnTriggerExit (c : Collider) {
	var parentparent = c.gameObject.transform.parent.gameObject;
	exitCar = parentparent.GetComponent(AICar_Script);
	exitCar.setLimiterEntered(false);
}
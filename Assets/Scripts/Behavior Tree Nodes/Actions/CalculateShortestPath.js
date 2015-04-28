
import BehaviourMachine;

/** The class/action node is supposed to calculate SHORTEST path (maybe with A*?) 
*   but calculates a "random" path for now... */
public class CalculateShortestPath extends ActionNode {
     
	var car : AICar_Script;
 	private var startPoint : Point;
    private var destinationPoint : Point;
	private var startPointIndex : int;
    private var destinationPointIndex : int;
    private var path : Array;
    private var points;
    private var pointMatrix;   
    private var Infinity = float.PositiveInfinity;
	private var PathLengths;
	private var Predecessors;
     
    // Called once when the node is created
    function Awake () {}
 
    // Called when the owner (BehaviourTree or ActionState) is enabled
    function OnEnable () {}
     
    // Called when the node starts its execution
    function Start () 
    {
    	points = car.getPointArray();
    	pointMatrix = car.getPointMatrix();
    	
    	path = new Array();
    	destinationPoint = car.getDestinationPoint();
		startPoint = car.getStartPoint();
		path.push(startPoint);
    	
    	for(var p=0; p<points.length; p++)
    	{	
			if(points[p]==startPoint)
			{
				startPointIndex = p;
			}
			if(points[p]==destinationPoint)
			{
				destinationPointIndex = p;
			}
    	}
    	
    	// Compute the shortest paths from startPointIndex to each other vertex in the graph.
    	shortestPath(pointMatrix, points.length, startPointIndex);
    	// Get the shortest path from startPoint to destinationPointIndex.
		constructPath(destinationPointIndex);
		//Debug.Log("PATH from " + startPoint.name + " to " + destinationPoint.name);
		//Debug.Log(path);
    }
     
    // This function is called when the node is in execution
    function Update () : Status 
    {  
		car.setPath(path);
		return Status.Success;
    }

	/** Dijkstra's Algorithm finds the shortest path 
	  * Source: http://mcc.id.au/2004/10/shortest-path-js.html */
	function shortestPath(edges, numVertices, startVertex) 
	{
		var done : Array = new Array();
		for(var d=0; d<numVertices; d++)
		{
			done.push(false);
			
		}
		done[startVertex] = true;
		var pathLengths = new Array(numVertices);
		var predecessors = new Array(numVertices);
		for (var i = 0; i < numVertices; i++) 
		{
			pathLengths[i] = edges[startVertex][i];
		    if (edges[startVertex][i] != Infinity) 
		    {
		      predecessors[i] = startVertex;
		    }
		}
		pathLengths[startVertex] = 0;
		for (i = 0; i < numVertices - 1; i++) 
		{
		    var closest = -1;
		    var closestDistance = Infinity;
		    for (var j = 0; j < numVertices; j++) 
		    {
				if (!done[j] && pathLengths[j] < closestDistance) 
				{
					closestDistance = pathLengths[j];
		        	closest = j;
				}
		    }
		    done[closest] = true;
		    for (j = 0; j < numVertices; j++) 
		    {
				if (!done[j]) 
				{
		        	var possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
		        	if (possiblyCloserDistance < pathLengths[j]) 
		        	{
		          		pathLengths[j] = possiblyCloserDistance;
		          		predecessors[j] = closest;
		        	}
		      	}
		    }
		}
	   	PathLengths = pathLengths;
	   	Predecessors = predecessors;
	}

	function constructPath(endVertex) 
	{
	  	var indexPath = new Array();
	  	while (endVertex != startPointIndex) 
	  	{
		    indexPath.unshift(endVertex);
		    endVertex = Predecessors[endVertex]; 
	  	}
	  	for(p in indexPath)
	  	{
	  		if(p!=null)
	  			path.push(points[p]);
	  	}
	}             
}
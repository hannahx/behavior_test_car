//#pragma strict

import BehaviourMachine;

/** The class/action node is supposed to calculate SHORTEST path (maybe with A*?) 
*   but calculates a "random" path for now... */
public class CalculatePath extends ActionNode {
     
	var car : AICar_Script;
 	private var startPoint : Point;
    private var destinationPoint : Point;
    private var path : Array;
    private var points;
    private var pointMatrix;
    private var destinationFound; //1 if found, 0 if not	

     
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
    	
    	destinationFound = 0;
    	
    }
     
    // This function is called when the node is in execution
    function Update () : Status {
        //Debug.Log("path?");
        findPath();     
        
		car.setPath(path);
		//Debug.Log("Path found:");	
		var pathString = "";	
		for(p in path)
		{
			pathString = pathString + p + " ";
		}
		//Debug.Log(pathString);
		return Status.Success;


        // Never forget to set the node status
        //return Status.Running;
    }
 
    // Called when the node ends its execution
    function End () {}
 
    // Called when the owner (BehaviourTree or ActionState) is disabled
    function OnDisable () {}
 
    // This function is called to reset the default values of the node
    function Reset () {}
 
    // Called when the script is loaded or a value is changed in the inspector (Called in the editor only)
    function OnValidate () {}
    
    function findPath()
    {
    	var x : int = 0;
		var y : int;
		var possiblePaths : Array;
        for(p in pointMatrix)
		{
			y = 0;
			possiblePaths = new Array();
			for(P in p)
			{
				if(points[x]==path[path.length-1])
				{
					if(P!=0)
					{
						if(points[y] == destinationPoint)
						{
							path.push(points[y]);
							destinationFound = 1;
							break;
						}
						else
						{
							possiblePaths.push(points[y]);
						}					
					}
				}
				
				y++;
			}			
			if(destinationFound == 1)
				break;			
			
			if(possiblePaths.length==1)
			{
				path.push(possiblePaths[0]);
			}
			else if (possiblePaths.length>1)
			{
				var max : int = possiblePaths.length - 1;
				var rand : int = Mathf.Floor(Random.Range(0,max+1));
				if(rand != possiblePaths.length)
				{
					path.push(possiblePaths[rand]);
				}
				else
				{
					path.push(possiblePaths[rand-1]);
				}
			}
			x++;
		}
		
		if(destinationFound == 0)
		{
			//Debug.Log("Path not found :(");
			findPath();
		}
//		else
//		{
//			//Debug.Log("Path found :)");
//		}
    }
    
    
}

//
///** Finds the shortest path with Dijksta's Agorithm */
//function Dijkstra(Graph, source)
//{
//       //dist[source] ← 0                       // Distance from source to source
//       var dist : float = 0; 
//       
//       //prev[source] ← undefined               // Previous node in optimal path initialization
//       var prev : float;
// 
//       //for each vertex v in Graph:  // Initialization
//       
//	for(p in pointMatrix)
//	{
//		for(v in p)
//		{
//		
//		}
//	}
//       
//           if v ≠ source            // Where v has not yet been removed from Q (unvisited nodes)
//              dist[v] ← infinity             // Unknown distance function from source to v
//               prev[v] ← undefined            // Previous node in optimal path from source
//          end if 
//          add v to Q                     // All nodes initially in Q (unvisited nodes)
//      end for
//      
//      while Q is not empty:
//          u ← vertex in Q with min dist[u]  // Source node in first case
//          remove u from Q 
//          
//          for each neighbor v of u:           // where v is still in Q.
//              alt ← dist[u] + length(u, v)
//              if alt < dist[v]:               // A shorter path to v has been found
//                  dist[v] ← alt 
//                  prev[v] ← u 
//              end if
//          end for
//      end while
//
//      return dist[], prev[]
//}
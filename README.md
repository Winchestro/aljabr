PolyGL
================

Made a lot of changes, went down a few new, very different paths. Settled for keeping the low level stuff in pure JS and focus on that for now, then discovered this wonderful technique of using iframes to get access to a new set of built-ins in a fresh execution environment.

So my current approach is heavily focused on extending built-ins, especially WebGL objects which allows a wonderfully minimal, insightful API with very little overhead (my classes still make heavily use of getters to get insight into the current state). I'm very pleased with this development even though it took multiple complete rewrites since the last update to get there. My coding style also changed drastically.

My long term goals for the project are still the same. Maybe I'll write more about it again once I finish the mesh.
# Photo Search UI

Web UI implemented in Angular for searching and verification of photos. Takes an image URL and then accesses the p-hash service to calculate a perceptive hash of the photo. 

Supports two actions over the Orbs blockchain smart contract holding the photo registry (both performed using a direct client query to the blockchain):

1. Verify - Check whether the photo exists in the registry and return its metadata

2. Search - Find similar images in the registry according to perceptive hash distance

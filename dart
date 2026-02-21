// Example of a Hype Button for the Spectator UI
Widget buildCrowdControls(String roomId, String rapperId) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      IconButton(
        icon: Text("🔥", style: TextStyle(fontSize: 30)),
        onPressed: () {
          socket.emit('crowd-hype', {
            'roomId': roomId,
            'targetRapperId': rapperId,
            'hypeType': 'fire'
          });
        },
      ),
      IconButton(
        icon: Text("👏", style: TextStyle(fontSize: 30)),
        onPressed: () {
          socket.emit('crowd-hype', {
            'roomId': roomId,
            'targetRapperId': rapperId,
            'hypeType': 'clap'
          });
        },
      ),
    ],
  );
}

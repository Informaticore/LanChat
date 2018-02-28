# LanChat
This is a Chat you can easiely setup in your lan environment on a lan party e.g. to chat with others.

TBD:
- [ ] Styling in generall
- [ ] Styling the Chat-Conversation
- [ ] Notifications
- [ ] Vote Feature to let the audience vote for a Game or what ever

## How to use
To run the server checkout the project and run ```node index.js``` 
>NOTE: Nodes.js has to be installed on you computer

The command will print something like
```
Listening on port 61330 
```
The chat is nor ready to be used. Open the browser and enter http://localhost:61330, press enter and you should be able to see the chat.
To access the chat from a different computer within your network you just use the ip address of the comper which startet the index.js file in the url for example http://192.168.178.1:61330. 

## Changing the port
Open the index.js file in a editor and change the line ``` var port = 61330; ``` to what ever port you want to use.

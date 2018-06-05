# atom-chat-plugin
A chat plugin for Atom. Currently this project has been moved to a private repo. 

![ScreenShot](https://user-images.githubusercontent.com/22923895/40329544-e2cab944-5d17-11e8-9874-695f9524f373.png)


## Usage
On MacOS: 
```
"ctrl-alt-p": "eoko:toggle",                    // View chat page
"ctrl-alt-m": "eoko:toggleOnlineMembers",       // View Online Members
"ctrl-alt-t": "eoko:toggleTasks",               // View Tasks
"ctrl-alt-a": "eoko:toggleAuth"                 // View Settings 
``` 


## Possible Errors
* If encounter with this error when setting up a server: 
```
lvl=warn msg="can't bind default web address, trying alternatives" obj=web addr=127.0.0.1:4040
t=2018-06-04T13:23:24-0400 lvl=info msg="component stopped" obj=controller comp=web err="listen tcp 127.0.0.1:4040: bind: address already in use"
``` 

* Most likely a port is active even when Atom is closed. To check if a port is active (e.g port 4040): 
```
$ sudo lsof -i :4040 
COMMAND  PID        USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ngrok   2233 cassandrale    6u  IPv4 0xa71dd35f156aa89d      0t0  TCP localhost:yo-main (LISTEN) 
```
* If a process is returned, kill it with its PID: 
``` 
$ kill -9 2233 
``` 

## Current Issues + Updates
* **Bind: address has already been used (ngrok):** this issue has been fixed by parsing port number and kill all its active proccesses. However, the chat doesn't automatically refresh despite server being cleared for running. Atom has to be restarted. 

## Useful Resources
* Authentication with Socket.io: https://github.com/facundoolano/socketio-auth
* Hacking Atom editor: https://flight-manual.atom.io/hacking-atom/sections/tools-of-the-trade/ 



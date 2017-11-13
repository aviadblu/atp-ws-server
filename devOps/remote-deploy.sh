#!/usr/bin/env bash
rm -rf /home/aviad/atp-ws-server/build/dist
rm -rf /home/aviad/atp-ws-server/build/node_modules
tar -xf /home/aviad/atp-ws-server/build.tar -C /home/aviad/atp-ws-server/build
rm /home/aviad/atp-ws-server/build.tar

#cd /home/aviad/atp-ws-server/build
#forever start --append --uid "atpwsserver" dist/app.js
/home/aviad/atp-ws-server/build/node_modules/forever/bin/forever restart atpwsserver


# BluetoothRocks! Drone
Control a Parrot Mini Drone using WebBluetooth


## What do you need?

A browser that support WebBluetooth and a drone, like:

- [Parrot Mini Drone Mars](https://www.parrot.com/eu/minidrones/parrot-airborne-cargo-mars#parrot-airborne-cargo-mars)
- [Parrot Mini Drone Mambo](https://www.parrot.com/eu/minidrones/parrot-mambo-mission#parrot-mambo-mission)


## How does this work?

The browser can connect to a Bluetooth LE device like the drone using the WebBluetooth API. Each Bluetooth device has a number of services and characteristics. Think of them like objects with properties. Once connected to the device, the API then exposes these services and characteristics and you can read from and write to those characteristics. 

The drone in itself is completely stable. This demo then sends specific flight control commands to the drone by writing them to a characteristic that the device exposes. We can send commands to lift of, go higher, go lower, move forwards and backwards and turn. And it also understands commands to do certain tricks.


## Why??

What do you mean? Because it's fun, of course!


## Credits

This demo is based on an earlier demo created by [Peter O'Shaughnessy](https://github.com/poshaughnessy/web-bluetooth-parrot-drone)
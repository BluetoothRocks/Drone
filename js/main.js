(function() {

  function setupUI() {

    let drone = ParrotDrone(),
      connectButton = document.getElementById('connectBtn'),
      takeOffButton = document.getElementById('takeOffBtn'),
      forwardButton = document.getElementById('forwardBtn'),
      backwardButton = document.getElementById('backwardBtn'),
      leftButton = document.getElementById('leftBtn'),
      rightButton = document.getElementById('rightBtn'),
      upButton = document.getElementById('upBtn'),
      downButton = document.getElementById('downBtn'),
      hoverButton = document.getElementById('hoverBtn'),
      flipButton = document.getElementById('flipBtn'),
      landButton = document.getElementById('landBtn'),
      emergencyButton = document.getElementById('emergencyBtn');

    connectButton.addEventListener('click', () => {
      document.body.classList.add('connecting');
      document.body.classList.remove('connected');
      connectButton.innerHTML = 'CONNECTING...';
      drone.connect()
        .then(() => {
          document.body.classList.remove('connecting');
          document.body.classList.add('connected');
          connectButton.innerHTML = 'CONNECTED';
        })
        .catch(() => {
          document.body.classList.remove('connecting');
          document.body.classList.remove('connected');
          connectButton.innerHTML = 'CONNECT';
        });
    });

    takeOffButton.addEventListener('click', drone.takeOff);
    forwardButton.addEventListener('click', drone.moveForwards);
    backwardButton.addEventListener('click', drone.moveBackwards);
    leftButton.addEventListener('click', drone.moveLeft);
    rightButton.addEventListener('click', drone.moveRight);
    upButton.addEventListener('click', drone.moveUp);
    downButton.addEventListener('click', drone.moveDown);
    hoverButton.addEventListener('click', drone.hover);
    flipButton.addEventListener('click', drone.flip);
    landButton.addEventListener('click', drone.land);
    emergencyButton.addEventListener('click', drone.emergencyCutOff);



    document.addEventListener('keydown', handleKeyEvent);
    document.addEventListener('keyup', handleKeyEvent);			
    
    var lastKey = null;
    
    var activeKeys = {
      'Escape':     [ 'land', drone.land ],
      'Enter':      [ 'takeOff', drone.takeOff ],
      'a':          [ 'moveUp', drone.moveUp ],
      'z':          [ 'moveDown', drone.moveDown ],
      'Space':      [ 'flip', drone.flip ],
      'ArrowUp':    [ 'moveForwards', drone.moveForwards ],
      'ArrowDown':  [ 'moveBackwards', drone.moveBackwards ],
      'ArrowLeft':  [ 'moveLeft', drone.moveLeft ],
      'ArrowRight': [ 'moveRight', drone.moveRight ]
    }
    
    function handleKeyEvent(event) {
      if (event.type != 'keydown' && event.type != 'keyup') return;
    
      var key = event.key;
      if (key == ' ') key = 'Space';

      if (activeKeys.hasOwnProperty(key)) {
        if (event.type == 'keydown') {
          document.body.classList.add(activeKeys[key][0]);
        }
        else {
          document.body.classList.remove(activeKeys[key][0]);
          activeKeys[key][1]();
        }

        event.preventDefault();
      }
    }

    const gamepad = new Gamepad();
    
    gamepad.on('press', 'd_pad_up', () => { handleGamePadDown('ArrowUp') } );
    gamepad.on('release', 'd_pad_up', () => { handleGamePadUp('ArrowUp') } );
    gamepad.on('press', 'd_pad_left', () => { handleGamePadDown('ArrowLeft') } );
    gamepad.on('release', 'd_pad_left', () => { handleGamePadUp('ArrowLeft') } );
    gamepad.on('press', 'd_pad_right', () => { handleGamePadDown('ArrowRight') } );
    gamepad.on('release', 'd_pad_right', () => { handleGamePadUp('ArrowRight') } );
    gamepad.on('press', 'd_pad_down', () => { handleGamePadDown('ArrowDown') } );
    gamepad.on('release', 'd_pad_down', () => { handleGamePadUp('ArrowDown') } );
    
    gamepad.on('press', 'shoulder_bottom_right', () => { handleGamePadDown('a') } );
    gamepad.on('release', 'shoulder_bottom_right', () => { handleGamePadUp('a') } );
    gamepad.on('press', 'shoulder_bottom_left', () => { handleGamePadDown('z') } );
    gamepad.on('release', 'shoulder_bottom_left', () => { handleGamePadUp('z') } );

    gamepad.on('press', 'shoulder_top_right', () => { handleGamePadDown('Enter') } );
    gamepad.on('release', 'shoulder_top_right', () => { handleGamePadUp('Enter') } );
    gamepad.on('press', 'shoulder_top_left', () => { handleGamePadDown('Escape') } );
    gamepad.on('release', 'shoulder_top_left', () => { handleGamePadUp('Escape') } );

    gamepad.on('press', 'button_1', () => { handleGamePadDown('Space') } );
    gamepad.on('release', 'button_1', () => { handleGamePadUp('Space') } );

    
    function handleGamePadDown(key) {
      document.body.classList.add(activeKeys[key][0]);
    }

    function handleGamePadUp(key) {
      document.body.classList.remove(activeKeys[key][0]);
      activeKeys[key][1]();
    }      
  }

  function installServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      }).catch(function(err) {
        console.log('ServiceWorker registration failed:', err);
      });
    }
  }

  setupUI();
  installServiceWorker();

})();

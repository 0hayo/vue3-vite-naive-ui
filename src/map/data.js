export const radarData = [
  {
    radius: 100,
    color: '#ff0000',
    opacity: 0.5,
    speed: 5,
    position: {
      x: 0,
      y: 0.1,
      z: 0
    }
  },
  {
    radius: 10,
    opacity: 0.6,
    color: '#efad35',
    speed: 5,
    position: {
      x: 80,
      y: 0.1,
      z: 0
    }
  },
  {
    radius: 10,
    opacity: 0.6,
    color: '#efad35',
    speed: 5,
    position: {
      x: -80,
      y: 0.1,
      z: 0
    }
  },
  {
    radius: 10,
    opacity: 0.6,
    color: '#efad35',
    speed: 5,
    position: {
      x: 0,
      y: 0.1,
      z: 80
    }
  },
  {
    radius: 10,
    opacity: 0.6,
    color: '#efad35',
    speed: 5,
    position: {
      x: 0,
      y: 0.1,
      z: -80
    }
  }
]

export const wallData = [{
  position: {
      x: 80,
      y: 0,
      z: 0
  },
  speed: 0.5,
  color: '#efad35',
  opacity: 0.6,
  radius: 10,
  height: 5,
  renderOrder: 5
},
{
  position: {
      x: -80,
      y: 0,
      z: 0
  },
  speed: 0.5,
  color: '#efad35',
  opacity: 0.6,
  radius: 10,
  height: 5,
  renderOrder: 5
},
{
  position: {
      x: 0,
      y: 0,
      z: 80
  },
  speed: 0.5,
  color: '#efad35',
  opacity: 0.6,
  radius: 10,
  height: 5,
  renderOrder: 5
},
{
  position: {
      x: 0,
      y: 0,
      z: -80
  },
  speed: 0.5,
  color: '#efad35',
  opacity: 0.6,
  radius: 10,
  height: 5,
  renderOrder: 5
}]

export const flyData = [{
  source: {
      x: 0,
      y: 0,
      z: 0
  },
  target: {
      x: 80,
      y: 0,
      z: 0
  },
  range: 120,
  height: 100,
  color: '#efad35',
  speed: 1,
  size: 3
}, {
  source: {
      x: 0,
      y: 0,
      z: 0
  },
  target: {
      x: -80,
      y: 0,
      z: 0
  },
  height: 50,
  range: 10,
  color: '#ff0000',
  speed: 1,
  size: 3
}]

export const boxData = [
  {
    x: 10,
    y: 10,
    z: 10,
    time: 2000,
    position: {
      x: 60,
      y: 5,
      z: 0,
    },
    cameraPos: {
      x: 110,
      y: 10,
      z: 0,
    },
    controlsPos: {
      x: 0,
      y: 10,
      z: 0,
    }
  },
  {
    x: 10,
    y: 10,
    z: 10,
    time: 2000,
    position: {
      x: -60,
      y: 5,
      z: 0,
    },
    cameraPos: {
      x: -110,
      y: 10,
      z: 0,
    },
    controlsPos: {
      x: 0,
      y: 10,
      z: 0,
    }
  }
]
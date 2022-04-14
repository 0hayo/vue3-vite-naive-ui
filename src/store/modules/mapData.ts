const state = {
  boxData: [
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
  ],
  wallData: [{
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
  }],
  radarData: [
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
}

const mutations = {
  ADD_BOX(state) {
    state.boxData.push(
      {
        x: 10,
        y: 10,
        z: 10,
        time: 2000,
        position: {
          x: 250,
          y: 5,
          z: -150,
        },
        cameraPos: {
          x: 200,
          y: 20,
          z: -150,
        },
        controlsPos: {
          x: 250,
          y: 5,
          z: -150,
        }
      })
  }
}

const actions = {
  addBox({ commit }) {
    commit('ADD_BOX')
  }
}

export default {
  state,
  mutations,
  actions
}
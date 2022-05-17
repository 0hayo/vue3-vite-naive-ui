const state = {
  boxData: [
    {
      x: 10,
      y: 10,
      z: 10,
      time: 2000,
      position: {
        x: 44.29709230712024,
        y: 22.611846938264932,
        z: 30.484609335996836,
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
        x: 135.66617689634185,
        y: 2.593796666649979,
        z: 123.14610178270468,
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
    },
    {
      x: 10,
      y: 10,
      z: 10,
      time: 2000,
      position: {
        x: 142.5798972217531,
        y: 5.20542723638367,
        z: 38.57121019115908
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
    },
    {
      x: 10,
      y: 10,
      z: 10,
      time: 2000,
      position: {
        x: 142.5798972217531,
        y: 5.20542723638367,
        z: -37.49778214014458
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
    },
    {
      x: 10,
      y: 10,
      z: 10,
      time: 2000,
      position: {
        x: 138.64858799422132,
        y: 3.3837727959555934,
        z: -117.14329368497434
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
    },
    {
      x: 10,
      y: 10,
      z: 10,
      time: 2000,
      position: {
        x: 283.4720993983466,
        y: 4.612917860017639,
        z: 123.93349199065659
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
    },
    {
      x: 10,
      y: 10,
      z: 10,
      time: 2000,
      position: {
        x: 283.4720993983466,
        y: 4.612917860017639,
        z: -120.0046747109846
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
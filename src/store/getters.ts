const getters = {
  boxData: state => state.mapData.boxData,
  wallData: state => state.mapData.wallData,
  radarData: state => state.mapData.radarData,
  token: state => state.user.token,
}

export default getters;
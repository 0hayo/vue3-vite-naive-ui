const getters = {
  boxData: state => state.mapData.boxData,
  wallData: state => state.mapData.wallData,
  radarData: state => state.mapData.radarData,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  radarList: state => state.equipment.radarList,
  sonarList: state => state.equipment.sonarList,
  dtList: state => state.equipment.dtList,
}

export default getters;
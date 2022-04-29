<template>
  <div class="video-box">
    <input type="button" class="btn top" value="👆" @mousedown="mouseDownPTZControl(1)" @mouseup="mouseUpPTZControl()" />
    <div class="lvr">
      <input type="button" class="btn" value="👈" @mousedown="mouseDownPTZControl(3)" @mouseup="mouseUpPTZControl()" />
      <div id="divPlugin" class="plugin"></div>
      <input type="button" class="btn" value="👉" @mousedown="mouseDownPTZControl(4)" @mouseup="mouseUpPTZControl()" />
    </div>
    <input type="button" class="btn bottom" value="👇" @mousedown="mouseDownPTZControl(2)" @mouseup="mouseUpPTZControl()" />
    <div class="tb">
      <input type="button" class="btn" value="+" @mousedown="mouseDownPTZControl(10)" @mouseup="mouseUpPTZControl()" />
      <input type="button" class="btn" value="-" @mousedown="mouseDownPTZControl(11)" @mouseup="mouseUpPTZControl()" />
    </div>
    <!-- <table cellpadding="0" cellspacing="3" border="0" class="control">
      <tr>
        <td>
          <input type="button" class="btn" value="左上" @mousedown="mouseDownPTZControl(5)"
            @mouseup="mouseUpPTZControl()" />
          <input type="button" class="btn" value="上" @mousedown="mouseDownPTZControl(1)"
            @mouseup="mouseUpPTZControl()" />
          <input type="button" class="btn" value="右上" @mousedown="mouseDownPTZControl(7)"
            @mouseup="mouseUpPTZControl()" />
        </td>
      </tr>
      <tr>
        <td>
          <input type="button" class="btn" value="左" @mousedown="mouseDownPTZControl(3)"
            @mouseup="mouseUpPTZControl()" />
          <input type="button" class="btn" value="+" @mousedown="mouseDownPTZControl(10)"
            @mouseup="mouseUpPTZControl()" />
          <input type="button" class="btn" value="-" @mousedown="mouseDownPTZControl(11)"
            @mouseup="mouseUpPTZControl()" />
          <input type="button" class="btn" value="右" @mousedown="mouseDownPTZControl(4)"
            @mouseup="mouseUpPTZControl()" />
        </td>
      </tr>
      <tr>
        <td>
          <input type="button" class="btn" value="左下" @mousedown="mouseDownPTZControl(6)"
            @mouseup="mouseUpPTZControl()" />
          <input type="button" class="btn" value="下" @mousedown="mouseDownPTZControl(2)"
            @mouseup="mouseUpPTZControl()" />
          <input type="button" class="btn" value="右下" @mousedown="mouseDownPTZControl(8)"
            @mouseup="mouseUpPTZControl()" />
        </td>
      </tr>
    </table> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const deviceListArray = [
  {
    szIP: '192.168.1.64',
    szPort: '80',
    szUsername: 'admin',
    szPassword: 'admin12345',
  },
];
var g_iWndIndex = 0; //don't have to set the variable; default to use the current selected window without transmiting value when the interface has window parameters
var iWndowType = 1; //设置4*4方格
var g_bPTZAuto = false;

onMounted(() => {
  initVideo();
});

const initVideo = () => {
  // check the installation status of plugin
  if (-1 == (window as any).WebVideoCtrl.I_CheckPluginInstall()) {
    alert(
      ' If the plugin is uninstalled, please install the WebComponents.exe!',
    );
    return;
  }

  // Init plugin parameters and insert the plugin
  (window as any).WebVideoCtrl.I_InitPlugin('100%', '100%', {
    iWndowType: iWndowType,
    cbSelWnd: function (xmlDoc: any) {
      g_iWndIndex = $(xmlDoc).find('SelectWnd').eq(0).text();
    },
  });

  (window as any).WebVideoCtrl.I_InsertOBJECTPlugin('divPlugin');

  // check plugin to see whether it is the latest
  if (-1 == (window as any).WebVideoCtrl.I_CheckPluginVersion()) {
    alert(
      'Detect the latest version, please double click WebComponents.exe to update！',
    );
    return;
  }

  // 将一维数组按区块个数分割成二维数组
  let deviceList = oneArrayToTwoArray(deviceListArray);
  let key = 0;
  // 自动登陆
  clickLogin(deviceListArray);
}

function oneArrayToTwoArray(deviceListArray: Array<any>) {
  let twoArray: Array<any> = [];
  let oneArray: Array<any> = [];
  let len = iWndowType * iWndowType;
  for (let b = 0; b < deviceListArray.length; b++) {
    if (b % len == 0) {
      oneArray = [];
    }
    oneArray.push(deviceListArray[b]);
    if (b % len == len - 1) {
      twoArray.push(oneArray);
    }
  }
  return twoArray;
}

// login
function clickLogin(deviceList: string | any[]) {
  for (let i = 0; i < deviceList.length; i++) {
    let index = deviceList[i];
    if ('' == index.szIP || '' == index.szPort) {
      continue;
    }

    var iRet = (window as any).WebVideoCtrl.I_Login(
      index.szIP,
      1,
      index.szPort,
      index.szUsername,
      index.szPassword,
      {
        success: function (xmlDoc: any) {
          console.log(index.szIP + ' login success！');
          setTimeout(function () {
            clickStartRealPlay(index.szIP, i);
          }, 100);
        },
        error: function () {
          console.log(index.szIP + ' login failed！');
        },
      },
    );

    if (-1 == iRet) {
      console.log(index.szIP + ' login already !');
      setTimeout(() => {
        clickStartRealPlay(index.szIP, i);
      }, 100);
    }
  }
}

// strat real play
function clickStartRealPlay(szIP: string, g_iWndIndex: number) {
  let oWndInfo = (window as any).WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

  if ('' == szIP) {
    return;
  }

  if (oWndInfo != null) {
    // stop first
    (window as any).WebVideoCtrl.I_Stop(g_iWndIndex);
  }

  let iRet = (window as any).WebVideoCtrl.I_StartRealPlay(szIP, {
    iWndIndex: g_iWndIndex,
  });

  if (0 == iRet) {
    console.log('start real play success！');
  } else {
    console.log('start real play failed！');
  }
}

function mouseDownPTZControl(iPTZIndex: number) {
  var oWndInfo = (window as any).WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
    iPTZSpeed = 5; //设置云台速度
  if (oWndInfo != null) {
    if (9 == iPTZIndex && g_bPTZAuto) {
      iPTZSpeed = 0; // 自动开启后，速度置为0可以关闭自动
    } else {
      g_bPTZAuto = false; // 点击其他方向，自动肯定会被关闭
    }

    (window as any).WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
      iPTZSpeed: iPTZSpeed,
      success: function (xmlDoc: any) {
        if (9 == iPTZIndex && g_bPTZAuto) {
          console.log('停止云台成功！');
        } else {
          console.log('开启云台成功！');
        }
        if (9 == iPTZIndex) {
          g_bPTZAuto = !g_bPTZAuto;
        }
      },
      error: function (status: any, xmlDoc: any) {
        console.log('开启云台失败！');
      },
    });
  }
}

// 方向PTZ停止
function mouseUpPTZControl() {
  var oWndInfo = (window as any).WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

  if (oWndInfo != null) {
    (window as any).WebVideoCtrl.I_PTZControl(1, true, {
      success: function (xmlDoc: any) {
        console.log('停止云台成功！');
      },
      error: function (status: any, xmlDoc: any) {
        console.log('停止云台失败！');
      },
    });
  }
}
</script>

<style scoped lang="scss">
.video-box {
  width: 100%;
  height: 100%;
  // position: relative;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .plugin {
    width: 100%;
    flex: 1;
    height: 196.6px;
  }

  .lvr {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .tb {
    position: absolute;
    top: 0;
    right: 0;
  }

  .btn {
    outline: none;
    background: rgba(0,0,0,0.2);
    color: aliceblue;
    width: 30px;
    padding: 0;
    border: 0;
    &:active {
      box-shadow: 0 0 5px rgba(0,0,0,0.5) ;
    }
  }
  .bottom, .top {
    width: calc(100% - 60px);
    height: 30px;
  }
}
</style>

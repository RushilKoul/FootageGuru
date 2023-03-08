<template>
  <in-progress id="inP" style="display: none"></in-progress>
  <splash-screen style="display: none" class="fade-out"></splash-screen>
  <div class="app_container">
    <div class="sidebar">
      <span class="header">FootageGuru</span>
      <hr width="170px" />
      <button class="feature_select" @click="$event => index = 0">Silence Remover</button>
      <button class="feature_select" @click="$event => index = 1">Motionless Remover</button>

    </div>
    <div class="app_main">
      <vid-preview></vid-preview>
      <div class="feature_set_container" v-show="index == 0">
        <div>
          <span class="feature_set_header">Settings</span>
        </div>
        <hr />
        <br>
        <div class="options">
          <div class="option">
            <span>Silence Margin (seconds)</span>
            <input class="text_input" type="number" id="margin" value="0.2" step="any" />
          </div>
        </div>
      </div>
      <div class="feature_set_container long" v-show="index == 0">
        <div>
          <span class="feature_set_header">Footage Details</span>
        </div>
        <hr />
        <table>
          <thead>
            <tr>
              <th colspan="2">Original</th>
              <th colspan="2">Processed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>File Name</td>
              <td class="vid_title"></td>
              <td>File Name</td>
              <td class="fg_vid_title"></td>
            </tr>
            <tr>
              <td>File Type</td>
              <td class="vid_type"></td>
              <td>File Type</td>
              <td class="fg_vid_type"></td>
            </tr>
            <tr>
              <td>File Size</td>
              <td class="vid_size"></td>
              <td>File Size</td>
              <td></td>
            </tr>
            <tr>
              <td>File Duration</td>
              <td class="vid_duration"></td>
              <td>File Duration</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="feature_set_container" v-show="index == 0">
        <div>
          <span class="feature_set_header">Export</span>
        </div>
        <hr />
        <br>
        <div class="options">
          <div class="option">
            <span>Render Video To Disk</span>
            <input type="checkbox" id="rendervid" checked v-model="render" />
            <label for="rendervid">Toggle</label>
          </div>
          <div class="option" v-show="!render">
            <span>Export To Editing Software </span>
            
            <div class="dropdown">
              <button class="dropbtn">{{ software }}</button>
              <div class="dropdown-content">
                <a href="#" class="dropdown-item"> <img src="./assets/Premiere.png">Adobe Premiere Pro</a>
                <a href="#" class="dropdown-item"> <img src="./assets/FinalCut.png">Final Cut Pro</a>
              </div>
            </div>
          </div>
          <button style="float:right" id="export_silence">Export Video</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SplashScreen from '@/components/SplashScreen.vue'
import VidPreview from '@/components/VidPreview.vue'
import InProgress from '@/components/IP.vue'
export default {
  name: 'App',
  components: {
    SplashScreen,
    VidPreview,
    InProgress,
  },
  data() {
    return {
      index: 0,
      render: true,
      software: 'Premiere'
    }
  }
}
</script>

<style>
@import url('./style.css');
</style>

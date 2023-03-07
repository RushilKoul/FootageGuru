<template>
  <in-progress id="inP" style="display: none"></in-progress>
  <drag-n-drop></drag-n-drop>
  <splash-screen class="fade-out"></splash-screen>
  <div class="app_container">
    <div class="sidebar">
      <span class="header">FootageGuru</span>
      <hr width="170px" />
      <button id="selectVid">Select Video</button>
      <!-- <hr width="170px" /> -->
      Features
      <hr width="170px" />
      <button class="feature_select" @click="$event=> index=0">Silence Remover</button>
      <button class="feature_select" @click="$event=> index=1">Motionless Remover</button>

    </div>
    <div style="display: flex; flex-direction: column; width: 100vw">
      <vid-preview></vid-preview>
      <div class="feature_set_container" v-show="index==0">
        <div>
          <span style="font-size: 20px; font-weight: 600">Silence Region Remover</span>
          <button style="float:right" id="export_silence">Export Video</button>
        </div>
        <br>
        <hr />
        <br>
        <div class="options">
          <div class="option">
            <span>Render Video To Disk</span>
            <input type="checkbox" id="rendervid" checked v-model="render" />
            <label for="rendervid">Toggle</label>
          </div>
          <div class="option">
            <span>Silence Margin (seconds)</span>
            <input class="text_input" type="number" id="margin" value="0.2" step="any" />
          </div>
          <div class="option" v-show="!render">
            <span>Export To Editing Software  </span>
           
            <div class="dropdown">
              <button class="dropbtn">{{software}}</button>
              <div class="dropdown-content">
              <a href="#" class="dropdown-item"> <img src="./assets/Premiere.png">Adobe Premiere Pro</a>
              <a href="#" class="dropdown-item"> <img src="./assets/FinalCut.png">Final Cut Pro</a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="feature_set_container" v-show="index==1">
        <div>
          <span style="font-size: 20px; font-weight: 600">Motionless Region Remover</span>
          <button style="float:right">Export Video</button>
        </div>
        <br>
        <hr />
        <br>
        <div class="options">
          <div class="option">
            <span>Render Video To Disk</span>
            <input type="checkbox" id="rendervid" checked />
            <label for="rendervid">Toggle</label>
          </div>
          <div class="option">
            <span>Motion Margin (seconds)</span>
            <input class="text_input" type="number" id="margin" value="0.2" step="any" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SplashScreen from '@/components/SplashScreen.vue'
import VidPreview from '@/components/VidPreview.vue'
import InProgress from '@/components/IP.vue'
import DragNDrop from '@/components/DragNDrop.vue'
export default {
  name: 'App',
  components: {
    SplashScreen,
    VidPreview,
    InProgress,
    DragNDrop
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

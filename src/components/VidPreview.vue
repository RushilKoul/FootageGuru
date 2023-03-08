<!-- <template>
  <div class="vid_container">
      <div class="vid_select">
        <span>Select Footage</span>
        <hr />
        <button ">Browse</button>
        <span>OR</span>
        
      </div>

    <video class="vid_preview" controls>
      <source type="video/mp4">
    </video>

  </div>
</template>



.vid_title {
    font-size: 30px;
    font-weight: 900;
}

.vid_length {
    font-size: 20px;
    font-weight: 600;
}

.vid_metadata {
    display: flex;
    flex-direction: column;
    gap: 10px;
}


.vid_container {
    width: 426px;
    height: 240px;
    background-color: #181818;
    box-shadow: #12082c 0px 10px 20px;
    display: grid;
}

.vid_preview {
    width: 100%;
    height: 100%;
}
.vid_select {
    grid-area: 1 / 1;

    background-color: cyan;
    display: flex;
    flex-direction: column;
    padding: 10px;
    
    align-items: center;
    gap: 2px;
    justify-content: center;
    
    position: relative;
}



 -->


<template>
  <div class="vid_container">
    <div class="vid_preview">
      <video controls> <source type="video/mp4"> </video>
    </div>

    <div class="vid_preview vid_overlay">
      <div class="vid_selector">
        <span>Select Media</span>
        <hr width="80%"/>
        <button id="selectVid">Browse</button>
        <span>OR</span>
        <div class="drag_region">
          Drag and Drop Files
        </div>
      </div>
    </div>

    <div class="vid_preview vid_overlay vid_processing_overlay">
      <div>
        <span>Processing...</span>
      </div>
    </div>
  </div>
</template>
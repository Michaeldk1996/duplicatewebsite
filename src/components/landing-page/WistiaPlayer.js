import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function WistiaPlayer({ videoId, wrapper }) {
  useEffect(() => {
    // Inject styles once
    const style = document.createElement('style');
    style.innerHTML = `
      .wistia_embed,
      .wistia_responsive_wrapper {
        width: 100%;
        height: 100%;
      }

      /* VIDEO keeps original ratio */
      .wistia_embed video {
        object-fit: contain !important;
        width: 100% !important;
        height: 100% !important;
      }

      /* POSTER / THUMBNAIL */
      .wistia_embed img,
      .wistia_embed .wistia_poster,
      .wistia_embed .wistia_placeholder {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        background-color: #030511 !important;
      }
        .wistia_embed .w-big-play-button {
  display: none !important;
}
    `;
    document.head.appendChild(style);

    // Wistia scripts
    const script1 = document.createElement('script');
    script1.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    script2.async = true;

    // Wistia embed
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
        <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
          <div
            class="wistia_embed wistia_async_${videoId}
              seo=false
              videoFoam=true
              autoPlay=true
              playButton=true
              controlsVisibleOnLoad=true
              endVideoBehavior=reset"
            style="height:100%;width:100%;">
          </div>
        </div>
      </div>
    `;

    const container = document.getElementById(wrapper);
    container.appendChild(script1);
    container.appendChild(script2);
    container.appendChild(div);

    return () => {
      container.innerHTML = '';
    };
  }, [videoId, wrapper]);

  return <div id={wrapper} />;
}

WistiaPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  wrapper: PropTypes.string.isRequired,
};

export default WistiaPlayer;

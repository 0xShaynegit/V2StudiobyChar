/**
 * Static Chaty Widget
 * Floating social contact buttons
 */
(function () {
  "use strict";

  // =====================================================
  // CONFIGURE YOUR CHANNELS HERE
  // =====================================================
  var channels = [
    {
      name: "Instagram",
      label: "Instagram",
      url: "https://www.instagram.com/studioby.char/",
      color: "#E4405F",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#E4405F"/><rect x="11" y="11" width="17" height="17" rx="5" stroke="white" stroke-width="1.8" fill="none"/><circle cx="19.5" cy="19.5" r="4" stroke="white" stroke-width="1.8" fill="none"/><circle cx="25" cy="14" r="1.2" fill="white"/></svg>'
    },
    {
      name: "Facebook_Messenger",
      label: "Facebook Messenger",
      url: "https://m.me/1BsJcmAYLn",
      color: "#0084FF",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#0084FF"/><path d="M19.5 9.5C13.701 9.5 9 13.748 9 19.074c0 3.014 1.474 5.702 3.778 7.456V30l3.294-1.81c.878.244 1.81.376 2.778.376 5.799 0 10.5-4.248 10.5-9.574S25.299 9.5 19.5 9.5zm1.04 12.878l-2.674-2.852-5.22 2.852 5.74-6.096 2.74 2.852 5.154-2.852-5.74 6.096z" fill="white"/></svg>'
    },
    {
      name: "LinkedIn",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/shot-by-char/",
      color: "#0077B5",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#0077B5"/><path d="M15.186 14.359a1.583 1.583 0 11-3.167 0 1.583 1.583 0 013.167 0zM15.25 16.75h-3.042v9.75h3.042v-9.75zm4.846 0h-3.014v9.75h3.014v-5.12c0-2.848 3.694-3.081 3.694 0v5.12h3.032v-6.175c0-4.806-5.467-4.631-6.726-2.264V16.75z" fill="white"/></svg>'
    }
  ];

  // =====================================================
  // TRIGGER BUTTON COLOUR  (light brown accent)
  // =====================================================
  var TRIGGER_COLOR = "#C08A74";

  var triggerSvg =
    '<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="19.5" cy="19.5" r="19.5" fill="' + TRIGGER_COLOR + '"/>' +
    '<path d="M26.4 13H13.6C12.72 13 12 13.72 12 14.6V23.4C12 24.28 12.72 25 13.6 25H16L19.5 28L23 25H26.4C27.28 25 28 24.28 28 23.4V14.6C28 13.72 27.28 13 26.4 13Z" fill="white"/>' +
    '<circle cx="15.5" cy="19" r="1.25" fill="' + TRIGGER_COLOR + '"/>' +
    '<circle cx="19.5" cy="19" r="1.25" fill="' + TRIGGER_COLOR + '"/>' +
    '<circle cx="23.5" cy="19" r="1.25" fill="' + TRIGGER_COLOR + '"/>' +
    '</svg>';

  var closeSvg =
    '<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="19.5" cy="19.5" r="19.5" fill="' + TRIGGER_COLOR + '"/>' +
    '<path d="M25 14L14 25M14 14L25 25" stroke="white" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';

  // =====================================================
  // POSITION: "left-position" = bottom-left, "" = bottom-right
  // =====================================================
  var POSITION_CLASS = "left-position";

  // =====================================================
  // ANIMATION: see table in guide for options
  // =====================================================
  var ANIMATION_CLASS = "chaty-animation-pulse";

  // =====================================================
  // TOOLTIP TEXT
  // =====================================================
  var TRIGGER_TOOLTIP = "Get in touch";

  // =====================================================
  // NO CHANGES NEEDED BELOW THIS LINE
  // =====================================================

  function createWidget() {
    var chaty = document.createElement("div");
    chaty.className = "chaty active";
    chaty.id = "chaty-widget";

    var widget = document.createElement("div");
    widget.className = "chaty-widget " + POSITION_CLASS;

    var channelList = document.createElement("div");
    channelList.className = "chaty-channel-list";

    channels.forEach(function (ch) {
      var channel = document.createElement("div");
      channel.className =
        "chaty-channel " + ch.name + "-channel chaty-tooltip pos-" +
        (POSITION_CLASS === "left-position" ? "right" : "left");
      channel.setAttribute("data-hover", ch.label);

      var link = document.createElement("a");
      link.href = ch.url;
      link.target = ch.name === "Phone" || ch.name === "SMS" ? "_self" : "_blank";
      link.rel = "noopener noreferrer";
      link.className = "chaty-svg";
      link.setAttribute("aria-label", ch.label);

      var iconWrap = document.createElement("span");
      iconWrap.className = "chaty-icon";
      iconWrap.style.background = ch.color;
      iconWrap.style.borderRadius = "50%";
      iconWrap.style.display = "block";
      iconWrap.style.width = "54px";
      iconWrap.style.height = "54px";
      iconWrap.innerHTML = ch.svg;

      link.appendChild(iconWrap);
      channel.appendChild(link);
      channelList.appendChild(channel);
    });

    widget.appendChild(channelList);

    var trigger = document.createElement("div");
    trigger.className = "chaty-i-trigger";

    var ctaMain = document.createElement("div");
    ctaMain.className = "chaty-cta-main chaty-tooltip pos-" +
      (POSITION_CLASS === "left-position" ? "right" : "left") +
      " " + ANIMATION_CLASS;
    ctaMain.setAttribute("data-hover", TRIGGER_TOOLTIP);
    var ctaMainBtn = document.createElement("div");
    ctaMainBtn.className = "chaty-cta-button";
    ctaMainBtn.innerHTML = triggerSvg;
    ctaMain.appendChild(ctaMainBtn);

    var ctaClose = document.createElement("div");
    ctaClose.className = "chaty-cta-close chaty-tooltip pos-" +
      (POSITION_CLASS === "left-position" ? "right" : "left");
    ctaClose.setAttribute("data-hover", "Hide");
    var ctaCloseBtn = document.createElement("div");
    ctaCloseBtn.className = "chaty-cta-button";
    ctaCloseBtn.innerHTML = closeSvg;
    ctaClose.appendChild(ctaCloseBtn);

    trigger.appendChild(ctaMain);
    trigger.appendChild(ctaClose);
    widget.appendChild(trigger);
    chaty.appendChild(widget);
    document.body.appendChild(chaty);

    function toggle() {
      widget.classList.toggle("chaty-open");
      var items = channelList.querySelectorAll(".chaty-channel");
      if (widget.classList.contains("chaty-open")) {
        items.forEach(function (item, idx) {
          item.style.transition = "0.3s ease " + idx * 0.06 + "s";
          item.style.bottom = (items.length - idx) * 62 + "px";
          item.style.opacity = "1";
        });
      } else {
        items.forEach(function (item) {
          item.style.transition = "0.25s ease";
          item.style.bottom = "0px";
          item.style.opacity = "0";
        });
      }
    }

    ctaMainBtn.addEventListener("click", toggle);
    ctaCloseBtn.addEventListener("click", toggle);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();

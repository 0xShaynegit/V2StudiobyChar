/**
 * Static Chaty Widget – Studio by Char
 * Floating social contact buttons (bottom-left)
 * All elements use position:fixed so trigger button NEVER moves
 */
(function () {
  "use strict";

  var channels = [
    {
      name: "Facebook_Messenger",
      label: "Facebook Messenger",
      url: "https://m.me/1BsJcmAYLn",
      color: "#0084FF",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#0084FF"/><path d="M19.5 9.5C13.701 9.5 9 13.748 9 19.074c0 3.014 1.474 5.702 3.778 7.456V30l3.294-1.81c.878.244 1.81.376 2.778.376 5.799 0 10.5-4.248 10.5-9.574S25.299 9.5 19.5 9.5zm1.04 12.878l-2.674-2.852-5.22 2.852 5.74-6.096 2.74 2.852 5.154-2.852-5.74 6.096z" fill="white"/></svg>'
    },
    {
      name: "Instagram",
      label: "Instagram",
      url: "https://www.instagram.com/studioby.char/",
      color: "#E4405F",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#E4405F"/><rect x="11" y="11" width="17" height="17" rx="5" stroke="white" stroke-width="1.8" fill="none"/><circle cx="19.5" cy="19.5" r="4" stroke="white" stroke-width="1.8" fill="none"/><circle cx="25" cy="14" r="1.2" fill="white"/></svg>'
    },
    {
      name: "LinkedIn",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/shot-by-char/",
      color: "#0077B5",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#0077B5"/><path d="M15.186 14.359a1.583 1.583 0 11-3.167 0 1.583 1.583 0 013.167 0zM15.25 16.75h-3.042v9.75h3.042v-9.75zm4.846 0h-3.014v9.75h3.014v-5.12c0-2.848 3.694-3.081 3.694 0v5.12h3.032v-6.175c0-4.806-5.467-4.631-6.726-2.264V16.75z" fill="white"/></svg>'
    }
  ];

  var isMobile = window.innerWidth <= 480;
  var iconSize = isMobile ? 40 : 54;
  var itemGap = isMobile ? 10 : 12;  // gap between icons
  var bottomOffset = 20;             // distance from bottom of viewport
  var leftOffset = 20;               // distance from left of viewport

  // Main trigger icon – light brown circle, white chat bubble
  var triggerSvg =
    '<svg width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="19.5" cy="19.5" r="19.5" fill="#C08A74"/>' +
    '<path d="M26.4 13H13.6C12.72 13 12 13.72 12 14.6V23.4C12 24.28 12.72 25 13.6 25H16L19.5 28L23 25H26.4C27.28 25 28 24.28 28 23.4V14.6C28 13.72 27.28 13 26.4 13Z" fill="white"/>' +
    '<circle cx="15.5" cy="19" r="1.25" fill="#C08A74"/>' +
    '<circle cx="19.5" cy="19" r="1.25" fill="#C08A74"/>' +
    '<circle cx="23.5" cy="19" r="1.25" fill="#C08A74"/>' +
    '</svg>';

  // Close icon – light brown circle, white X
  var closeSvg =
    '<svg width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="19.5" cy="19.5" r="19.5" fill="#C08A74"/>' +
    '<path d="M25 14L14 25M14 14L25 25" stroke="white" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';

  function createWidget() {
    var isOpen = false;
    var autoCloseTimer = null;
    var channelEls = [];
    var triggerTooltipVisible = false;

    // --- Trigger button (FIXED, never moves) ---
    var triggerEl = document.createElement("div");
    triggerEl.id = "chaty-trigger";
    triggerEl.style.cssText = [
      "position:fixed",
      "bottom:" + bottomOffset + "px",
      "left:" + leftOffset + "px",
      "width:" + iconSize + "px",
      "height:" + iconSize + "px",
      "border-radius:50%",
      "cursor:pointer",
      "z-index:10010",
      "line-height:0",
      "transition:transform 0.2s ease"
    ].join(";");
    triggerEl.innerHTML = triggerSvg;

    // Hover scale, expand, and open widget (trigger button stays brown, no grayscale)
    triggerEl.onmouseenter = function() {
      triggerEl.style.transform = "scale(1.15)";
      if (!isOpen) openWidget();
    };
    triggerEl.onmouseleave = function() { triggerEl.style.transform = "scale(1)"; };

    // Create trigger tooltip positioned 30px from edge of trigger, tooltip top at icon middle
    var triggerTooltip = document.createElement("div");
    triggerTooltip.style.cssText = [
      "position:fixed",
      "bottom:" + (bottomOffset + iconSize / 2) + "px",
      "left:" + (leftOffset + iconSize + 30) + "px",
      "text-align:center",
      "background:#C08A74",
      "color:#fff",
      "padding:8px 12px",
      "border-radius:4px",
      "font-size:14px",
      "font-weight:300",
      "z-index:10009",
      "opacity:0",
      "pointer-events:none",
      "transition:opacity 0.3s ease, transform 0.2s ease",
      "white-space:nowrap",
      "font-family:Inter,sans-serif",
      "letter-spacing:0.3px",
      "transform:scale(0.9)",
      "transform-origin:left top"
    ].join(";");
    triggerTooltip.textContent = "Contact us";
    document.body.appendChild(triggerTooltip);

    document.body.appendChild(triggerEl);

    // --- Channel icons (FIXED, stacked above trigger) ---
    channels.forEach(function(ch, idx) {
      var itemEl = document.createElement("div");

      // Calculate each icon's resting bottom position (above trigger)
      var stackBottom = bottomOffset + iconSize + itemGap + idx * (iconSize + itemGap);

      itemEl.style.cssText = [
        "position:fixed",
        "bottom:" + bottomOffset + "px",   // start at trigger position (hidden)
        "left:" + leftOffset + "px",
        "width:" + iconSize + "px",
        "height:" + iconSize + "px",
        "border-radius:50%",
        "z-index:10009",
        "opacity:0",
        "pointer-events:none",
        "line-height:0",
        "transition:bottom 0.3s ease, opacity 0.3s ease, transform 0.2s ease"
      ].join(";");

      var link = document.createElement("a");
      link.href = ch.url;
      link.target = ch.name === "Phone" ? "_self" : "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", ch.label);
      link.style.display = "block";
      link.style.width = iconSize + "px";
      link.style.height = iconSize + "px";
      link.style.borderRadius = "50%";
      link.style.lineHeight = "0";
      link.style.position = "relative";
      link.innerHTML = ch.svg;

      // Make SVG fill the link with grayscale by default
      var svgEl = link.querySelector("svg");
      if (svgEl) {
        svgEl.setAttribute("width", iconSize);
        svgEl.setAttribute("height", iconSize);
        svgEl.style.filter = "grayscale(100%)";
        svgEl.style.transition = "filter 0.2s ease";
      }

      // Create tooltip positioned absolutely 30px from edge of icon, tooltip top at icon middle
      var channelTooltip = document.createElement("div");
      channelTooltip.style.cssText = [
        "position:absolute",
        "top:50%",
        "left:" + (iconSize + 30) + "px",
        "background:#C08A74",
        "color:#fff",
        "padding:8px 12px",
        "border-radius:4px",
        "font-size:14px",
        "font-weight:300",
        "z-index:10008",
        "opacity:0",
        "pointer-events:none",
        "transition:opacity 0.2s ease, transform 0.2s ease",
        "white-space:nowrap",
        "font-family:Inter,sans-serif",
        "letter-spacing:0.3px",
        "transform:scale(0.9)",
        "transform-origin:left top"
      ].join(";");
      channelTooltip.textContent = ch.label;
      link.appendChild(channelTooltip);

      // Show/hide tooltip and color on hover, expand icon
      link.addEventListener("mouseenter", function() {
        channelTooltip.style.opacity = "1";
        channelTooltip.style.transform = "scale(1.1)";
        itemEl.style.transform = "scale(1.15)";
        if (svgEl) svgEl.style.filter = "grayscale(0%)";
      });
      link.addEventListener("mouseleave", function() {
        channelTooltip.style.opacity = "0";
        channelTooltip.style.transform = "scale(0.9)";
        itemEl.style.transform = "scale(1)";
        if (svgEl) svgEl.style.filter = "grayscale(100%)";
      });

      link.appendChild(channelTooltip);
      itemEl.appendChild(link);
      document.body.appendChild(itemEl);

      channelEls.push({ el: itemEl, bottom: stackBottom });
    });

    // --- Toggle function ---
    function openWidget() {
      isOpen = true;
      triggerEl.innerHTML = closeSvg;

      channelEls.forEach(function(item, idx) {
        item.el.style.transitionDelay = (idx * 0.06) + "s";
        item.el.style.bottom = item.bottom + "px";
        item.el.style.opacity = "1";
        item.el.style.pointerEvents = "auto";
      });

      // Auto-close after 30 seconds
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
      autoCloseTimer = setTimeout(function() {
        if (isOpen) closeWidget();
      }, 30000);
    }

    function closeWidget() {
      isOpen = false;
      triggerEl.innerHTML = triggerSvg;

      channelEls.forEach(function(item) {
        item.el.style.transitionDelay = "0s";
        // Slide off screen downward, not onto trigger button
        item.el.style.bottom = "-" + (iconSize + 10) + "px";
        item.el.style.opacity = "0";
        item.el.style.pointerEvents = "none";
      });

      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
    }

    triggerEl.onclick = function(e) {
      e.stopPropagation();
      if (isOpen) {
        closeWidget();
      } else {
        openWidget();
      }
    };

    // Show tooltip when mouse enters bottom 40% and left 40% corner
    // Close widget when leaving the zone
    document.addEventListener("mousemove", function(e) {
      var viewportHeight = window.innerHeight;
      var viewportWidth = window.innerWidth;
      var bottomThreshold = viewportHeight * 0.4; // bottom 40%
      var leftThreshold = viewportWidth * 0.4;    // left 40%

      var isInBottomArea = e.clientY > (viewportHeight - bottomThreshold);
      var isInLeftSide = e.clientX < leftThreshold;
      var isInZone = isInBottomArea && isInLeftSide;

      if (isInZone && !isOpen) {
        if (!triggerTooltipVisible) {
          triggerTooltip.style.opacity = "1";
          triggerTooltip.style.transform = "scale(1.1)";
          triggerTooltipVisible = true;
        }
      } else if (!isInZone && isOpen) {
        // Close widget when moving away from zone
        closeWidget();
      } else if (!isInZone) {
        if (triggerTooltipVisible) {
          triggerTooltip.style.opacity = "0";
          triggerTooltip.style.transform = "scale(0.9)";
          triggerTooltipVisible = false;
        }
      }
    });

    // Close when clicking elsewhere on the page
    document.addEventListener("click", function(e) {
      if (isOpen && !triggerEl.contains(e.target)) {
        // Check if click was on a channel icon
        var onChannel = channelEls.some(function(item) {
          return item.el.contains(e.target);
        });
        if (!onChannel) {
          closeWidget();
        }
      }
    });
  }

  // Initialize when DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();

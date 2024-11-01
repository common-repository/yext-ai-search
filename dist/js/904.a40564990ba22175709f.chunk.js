/*! For license information please see 904.a40564990ba22175709f.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkyext_ai_search_for_wordpress=self.webpackChunkyext_ai_search_for_wordpress||[]).push([[904],{9904:function(t,s,e){function i(){return i=Object.assign?Object.assign.bind():function(t){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)}e.r(s);var n=function(){function t(t,s){var e=this,i="undefined"!==typeof s?s:{};this.version="3.7.11",this.userAgent=window.navigator.userAgent||"no `userAgent` provided by the browser",this.props={customStickyChangeNumber:i.customStickyChangeNumber||null,noStyles:i.noStyles||!1,stickyBitStickyOffset:i.stickyBitStickyOffset||0,parentClass:i.parentClass||"js-stickybit-parent",scrollEl:"string"===typeof i.scrollEl?document.querySelector(i.scrollEl):i.scrollEl||window,stickyClass:i.stickyClass||"js-is-sticky",stuckClass:i.stuckClass||"js-is-stuck",stickyChangeClass:i.stickyChangeClass||"js-is-sticky--change",useStickyClasses:i.useStickyClasses||!1,useFixed:i.useFixed||!1,useGetBoundingClientRect:i.useGetBoundingClientRect||!1,verticalPosition:i.verticalPosition||"top",applyStyle:i.applyStyle||function(t,s){return e.applyStyle(t,s)}},this.props.positionVal=this.definePosition()||"fixed",this.instances=[];var n=this.props,o=n.positionVal,a=n.verticalPosition,l=n.noStyles,r=n.stickyBitStickyOffset,c="top"!==a||l?"":r+"px",p="fixed"!==o?o:"";this.els="string"===typeof t?document.querySelectorAll(t):t,"length"in this.els||(this.els=[this.els]);for(var f=0;f<this.els.length;f++){var u,h=this.els[f],y=this.addInstance(h,this.props);this.props.applyStyle({styles:(u={},u[a]=c,u.position=p,u),classes:{}},y),this.manageState(y),this.instances.push(y)}}var s=t.prototype;return s.definePosition=function(){var t;if(this.props.useFixed)t="fixed";else{for(var s=["","-o-","-webkit-","-moz-","-ms-"],e=document.head.style,i=0;i<s.length;i+=1)e.position=s[i]+"sticky";t=e.position?e.position:"fixed",e.position=""}return t},s.addInstance=function(t,s){var e=this,i={el:t,parent:t.parentNode,props:s};if("fixed"===s.positionVal||s.useStickyClasses){this.isWin=this.props.scrollEl===window;var n=this.isWin?window:this.getClosestParent(i.el,i.props.scrollEl);this.computeScrollOffsets(i),this.toggleClasses(i.parent,"",s.parentClass),i.state="default",i.stateChange="default",i.stateContainer=function(){return e.manageState(i)},n.addEventListener("scroll",i.stateContainer)}return i},s.getClosestParent=function(t,s){var e=s,i=t;if(i.parentElement===e)return e;for(;i.parentElement!==e;)i=i.parentElement;return e},s.getTopPosition=function(t){if(this.props.useGetBoundingClientRect)return t.getBoundingClientRect().top+(this.props.scrollEl.pageYOffset||document.documentElement.scrollTop);var s=0;do{s=t.offsetTop+s}while(t=t.offsetParent);return s},s.computeScrollOffsets=function(t){var s=t,e=s.props,i=s.el,n=s.parent,o=!this.isWin&&"fixed"===e.positionVal,a="bottom"!==e.verticalPosition,l=o?this.getTopPosition(e.scrollEl):0,r=o?this.getTopPosition(n)-l:this.getTopPosition(n),c=null!==e.customStickyChangeNumber?e.customStickyChangeNumber:i.offsetHeight,p=r+n.offsetHeight;s.offset=o?0:l+e.stickyBitStickyOffset,s.stickyStart=a?r-s.offset:0,s.stickyChange=s.stickyStart+c,s.stickyStop=a?p-(i.offsetHeight+s.offset):p-window.innerHeight},s.toggleClasses=function(t,s,e){var i=t,n=i.className.split(" ");e&&-1===n.indexOf(e)&&n.push(e);var o=n.indexOf(s);-1!==o&&n.splice(o,1),i.className=n.join(" ")},s.manageState=function(t){var s=this,e=t,n=e.props,o=e.state,a=e.stateChange,l=e.stickyStart,r=e.stickyChange,c=e.stickyStop,p=n.positionVal,f=n.scrollEl,u=n.stickyClass,h=n.stickyChangeClass,y=n.stuckClass,d=n.verticalPosition,g="bottom"!==d,k=n.applyStyle,m=n.noStyles,C=function(t){t()},v=this.isWin&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame)||C,S=this.isWin?window.scrollY||window.pageYOffset:f.scrollTop,w=g&&S<=l&&("sticky"===o||"stuck"===o),b=S>=c&&"sticky"===o;S>l&&S<c&&("default"===o||"stuck"===o)?e.state="sticky":w?e.state="default":b&&(e.state="stuck");var x=S>=r&&S<=c;S<r/2||S>c?e.stateChange="default":x&&(e.stateChange="sticky"),o===e.state&&a===e.stateChange||v((function(){var o,a,l,r,c,f,g={sticky:{styles:(o={position:p,top:"",bottom:""},o[d]=n.stickyBitStickyOffset+"px",o),classes:(a={},a[u]=!0,a)},default:{styles:(l={},l[d]="",l),classes:{}},stuck:{styles:i((r={},r[d]="",r),"fixed"===p&&!m||!s.isWin?{position:"absolute",top:"",bottom:"0"}:{}),classes:(c={},c[y]=!0,c)}};"fixed"===p&&(g.default.styles.position="");var C=g[e.state];C.classes=((f={})[y]=!!C.classes[y],f[u]=!!C.classes[u],f[h]=x,f),k(C,t)}))},s.applyStyle=function(t,s){var e=t.styles,i=t.classes,n=s,o=n.el,a=n.props,l=o.style,r=a.noStyles,c=o.className.split(" ");for(var p in i){if(i[p])-1===c.indexOf(p)&&c.push(p);else{var f=c.indexOf(p);-1!==f&&c.splice(f,1)}}if(o.className=c.join(" "),e.position&&(l.position=e.position),!r)for(var u in e)l[u]=e[u]},s.update=function(t){var s=this;return void 0===t&&(t=null),this.instances.forEach((function(e){if(s.computeScrollOffsets(e),t)for(var i in t)e.props[i]=t[i]})),this},s.removeInstance=function(t){var s,e,i=t.el,n=t.props;this.applyStyle({styles:(s={position:""},s[n.verticalPosition]="",s),classes:(e={},e[n.stickyClass]="",e[n.stuckClass]="",e)},t),this.toggleClasses(i.parentNode,n.parentClass)},s.cleanup=function(){for(var t=0;t<this.instances.length;t+=1){var s=this.instances[t];s.stateContainer&&s.props.scrollEl.removeEventListener("scroll",s.stateContainer),this.removeInstance(s)}this.manageState=!1,this.instances=[]},t}();s.default=function(t,s){return new n(t,s)}}}]);
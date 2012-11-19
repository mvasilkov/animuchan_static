/**
 * almond 0.2.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(){var e,t,n;(function(r){function p(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)==="."&&t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function d(e,t){return function(){return s.apply(r,h.call(arguments,0).concat([e,t]))}}function v(e){return function(t){return p(t,e)}}function m(e){return function(t){a[e]=t}}function g(e){if(f.hasOwnProperty(e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!a.hasOwnProperty(e)&&!c.hasOwnProperty(e))throw new Error("No "+e);return a[e]}function y(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function b(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=[].slice;o=function(e,t){var n,r=y(e),i=r[0];return e=r[1],i&&(i=p(i,t),n=g(i)),i?n&&n.normalize?e=n.normalize(e,v(t)):e=p(e,t):(e=p(e,t),r=y(e),i=r[0],e=r[1],i&&(n=g(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return d(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:b(e)}}},i=function(e,t,n,i){var s,l,h,p,v,y=[],b;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")y[v]=u.require(e);else if(l==="exports")y[v]=u.exports(e),b=!0;else if(l==="module")s=y[v]=u.module(e);else if(a.hasOwnProperty(l)||f.hasOwnProperty(l)||c.hasOwnProperty(l))y[v]=g(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,d(i,!0),m(l),{}),y[v]=a[l]}}h=n.apply(a[e],y);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!b)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):g(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},15),s)},s.config=function(e){return l=e,s},n=function(e,t,n){t.splice||(n=t,t=[]),f[e]=[e,t,n]},n.amd={jQuery:!0}})(),n("almond",function(){}),n("conf",{ALLOW_KEYBOARD_INPUT:1,BACKSPACE:8,RETURN:13,GAME_SCALE:20,PRINTABLE:"abcdefghijklmnopqrstuvwxyz0123456789 ",BUFFER_SIZE:40,SCORE_SIZE:9,TODO_SIZE:9,COMMANDS:["add","bisect","branch","checkout","clone","commit","diff","fetch","grep","init","log","merge","mv","pull","push","rebase","reset","rm","show","status","tag"]}),n("fullscreen",["conf"],function(e){function n(){if(!document.webkitFullscreenEnabled)return;t.show().click(function(){return document.webkitFullscreenElement?document.webkitExitFullscreen():document.documentElement.webkitRequestFullscreen(e.ALLOW_KEYBOARD_INPUT),!1})}var t=$("#fullscreen");return{init:n}}),typeof requestAnimationFrame=="undefined"&&(["moz","webkit","ms"].some(function(e){var t=this[e+"RequestAnimationFrame"];if(typeof t=="function")return requestAnimationFrame=t})||(requestAnimationFrame=function(e){return setTimeout(e,0)})),n("requestAnimationFrame",[],function(){return requestAnimationFrame}),n("utils",["requestAnimationFrame"],function(e){function t(t,n){var r=Array.prototype.slice.call(arguments,2);return e(function(){n[0].clientHeight,t.apply(n,r)},1)}function n(e){return $.trim(e).replace(/  +/," ").replace(/^g /,"git ")}var r=function(e){for(var t in{MozTransform:1,WebkitTransform:1,OTransform:1,msTransform:1})if(typeof e.style[t]!="undefined")return t;return"transform"}(document.createElement("p")),i=["transitionend","webkitTransitionEnd","otransitionend"].join(" ");return{defer:t,normalize:n,transform:r,transitionend:i}}),n("Mob",["conf","utils"],function(e,t){function s(e,t,s){var o=new Box2D.b2BodyDef;o.set_type(Box2D.b2_dynamicBody),o.set_position(new Box2D.b2Vec2(t,s)),o.set_angle(0);var u=new Box2D.b2PolygonShape;u.SetAsBox(r/2,i/2);var a=new Box2D.b2FixtureDef;a.set_density(1),a.set_friction(.3),a.set_restitution(.4),a.set_shape(u),this.body=e.CreateBody(o),this.body.CreateFixture(a),this.im=$("<img class=mob src=media/mob.png width=55 height=40>")[0],this.im.ondragstart=function(){return!1},this.render(),n.append(this.im)}var n=$("#game"),r=55/e.GAME_SCALE,i=40/e.GAME_SCALE;return s.prototype.render=function(){var n=this.body.GetPosition();this.im.style.left=(n.get_x()-r/2)*e.GAME_SCALE+"px",this.im.style.top=(n.get_y()-i/2)*e.GAME_SCALE+"px",this.im.style[t.transform]="rotate("+this.body.GetAngle()+"rad)"},s}),n("RectProp",["conf"],function(e){function n(e,t,n,r,i){var s=new Box2D.b2BodyDef;s.set_position(new Box2D.b2Vec2(t,n)),s.set_angle(0),s.set_fixedRotation(!0);var o=new Box2D.b2PolygonShape;o.SetAsBox(r/2,i/2);var u=new Box2D.b2FixtureDef;u.set_restitution(.4),u.set_shape(o),this.body=e.CreateBody(s),this.body.CreateFixture(u),this.width=r,this.height=i}var t=$("#game");return n.prototype.render=function(){typeof this.rect=="undefined"&&(this.rect=$("<div class=rect-prop>").width(this.width*e.GAME_SCALE).height(this.height*e.GAME_SCALE).appendTo(t));var n=this.body.GetPosition();this.rect.css({left:(n.get_x()-this.width/2)*e.GAME_SCALE,top:(n.get_y()-this.height/2)*e.GAME_SCALE})},n}),n("game",["Mob","RectProp","requestAnimationFrame","conf"],function(e,t,n,r){function a(){n(a);var e=(new Date).getTime(),t=.01*(e-u);u=e,s.Step(t,10,8);for(var r=0;r<o.length;++r)o[r].render()}function f(){var e=635/r.GAME_SCALE,i=453/r.GAME_SCALE,o=new Box2D.b2Vec2(0,1),u=[];s=new Box2D.b2World(o),u.push(new t(s,e/2,0,e,1)),u.push(new t(s,e/2,i,e,1)),u.push(new t(s,0,i/2,1,i-1)),u.push(new t(s,e,i/2,1,i-1));for(var f=0;f<u.length;++f)u[f].render();n(a)}function l(){var t=34.5/r.GAME_SCALE,n=27/r.GAME_SCALE;o.push(new e(s,t,n))}var i=$("#game"),s,o=[],u=(new Date).getTime();return{init:f,addMob:l}}),n("keyboard",["conf","utils"],function(e,n){function i(t){return e.PRINTABLE.indexOf(t)!==-1}function s(){var s=t("ui").readline,o=t("todo").done,u=t("music").blip,a=0;$(document.documentElement).keydown(function(t){t.which===e.BACKSPACE&&(r.length!==0?(r=r.substr(0,r.length-1),s(r)):u(),t.preventDefault&&t.preventDefault())}),$(document.documentElement).keypress(function(t){check_keys=function(){var e=a;return function(){e==a-1?$(".text-caret").addClass("text-caret-animated"):$(".text-caret").removeClass("text-caret-animated")}},setTimeout(check_keys(),250),a++;if(t.metaKey||t.altKey||t.ctrlKey)return;var f=String.fromCharCode(t.which).toLowerCase();t.which===e.RETURN?(s(""),o(n.normalize(r)),r="",t.preventDefault&&t.preventDefault()):f.length===1&&i(f)?(r.length<e.BUFFER_SIZE?(r+=f,s(r)):u(),t.preventDefault&&t.preventDefault()):u()})}var r="";return{init:s}}),n("music",["utils"],function(e){function s(){t=soundManager.createSound({autoLoad:!0,id:"bgm",loops:9e3,multiShot:!1,url:"media/sound/bgm.mp3"}),n=soundManager.createSound({autoLoad:!0,id:"blip",url:"media/sound/blip.wav"}),r.remove(),$("#music-on").change(function(){t[["stop","play"][this.checked|0]]()}),$("#sound-on").change(function(){i=this.checked})}function o(){soundManager.setup({debugMode:!1,flashLoadTimeout:9e3,flashVersion:9,onready:s,url:"media/sound/"})}function u(){i&&n&&n.play()}var t,n,r=$("#console-disable"),i=$("#sound-on").is(":checked");return{init:o,blip:u}}),n("todo",["conf"],function(e){function p(e){n.push(e),_addMob(),r(e),s(n.length)}function d(){var e=location.search.substr(1);e=="normal"?c=1:e=="hard"&&(c=2),h-=c,g(),$("#level-select ."+l[c]).addClass("btn-primary active"),$("#level-restart a, #game-over a").attr("href","?"+l[c])}function v(){var e=t("game"),a=t("ui");n=[],_addMob=e.addMob,r=a.addTask,i=a.removeTask,s=a.updateCount,o=a.updateScore,u=a.endGame,f=a.changeCSS,d(),p("git init")}function m(){n.length===e.TODO_SIZE?u():p("git "+e.COMMANDS[Math.floor(Math.random()*e.COMMANDS.length)])}function g(){h-=.1*(1+c),console.log("new speed",h),f("#next.done","-moz-transition: width "+h+"s linear;-webkit-transition: width "+h+"s linear;-o-transition: width "+h+"s linear;")}function y(e){var t=n.indexOf(e);t!==-1&&(console.log(t),n.splice(t,1),i(e,n.length),s(n.length),o(100+c*100))}var n,r,i,s,o,u,a,f=0,l=["easy","normal","hard"],c=0,h=2.5;return{push:p,init:v,advance:m,changeSpeed:g,done:y}}),n("ui",["conf","utils","todo"],function(e,n,r){function p(){n.defer(o.addClass,o,"done"),o.removeClass("done"),l()}function d(){l=t("todo").advance,o.bind(n.transitionend,p),u.tooltip({placement:"bottom"});var e=$("body");n.defer(e.removeClass,e,"loading")}function v(e){s.text(e)}function m(e){var t=$("<div class=task>").attr("data-text",e).text(e);a.append(t),n.defer(t.addClass,t,"active")}function g(e,t){c||($("#instructions").remove(),c=!0),t||p();var r=a.children('.task[data-text="'+e+'"]');r.removeClass("active").bind(n.transitionend,function(){var e=$("<div class=replacement>");$(this).replaceWith(e),n.defer(e.addClass,e,"foo"),e.bind(n.transitionend,function(){$(this).remove()})})}function y(t){i.css("width",f/e.TODO_SIZE*t+"px"),t===e.TODO_SIZE&&i.addClass("danger")}function b(t){var n="00000000"+t;return n.substr(n.length-e.SCORE_SIZE)}function w(e){u.text(b(h+=e)),h%1e3==0&&r.changeSpeed()}function E(){o.remove(),$(document.documentElement).unbind("keypress"),$("#high-score").text(b(h)),$("#game-over").modal({backdrop:"static",keyboard:!1})}function S(e,t){var n=document.styleSheets[document.styleSheets.length-1];n.addRule?n.addRule(e,t):n.insertRule&&n.insertRule(e+" { "+t+" }",n.cssRules.length)}var i=$("#count"),s=$("#input"),o=$("#next"),u=$("#score"),a=$("#todo"),f=a.width(),l,c=!1,h=0;return{init:d,readline:v,addTask:m,removeTask:g,updateCount:y,updateScore:w,endGame:E,changeCSS:S}});if(!Array.prototype.indexOf){var r="This MSIE is not supported.";throw alert(r),new Error(r)}t(["fullscreen","game","keyboard","music","todo","ui"],function(){for(var e=0;e<arguments.length;++e)arguments[e].init()}),n("main",function(){})})()
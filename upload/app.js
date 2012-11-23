/**
 * almond 0.2.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(){var e,t,n;(function(r){function p(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)==="."&&t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function d(e,t){return function(){return s.apply(r,h.call(arguments,0).concat([e,t]))}}function v(e){return function(t){return p(t,e)}}function m(e){return function(t){a[e]=t}}function g(e){if(f.hasOwnProperty(e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!a.hasOwnProperty(e)&&!c.hasOwnProperty(e))throw new Error("No "+e);return a[e]}function y(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function b(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=[].slice;o=function(e,t){var n,r=y(e),i=r[0];return e=r[1],i&&(i=p(i,t),n=g(i)),i?n&&n.normalize?e=n.normalize(e,v(t)):e=p(e,t):(e=p(e,t),r=y(e),i=r[0],e=r[1],i&&(n=g(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return d(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:b(e)}}},i=function(e,t,n,i){var s,l,h,p,v,y=[],b;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")y[v]=u.require(e);else if(l==="exports")y[v]=u.exports(e),b=!0;else if(l==="module")s=y[v]=u.module(e);else if(a.hasOwnProperty(l)||f.hasOwnProperty(l)||c.hasOwnProperty(l))y[v]=g(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,d(i,!0),m(l),{}),y[v]=a[l]}}h=n.apply(a[e],y);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!b)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):g(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},15),s)},s.config=function(e){return l=e,s},n=function(e,t,n){t.splice||(n=t,t=[]),f[e]=[e,t,n]},n.amd={jQuery:!0}})(),n("almond",function(){}),n("conf",{ALLOW_KEYBOARD_INPUT:1,BACKSPACE:8,RETURN:13,GAME_SCALE:20,PRINTABLE:"abcdefghijklmnopqrstuvwxyz0123456789 -",BUFFER_SIZE:40,SCORE_SIZE:9,TODO_SIZE:9,COMMANDS:["add","commit","filter-branch","ls-files","pack-objects","remote-testgit","status","add--interactive","commit-tree","fmt-merge-msg","ls-remote","pack-redundant","repack","stripspace","am","config","for-each-ref","ls-tree","pack-refs","replace","submodule","annotate","count-objects","format-patch","mailinfo","patch-id","repo-config","svn","apply","credential-cache","fsck","mailsplit","peek-remote","request-pull","symbolic-ref","archimport","credential-cache--daemon","fsck-objects","merge","prune","rerere","tag","archive","credential-store","gc","merge-base","prune-packed","reset","tar-tree","bisect","cvsexportcommit","get-tar-commit-id","merge-file","pull","rev-list","unpack-file","bisect--helper","cvsimport","grep","merge-index","push","rev-parse","unpack-objects","blame","cvsserver","gui--askpass","merge-octopus","quiltimport","revert","update-index","branch","daemon","hash-object","merge-one-file","read-tree","rm","update-ref","bundle","describe","help","merge-ours","rebase","send-email","update-server-info","cat-file","diff","http-backend","merge-recursive","receive-pack","send-pack","upload-archive","check-attr","diff-files","http-fetch","merge-resolve","reflog","sh-i18n--envsubst","upload-pack","check-ref-format","diff-index","http-push","merge-subtree","relink","shell","var","checkout","diff-tree","imap-send","merge-tree","remote","shortlog","verify-pack","checkout-index","difftool","index-pack","mergetool","remote-ext","show","verify-tag","cherry","difftool--helper","init","mktag","remote-fd","show-branch","web--browse","cherry-pick","fast-export","init-db","mktree","remote-ftp","show-index","whatchanged","citool","fast-import","instaweb","mv","remote-ftps","show-ref","write-tree","clean","fetch","log","name-rev","remote-http","stage","clone","fetch-pack","lost-found","notes","remote-https","stash"]}),n("fullscreen",["conf"],function(e){function n(){if(!document.webkitFullscreenEnabled)return;t.show().click(function(){return document.webkitFullscreenElement?document.webkitExitFullscreen():document.documentElement.webkitRequestFullscreen(e.ALLOW_KEYBOARD_INPUT),!1})}var t=$("#fullscreen");return{init:n}}),n("box2d",[],function(){var e={b2_dynamicBody:Box2D.Dynamics.b2Body.b2_dynamicBody,b2_kinematicBody:Box2D.Dynamics.b2Body.b2_kinematicBody,b2_staticBody:Box2D.Dynamics.b2Body.b2_staticBody,b2BodyDef:Box2D.Dynamics.b2BodyDef,b2FixtureDef:Box2D.Dynamics.b2FixtureDef,b2PolygonShape:Box2D.Collision.Shapes.b2PolygonShape,b2Vec2:Box2D.Common.Math.b2Vec2,b2World:Box2D.Dynamics.b2World};return e.b2BodyDef.prototype.set_angle=function(e){this.angle=e},e.b2BodyDef.prototype.set_fixedRotation=function(e){this.fixedRotation=e},e.b2BodyDef.prototype.set_position=function(e){this.position=e},e.b2BodyDef.prototype.set_type=function(e){this.type=e},e.b2FixtureDef.prototype.set_density=function(e){this.density=e},e.b2FixtureDef.prototype.set_friction=function(e){this.friction=e},e.b2FixtureDef.prototype.set_restitution=function(e){this.restitution=e},e.b2FixtureDef.prototype.set_shape=function(e){this.shape=e},e.b2Vec2.prototype.get_x=function(){return this.x},e.b2Vec2.prototype.get_y=function(){return this.y},e}),typeof requestAnimationFrame=="undefined"&&(["moz","webkit","ms"].some(function(e){var t=this[e+"RequestAnimationFrame"];if(typeof t=="function")return requestAnimationFrame=t})||(requestAnimationFrame=function(e){return setTimeout(e,0)})),n("requestAnimationFrame",[],function(){return requestAnimationFrame}),n("utils",["requestAnimationFrame"],function(e){function t(t,n){var r=Array.prototype.slice.call(arguments,2);return e(function(){n[0].clientHeight,t.apply(n,r)},1)}function n(e){return $.trim(e).replace(/  +/," ").replace(/^g /,"git ")}function o(e,t){if(!s)return;s.addRule?s.addRule(e,t):s.insertRule&&s.insertRule(e+"{"+t+"}",s.cssRules.length)}var r=function(e){for(var t in{MozTransform:1,WebkitTransform:1,OTransform:1,msTransform:1})if(typeof e.style[t]!="undefined")return t;return"transform"}(document.createElement("p")),i=["transitionend","webkitTransitionEnd","otransitionend"].join(" "),s=function(e){for(var t=0;t<e.length;++t)if(e[t].title=="main")return e[t];return null}(document.styleSheets);return{defer:t,normalize:n,transform:r,transitionend:i,updateCSS:o}}),n("Mob",["box2d","conf","utils"],function(e,t,n){function o(t,n,o,u){var a=new e.b2BodyDef;a.set_type(e.b2_dynamicBody),a.set_position(new e.b2Vec2(n,o)),a.set_angle(0);var f=new e.b2PolygonShape;f.SetAsBox(i/2,s/2);var l=new e.b2FixtureDef;l.set_density(1),l.set_friction(.3),l.set_restitution(.4),l.set_shape(f),this.body=t.CreateBody(a),this.body.CreateFixture(l),this.world=t,this.text=u,this.im=$("<img class=mob src=media/mob.png width=55 height=40>")[0],this.im.ondragstart=function(){return!1},this.render(),r.append(this.im)}var r=$("#game"),i=55/t.GAME_SCALE,s=40/t.GAME_SCALE;return o.prototype.render=function(){var e=this.body.GetPosition();this.im.style.left=(e.get_x()-i/2)*t.GAME_SCALE+"px",this.im.style.top=(e.get_y()-s/2)*t.GAME_SCALE+"px",this.im.style[n.transform]="rotate("+this.body.GetAngle()+"rad)"},o.prototype.remove=function(){$(this.im).remove(),this.world.DestroyBody(this.body)},o}),n("RectProp",["box2d","conf"],function(e,t){function r(t,n,r,i,s){var o=new e.b2BodyDef;o.set_position(new e.b2Vec2(n,r)),o.set_angle(0),o.set_fixedRotation(!0);var u=new e.b2PolygonShape;u.SetAsBox(i/2,s/2);var a=new e.b2FixtureDef;a.set_restitution(.4),a.set_shape(u),this.body=t.CreateBody(o),this.body.CreateFixture(a),this.width=i,this.height=s}var n=$("#game");return r.prototype.render=function(){typeof this.rect=="undefined"&&(this.rect=$("<div class=rect-prop>").width(this.width*t.GAME_SCALE).height(this.height*t.GAME_SCALE).appendTo(n));var e=this.body.GetPosition();this.rect.css({left:(e.get_x()-this.width/2)*t.GAME_SCALE,top:(e.get_y()-this.height/2)*t.GAME_SCALE})},r}),n("game",["Mob","RectProp","requestAnimationFrame","box2d","conf"],function(e,t,n,r,i){function f(){n(f);var e=(new Date).getTime(),t=.01*(e-a);a=e,o.Step(t,10,8);for(var r=0;r<u.length;++r)u[r].render()}function l(){var e=635/i.GAME_SCALE,s=453/i.GAME_SCALE,u=new r.b2Vec2(0,.05),a=[];o=new r.b2World(u),o.real_width=e,o.real_height=s,a.push(new t(o,e/2,0,e,1)),a.push(new t(o,e/2,s,e,1)),a.push(new t(o,0,s/2,1,s-1)),a.push(new t(o,e,s/2,1,s-1));for(var l=0;l<a.length;++l)a[l].render();n(f)}function c(t){var n=34.5/i.GAME_SCALE,r=27/i.GAME_SCALE;n+=Math.random()*(o.real_width-n-n),u.push(new e(o,n,r,t))}function h(e){for(var t=0;t<u.length;++t)if(u[t].text==e){u[t].remove(),u.splice(t,1);return}}var s=$("#game"),o,u=[],a=(new Date).getTime();return{init:l,addMob:c,removeMob:h}}),n("keyboard",["conf","utils"],function(e,n){function s(t){return e.PRINTABLE.indexOf(t)!==-1}function o(){function l(e){return function(){r[e===f?"addClass":"removeClass"]("text-caret-animated")}}var o=t("ui").readline,u=t("todo").done,a=t("music").blip,f=0;$(document.documentElement).keydown(function(t){t.which===e.BACKSPACE&&(i.length!==0?(i=i.substr(0,i.length-1),o(i)):a(),t.preventDefault&&t.preventDefault())}),$(document.documentElement).keypress(function(t){if(t.metaKey||t.altKey||t.ctrlKey)return;setTimeout(l(++f),250);var r=String.fromCharCode(t.which).toLowerCase();t.which===e.RETURN?(o(""),u(n.normalize(i)),i="",t.preventDefault&&t.preventDefault()):r.length===1&&s(r)?(i.length<e.BUFFER_SIZE?(i+=r,o(i)):a(),t.preventDefault&&t.preventDefault()):a()})}var r=$(".text-caret"),i="";return{init:o}}),n("music",["utils"],function(e){function s(){t=soundManager.createSound({autoLoad:!0,id:"bgm",loops:9e3,multiShot:!1,url:"media/sound/bgm.mp3"}),n=soundManager.createSound({autoLoad:!0,id:"blip",url:"media/sound/blip.wav"}),r.remove(),$("#music-on").change(function(){t[["stop","play"][this.checked|0]]()}),$("#sound-on").change(function(){i=this.checked})}function o(){soundManager.setup({debugMode:!1,flashLoadTimeout:9e3,flashVersion:9,onready:s,url:"media/sound/"})}function u(){i&&n&&n.play()}var t,n,r=$("#console-disable"),i=$("#sound-on").is(":checked");return{init:o,blip:u}}),n("todo",["conf","utils"],function(e,n){function p(e){r.push(e),_addMob(e),i(e),o(r.length)}function d(){var e=location.search.substr(1);e=="normal"?l=1:e=="hard"&&(l=2),g(),$("#level-select ."+f[l]).addClass("btn-primary active"),$("#level-restart a, #game-over a").attr("href","?"+f[l])}function v(){var e=t("game"),n=t("ui");r=[],_addMob=e.addMob,i=n.addTask,s=n.removeTask,o=n.updateCount,u=n.updateScore,a=n.endGame,d(),p("git init")}function m(){r.length===e.TODO_SIZE?h||a():p("git "+e.COMMANDS[Math.floor(Math.random()*e.COMMANDS.length)])}function g(){c-=.1*(l+1),console.log("new speed",c),n.updateCSS("#next.done","-moz-transition: width "+c+"s linear;"+"-webkit-transition: width "+c+"s linear;"+"-o-transition: width "+c+"s linear;")}function y(e){e==="iddqd"&&(h=!0);var t=r.indexOf(e);t!==-1&&(r.splice(t,1),s(e,r.length),o(r.length),u(100+l*100))}var r,i,s,o,u,a,f=["easy","normal","hard"],l=0,c=2.5,h=!1;return{push:p,init:v,advance:m,changeSpeed:g,done:y}}),n("ui",["conf","utils"],function(e,n){function d(){n.defer(s.addClass,s,"done"),s.removeClass("done"),l()}function v(){var e=t("game"),r=t("todo");f=e.removeMob,l=r.advance,c=r.changeSpeed,s.bind(n.transitionend,d);var i=$("body");n.defer(i.removeClass,i,"loading")}function m(e){i.text(e)}function g(e){var t=$("<div class=task>").attr("data-text",e).text(e);u.append(t),n.defer(t.addClass,t,"active")}function y(e,t){if(!h){function r(){$(this).remove()}$("#instructions").remove(),$("#github").slideUp(r),$("#fullscreen").hide(r),h=!0}t||d();var i=u.children('.task[data-text="'+e+'"]').first();f(e),i.removeClass("active").bind(n.transitionend,function(){var e=$("<div class=replacement>");$(this).replaceWith(e),n.defer(e.addClass,e,"foo"),e.bind(n.transitionend,function(){$(this).remove()})})}function b(t){r.css("width",a/e.TODO_SIZE*t+"px"),t===e.TODO_SIZE&&r.addClass("danger")}function w(t){var n="00000000"+t;return n.substr(n.length-e.SCORE_SIZE)}function E(e){var t=p;o.text(w(p+=e)),(.001*p|0)!=(.001*t|0)&&c()}function S(){s.remove(),$(document.documentElement).unbind("keypress"),$("#high-score").text(w(p)),$("#game-over").modal({backdrop:"static",keyboard:!1})}var r=$("#count"),i=$("#input"),s=$("#next"),o=$("#score"),u=$("#todo"),a=u.width(),f,l,c,h=!1,p=0;return{init:v,readline:m,addTask:g,removeTask:y,updateCount:b,updateScore:E,endGame:S}});if(!Array.prototype.indexOf){var r="This MSIE is not supported.";throw alert(r),new Error(r)}t(["fullscreen","game","keyboard","music","todo","ui"],function(){for(var e=0;e<arguments.length;++e)arguments[e].init()}),n("main",function(){})})();
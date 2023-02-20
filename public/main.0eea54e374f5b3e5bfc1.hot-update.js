/*! For license information please see main.0eea54e374f5b3e5bfc1.hot-update.js.LICENSE.txt */
"use strict";self.webpackHotUpdatefleoma("main",{"./app/components/Canvas/Discography/index.js":(s,t,e)=>{e.r(t),e.d(t,{default:()=>d});var i=e("./node_modules/ogl/src/core/Transform.js"),r=e("./node_modules/ogl/src/extras/Plane.js"),l=e("./node_modules/gsap/index.js"),o=e("./node_modules/prefix/index.js"),h=e.n(o),a=e("./node_modules/lodash/map.js"),n=e.n(a),c=e("./app/components/Canvas/Discography/Media.js");const d=class{constructor({gl:s,scene:t,sizes:e,transition:r}){this.id="discography",this.gl=s,this.scene=t,this.sizes=e,this.transition=r,this.transformPrefix=h()("transform"),this.group=new i.Transform,this.galleryElement=document.querySelector(".discography__gallery"),this.galleryWrapperElement=document.querySelector(".discography__gallery__wrapper"),this.titlesElement=document.querySelector(".discography__titles"),this.discographyElements=document.querySelectorAll(".discography__article"),this.discographyElementsActive="discography__article--active",this.mediasElements=document.querySelectorAll(".discography__gallery__media"),this.scroll={current:0,start:0,target:0,lerp:.1,velocity:1},this.createGeometry(),this.createGallery(),this.onResize({sizes:this.sizes}),this.group.setParent(this.scene),this.show()}createGeometry(){this.geometry=new r.Plane(this.gl)}createGallery(){this.medias=n()(this.mediasElements,((s,t)=>new c.default({element:s,geometry:this.geometry,index:t,scene:this.group,gl:this.gl,sizes:this.sizes})))}show(){if(this.transition){const{src:s}=this.transition.mesh.program.uniforms.tMap.value.image,t=window.TEXTURES[s],e=this.medias.find((s=>s.texture===t)),i=-e.bounds.left-e.bounds.width/2+window.innerWidth/2;this.update(),this.transition.animate({position:{x:0,y:e.mesh.position.y,z:0},rotation:e.mesh.rotation,scale:e.mesh.scale},(s=>{e.opacity.multiplier=1,n()(this.medias,(s=>{e!==s&&s.show()})),this.scroll.current=this.scroll.target=this.scroll.start=this.scroll.last=i}))}else n()(this.medias,(s=>s.show()))}hide(){n()(this.medias,(s=>s.hide()))}onResize(s){this.sizes=s.sizes,this.bounds=this.galleryWrapperElement.getBoundingClientRect(),this.scroll.last=this.scroll.target=0,n()(this.medias,(t=>t.onResize(s,this.scroll))),this.scroll.limit=this.bounds.width-this.medias[0].element.clientWidth}onTouchDown({x:s,y:t}){this.scroll.last=this.scroll.current}onTouchMove({x:s,y:t}){const e=s.start-s.end;this.scroll.target=this.scroll.last-e}onTouchUp({x:s,y:t}){}onWheel({pixelY:s}){this.scroll.target-=s}onChange(s){this.index=s;const t=parseInt(this.mediasElements[this.index].getAttribute("data-index"));n()(this.discographyElements,((s,e)=>{e===t?s.classList.add(this.discographyElementsActive):s.classList.remove(this.discographyElementsActive)})),this.titlesElement.style[this.transformPrefix]=`translateY(-${25*t}%) translate(-50%, -50%) rotate(-90deg)`}update(){this.scroll.target=l.default.utils.clamp(-this.scroll.limit,0,this.scroll.target),this.scroll.current=l.default.utils.interpolate(this.scroll.current,this.scroll.target,this.scroll.lerp),this.galleryElement.style[this.transformPrefix]=`translateX(${this.scroll.current}px)`,this.scroll.last<this.scroll.current?this.scroll.direction="right":this.scroll.last>this.scroll.current&&(this.scroll.direction="left"),this.scroll.last=this.scroll.current;const s=Math.floor(Math.abs(this.scroll.current/this.scroll.limit)*(this.medias.length-1));this.index!==s&&this.onChange(s),n()(this.medias,((s,t)=>{s.update(this.scroll.current,this.index),s.mesh.position.y+=40*Math.cos(s.mesh.position.x/this.sizes.width*Math.PI*.1)-40}))}destroy(){this.scene.removeChild(this.group)}}}},(function(s){s.h=()=>"78945799414134e1a462"}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU9xRSxVQUFZLFFBQ2ZwRixLQUFLZSxPQUFPOEMsS0FBTzdELEtBQUtlLE9BQU9DLFVBQ3hDaEIsS0FBS2UsT0FBT3FFLFVBQVksUUFHMUJwRixLQUFLZSxPQUFPOEMsS0FBTzdELEtBQUtlLE9BQU9DLFFBRS9CLE1BQU1lLEVBQVFzRCxLQUFLQyxNQUNqQkQsS0FBS0UsSUFBSXZGLEtBQUtlLE9BQU9DLFFBQVVoQixLQUFLZSxPQUFPa0QsUUFDeENqRSxLQUFLNEIsT0FBTzRELE9BQVMsSUFHdEJ4RixLQUFLK0IsUUFBVUEsR0FDakIvQixLQUFLMEUsU0FBUzNDLEdBR2hCRixJQUFJN0IsS0FBSzRCLFFBQVEsQ0FBQ2UsRUFBT1osS0FDdkJZLEVBQU1NLE9BQU9qRCxLQUFLZSxPQUFPQyxRQUFTaEIsS0FBSytCLE9BTXZDWSxFQUFNVCxLQUFLaUIsU0FBU0UsR0FFaEIsR0FERmdDLEtBQUtJLElBQUs5QyxFQUFNVCxLQUFLaUIsU0FBU0MsRUFBSXBELEtBQUtGLE1BQU1pRCxNQUFTc0MsS0FBS0ssR0FBSyxJQUVoRSxFQUFFLEdBRVIsQ0FFQUMsVUFDRTNGLEtBQUtILE1BQU0rRixZQUFZNUYsS0FBS0ksTUFDOUIsa0JDdk5GeUYsRUFBb0JDLEVBQUksSUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZsZW9tYS8uL2FwcC9jb21wb25lbnRzL0NhbnZhcy9EaXNjb2dyYXBoeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9mbGVvbWEvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYW5lLCBUcmFuc2Zvcm0gfSBmcm9tIFwib2dsXCI7XHJcbmltcG9ydCBnc2FwIGZyb20gXCJnc2FwXCI7XHJcbmltcG9ydCBQcmVmaXggZnJvbSBcInByZWZpeFwiO1xyXG5cclxuaW1wb3J0IG1hcCBmcm9tIFwibG9kYXNoL21hcFwiO1xyXG5cclxuaW1wb3J0IE1lZGlhIGZyb20gXCIuL01lZGlhXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgY29uc3RydWN0b3IoeyBnbCwgc2NlbmUsIHNpemVzLCB0cmFuc2l0aW9uIH0pIHtcclxuICAgIHRoaXMuaWQgPSBcImRpc2NvZ3JhcGh5XCI7XHJcblxyXG4gICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgdGhpcy5zaXplcyA9IHNpemVzO1xyXG4gICAgdGhpcy50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybVByZWZpeCA9IFByZWZpeChcInRyYW5zZm9ybVwiKTtcclxuXHJcbiAgICB0aGlzLmdyb3VwID0gbmV3IFRyYW5zZm9ybSgpO1xyXG5cclxuICAgIHRoaXMuZ2FsbGVyeUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc2NvZ3JhcGh5X19nYWxsZXJ5XCIpO1xyXG5cclxuICAgIHRoaXMuZ2FsbGVyeVdyYXBwZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuZGlzY29ncmFwaHlfX2dhbGxlcnlfX3dyYXBwZXJcIlxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnRpdGxlc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc2NvZ3JhcGh5X190aXRsZXNcIik7XHJcblxyXG4gICAgdGhpcy5kaXNjb2dyYXBoeUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgXCIuZGlzY29ncmFwaHlfX2FydGljbGVcIlxyXG4gICAgKTtcclxuICAgIHRoaXMuZGlzY29ncmFwaHlFbGVtZW50c0FjdGl2ZSA9IFwiZGlzY29ncmFwaHlfX2FydGljbGUtLWFjdGl2ZVwiO1xyXG5cclxuICAgIHRoaXMubWVkaWFzRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICBcIi5kaXNjb2dyYXBoeV9fZ2FsbGVyeV9fbWVkaWFcIlxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbCA9IHtcclxuICAgICAgY3VycmVudDogMCxcclxuICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgIHRhcmdldDogMCxcclxuICAgICAgbGVycDogMC4xLFxyXG4gICAgICB2ZWxvY2l0eTogMSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jcmVhdGVHZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5jcmVhdGVHYWxsZXJ5KCk7XHJcblxyXG4gICAgdGhpcy5vblJlc2l6ZSh7XHJcbiAgICAgIHNpemVzOiB0aGlzLnNpemVzLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ncm91cC5zZXRQYXJlbnQodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgdGhpcy5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHZW9tZXRyeSgpIHtcclxuICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUGxhbmUodGhpcy5nbCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHYWxsZXJ5KCkge1xyXG4gICAgdGhpcy5tZWRpYXMgPSBtYXAodGhpcy5tZWRpYXNFbGVtZW50cywgKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgTWVkaWEoe1xyXG4gICAgICAgIGVsZW1lbnQsXHJcbiAgICAgICAgZ2VvbWV0cnk6IHRoaXMuZ2VvbWV0cnksXHJcbiAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgc2NlbmU6IHRoaXMuZ3JvdXAsXHJcbiAgICAgICAgZ2w6IHRoaXMuZ2wsXHJcbiAgICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBBbmltYXRpb25zXHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHsgc3JjIH0gPSB0aGlzLnRyYW5zaXRpb24ubWVzaC5wcm9ncmFtLnVuaWZvcm1zLnRNYXAudmFsdWUuaW1hZ2U7XHJcbiAgICAgIGNvbnN0IHRleHR1cmUgPSB3aW5kb3cuVEVYVFVSRVNbc3JjXTtcclxuICAgICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhcy5maW5kKChtZWRpYSkgPT4gbWVkaWEudGV4dHVyZSA9PT0gdGV4dHVyZSk7XHJcbiAgICAgIGNvbnN0IHNjcm9sbCA9IC1tZWRpYS5ib3VuZHMubGVmdCAtIG1lZGlhLmJvdW5kcy53aWR0aCAvIDIgKyB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7IC8vIHByZXR0aWVyLWlnbm9yZVxyXG5cclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuXHJcbiAgICAgIHRoaXMudHJhbnNpdGlvbi5hbmltYXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBvc2l0aW9uOiB7IHg6IDAsIHk6IG1lZGlhLm1lc2gucG9zaXRpb24ueSwgejogMCB9LFxyXG4gICAgICAgICAgcm90YXRpb246IG1lZGlhLm1lc2gucm90YXRpb24sXHJcbiAgICAgICAgICBzY2FsZTogbWVkaWEubWVzaC5zY2FsZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIChfKSA9PiB7XHJcbiAgICAgICAgICBtZWRpYS5vcGFjaXR5Lm11bHRpcGxpZXIgPSAxO1xyXG5cclxuICAgICAgICAgIG1hcCh0aGlzLm1lZGlhcywgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKG1lZGlhICE9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgaXRlbS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHRoaXMuc2Nyb2xsLmN1cnJlbnQgPSB0aGlzLnNjcm9sbC50YXJnZXQgPSB0aGlzLnNjcm9sbC5zdGFydCA9IHRoaXMuc2Nyb2xsLmxhc3QgPSBzY3JvbGw7IC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1hcCh0aGlzLm1lZGlhcywgKG1lZGlhKSA9PiBtZWRpYS5zaG93KCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIG1hcCh0aGlzLm1lZGlhcywgKG1lZGlhKSA9PiBtZWRpYS5oaWRlKCkpO1xyXG4gIH1cclxuXHJcbiAgb25SZXNpemUoZSkge1xyXG4gICAgdGhpcy5zaXplcyA9IGUuc2l6ZXM7XHJcblxyXG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdhbGxlcnlXcmFwcGVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbC5sYXN0ID0gdGhpcy5zY3JvbGwudGFyZ2V0ID0gMDtcclxuXHJcbiAgICBtYXAodGhpcy5tZWRpYXMsIChtZWRpYSkgPT4gbWVkaWEub25SZXNpemUoZSwgdGhpcy5zY3JvbGwpKTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbC5saW1pdCA9IHRoaXMuYm91bmRzLndpZHRoIC0gdGhpcy5tZWRpYXNbMF0uZWxlbWVudC5jbGllbnRXaWR0aDtcclxuICB9XHJcblxyXG4gIG9uVG91Y2hEb3duKHsgeCwgeSB9KSB7XHJcbiAgICB0aGlzLnNjcm9sbC5sYXN0ID0gdGhpcy5zY3JvbGwuY3VycmVudDtcclxuICB9XHJcblxyXG4gIG9uVG91Y2hNb3ZlKHsgeCwgeSB9KSB7XHJcbiAgICBjb25zdCBkaXN0YW5jZSA9IHguc3RhcnQgLSB4LmVuZDtcclxuXHJcbiAgICB0aGlzLnNjcm9sbC50YXJnZXQgPSB0aGlzLnNjcm9sbC5sYXN0IC0gZGlzdGFuY2U7XHJcbiAgfVxyXG5cclxuICBvblRvdWNoVXAoeyB4LCB5IH0pIHt9XHJcblxyXG4gIG9uV2hlZWwoeyBwaXhlbFkgfSkge1xyXG4gICAgdGhpcy5zY3JvbGwudGFyZ2V0IC09IHBpeGVsWTtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlKGluZGV4KSB7XHJcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWREaXNjb2dyYXBoeSA9IHBhcnNlSW50KFxyXG4gICAgICB0aGlzLm1lZGlhc0VsZW1lbnRzW3RoaXMuaW5kZXhdLmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIilcclxuICAgICk7XHJcblxyXG4gICAgbWFwKHRoaXMuZGlzY29ncmFwaHlFbGVtZW50cywgKGVsZW1lbnQsIGVsZW1lbnRJbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZWxlbWVudEluZGV4ID09PSBzZWxlY3RlZERpc2NvZ3JhcGh5KSB7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZGlzY29ncmFwaHlFbGVtZW50c0FjdGl2ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZGlzY29ncmFwaHlFbGVtZW50c0FjdGl2ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGxpbmtcclxuICAgIHRoaXMudGl0bGVzRWxlbWVudC5zdHlsZVt0aGlzLnRyYW5zZm9ybVByZWZpeF0gPSBgdHJhbnNsYXRlWSgtJHtcclxuICAgICAgMjUgKiBzZWxlY3RlZERpc2NvZ3JhcGh5XHJcbiAgICB9JSkgdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSgtOTBkZWcpYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZVxyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuc2Nyb2xsLnRhcmdldCA9IGdzYXAudXRpbHMuY2xhbXAoXHJcbiAgICAgIC10aGlzLnNjcm9sbC5saW1pdCxcclxuICAgICAgMCxcclxuICAgICAgdGhpcy5zY3JvbGwudGFyZ2V0XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsLmN1cnJlbnQgPSBnc2FwLnV0aWxzLmludGVycG9sYXRlKFxyXG4gICAgICB0aGlzLnNjcm9sbC5jdXJyZW50LFxyXG4gICAgICB0aGlzLnNjcm9sbC50YXJnZXQsXHJcbiAgICAgIHRoaXMuc2Nyb2xsLmxlcnBcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5nYWxsZXJ5RWxlbWVudC5zdHlsZVtcclxuICAgICAgdGhpcy50cmFuc2Zvcm1QcmVmaXhcclxuICAgIF0gPSBgdHJhbnNsYXRlWCgke3RoaXMuc2Nyb2xsLmN1cnJlbnR9cHgpYDtcclxuXHJcbiAgICBpZiAodGhpcy5zY3JvbGwubGFzdCA8IHRoaXMuc2Nyb2xsLmN1cnJlbnQpIHtcclxuICAgICAgdGhpcy5zY3JvbGwuZGlyZWN0aW9uID0gXCJyaWdodFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjcm9sbC5sYXN0ID4gdGhpcy5zY3JvbGwuY3VycmVudCkge1xyXG4gICAgICB0aGlzLnNjcm9sbC5kaXJlY3Rpb24gPSBcImxlZnRcIjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbC5sYXN0ID0gdGhpcy5zY3JvbGwuY3VycmVudDtcclxuXHJcbiAgICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoXHJcbiAgICAgIE1hdGguYWJzKHRoaXMuc2Nyb2xsLmN1cnJlbnQgLyB0aGlzLnNjcm9sbC5saW1pdCkgKlxyXG4gICAgICAgICh0aGlzLm1lZGlhcy5sZW5ndGggLSAxKVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAodGhpcy5pbmRleCAhPT0gaW5kZXgpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZShpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFwKHRoaXMubWVkaWFzLCAobWVkaWEsIGluZGV4KSA9PiB7XHJcbiAgICAgIG1lZGlhLnVwZGF0ZSh0aGlzLnNjcm9sbC5jdXJyZW50LCB0aGlzLmluZGV4KTtcclxuICAgICAgLy8gbWVkaWEubWVzaC5yb3RhdGlvbi56ID1cclxuICAgICAgLy8gICBNYXRoLmFicyhcclxuICAgICAgLy8gICAgIGdzYXAudXRpbHMubWFwUmFuZ2UoMCwgMSwgLTAuMiwgMC4yLCBpbmRleCAvICh0aGlzLm1lZGlhcy5sZW5ndGggLSAxKSlcclxuICAgICAgLy8gICApIC0gMC4xO1xyXG5cclxuICAgICAgbWVkaWEubWVzaC5wb3NpdGlvbi55ICs9XHJcbiAgICAgICAgTWF0aC5jb3MoKG1lZGlhLm1lc2gucG9zaXRpb24ueCAvIHRoaXMuc2l6ZXMud2lkdGgpICogTWF0aC5QSSAqIDAuMSkgKlxyXG4gICAgICAgICAgNDAgLVxyXG4gICAgICAgIDQwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5zY2VuZS5yZW1vdmVDaGlsZCh0aGlzLmdyb3VwKTtcclxuICB9XHJcbn1cclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNzg5NDU3OTk0MTQxMzRlMWE0NjJcIikiXSwibmFtZXMiOlsiY29uc3RydWN0b3IiLCJnbCIsInNjZW5lIiwic2l6ZXMiLCJ0cmFuc2l0aW9uIiwidGhpcyIsImlkIiwidHJhbnNmb3JtUHJlZml4IiwiUHJlZml4IiwiZ3JvdXAiLCJUcmFuc2Zvcm0iLCJnYWxsZXJ5RWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImdhbGxlcnlXcmFwcGVyRWxlbWVudCIsInRpdGxlc0VsZW1lbnQiLCJkaXNjb2dyYXBoeUVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRpc2NvZ3JhcGh5RWxlbWVudHNBY3RpdmUiLCJtZWRpYXNFbGVtZW50cyIsInNjcm9sbCIsImN1cnJlbnQiLCJzdGFydCIsInRhcmdldCIsImxlcnAiLCJ2ZWxvY2l0eSIsImNyZWF0ZUdlb21ldHJ5IiwiY3JlYXRlR2FsbGVyeSIsIm9uUmVzaXplIiwic2V0UGFyZW50Iiwic2hvdyIsImdlb21ldHJ5IiwiUGxhbmUiLCJtZWRpYXMiLCJtYXAiLCJlbGVtZW50IiwiaW5kZXgiLCJNZWRpYSIsInNyYyIsIm1lc2giLCJwcm9ncmFtIiwidW5pZm9ybXMiLCJ0TWFwIiwidmFsdWUiLCJpbWFnZSIsInRleHR1cmUiLCJ3aW5kb3ciLCJURVhUVVJFUyIsIm1lZGlhIiwiZmluZCIsImJvdW5kcyIsImxlZnQiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJ1cGRhdGUiLCJhbmltYXRlIiwicG9zaXRpb24iLCJ4IiwieSIsInoiLCJyb3RhdGlvbiIsInNjYWxlIiwiXyIsIm9wYWNpdHkiLCJtdWx0aXBsaWVyIiwiaXRlbSIsImxhc3QiLCJoaWRlIiwiZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxpbWl0IiwiY2xpZW50V2lkdGgiLCJvblRvdWNoRG93biIsIm9uVG91Y2hNb3ZlIiwiZGlzdGFuY2UiLCJlbmQiLCJvblRvdWNoVXAiLCJvbldoZWVsIiwicGl4ZWxZIiwib25DaGFuZ2UiLCJzZWxlY3RlZERpc2NvZ3JhcGh5IiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJlbGVtZW50SW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzdHlsZSIsImdzYXAiLCJkaXJlY3Rpb24iLCJNYXRoIiwiZmxvb3IiLCJhYnMiLCJsZW5ndGgiLCJjb3MiLCJQSSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCIsIl9fd2VicGFja19yZXF1aXJlX18iLCJoIl0sInNvdXJjZVJvb3QiOiIifQ==
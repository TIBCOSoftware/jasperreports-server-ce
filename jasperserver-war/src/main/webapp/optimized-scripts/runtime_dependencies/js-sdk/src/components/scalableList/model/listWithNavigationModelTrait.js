define(["require","underscore"],function(e){"use strict";var t=e("underscore");return{activate:function(e,i){if("number"!=typeof e)return void this.setActive(t.extend({},i));if(i=i||{},e>=this.get("bufferStartIndex")&&e<=this.get("bufferEndIndex")){var n=this.get("items")[e-this.get("bufferStartIndex")];n&&this.setActive(t.extend(i,{index:e,item:n}))}else{var s=this;this.getData({offset:e,limit:1}).done(function(n){s.setActive(t.extend(i,{index:e,item:n.data[0]}))}).fail(this.fetchFailed)}},setActive:function(e){this.active&&e.index===this.active.index&&e.item.value===this.active.value||(this.active=e&&"number"==typeof e.index?{index:e.index,value:e.item.value,label:e.item.label}:void 0,e&&e.silent||(this.trigger("change"),this.trigger("active:changed",this.active)))},getActive:function(){return this.active}}});
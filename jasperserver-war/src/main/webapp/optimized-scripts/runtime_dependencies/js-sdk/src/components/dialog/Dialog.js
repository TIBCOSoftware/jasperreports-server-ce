define(["require","jquery","backbone","underscore","text!./template/dialogTemplate.htm","text!./template/dialogButtonTemplate.htm","components/utils/Event","components/overlay/Overlay","logger","jquery-ui/widgets/draggable","jquery-ui/widgets/resizable"],function(t){"use strict";var e=t("jquery"),i=t("backbone"),o=t("underscore"),s=t("text!./template/dialogTemplate.htm"),r=(t("text!./template/dialogButtonTemplate.htm"),t("components/utils/Event")),n=t("components/overlay/Overlay"),l=t("logger").register("Dialog");t("jquery-ui/widgets/draggable"),t("jquery-ui/widgets/resizable");var h=i.View.extend({defaults:{title:"",modal:!0,zIndex:4e3,resetSizeOnOpen:!0},template:o.template(s),events:{"click .jr-jDialogClose":"_onClose"},el:function(){return this.template({options:this.props})},constructor:function(t){this.props=o.defaults(t||{},this.defaults),this.log=this.props.log||l,this.$overlay=this.props.$overlay?this.props.$overlay:new n({zIndex:this.props.zIndex}),i.View.apply(this,arguments)},initialize:function(){this.$window=e(window),this.$body=e("body"),this.$body.append(this.$overlay.$el),this.$body.append(this.$el)},_onClose:function(){var t=new r({name:"dialog:close"});this.trigger(t.name,t),t.isDefaultPrevented()||this.close()},open:function(t){return this.$el.removeClass("jr-isHidden"),this.$el.css({position:"absolute"}),this.props.resetSizeOnOpen&&(this.$el.css({height:"",width:""}),this.$el.find("textarea").css({height:"",width:""})),this._position(t),this.props.modal&&(this.$overlay.show(),this.$el.addClass("jr-mDialogModal")),this},_position:function(t){var e,i=this.$el.height(),o=this.$el.width(),s={height:i,width:o};return e=t&&void 0!==t.top&&void 0!==t.left?h.fitInProvidedCoordinates({coordinates:t,outerRect:{height:this.$body.height(),width:this.$body.width()},elemRect:s}):h.calculateCenterPosition({outerRect:{width:this.$window.width(),height:this.$window.height()},innerRect:s,scrollCorrection:{width:this.$window.scrollLeft(),height:this.$window.scrollTop()}}),this.$el.css({top:parseInt(e.top),left:parseInt(e.left),zIndex:this.props.zIndex}),this},close:function(){return this.$el.addClass("jr-isHidden"),this.props.modal&&this.$overlay.hide(),this},delegateEvents:function(){var t=this;return i.View.prototype.delegateEvents.apply(this,arguments),this.$el.draggable({handle:".jr-jDialogDraggable",addClasses:!1,containment:"document"}),this.$(".jr-jDialogResizer").length>0&&this.$el.resizable({handles:{se:this.$(".jr-jDialogResizer")},start:function(e,i){t.trigger("dialog:resize:started",i)},stop:function(e,i){t.trigger("dialog:resize:stopped",i)},resize:function(e,i){t.trigger("dialog:resize",i)}}),this},undelegateEvents:function(){try{this.$el.draggable("destroy"),this.$el.resizable("destroy")}catch(t){}return i.View.prototype.undelegateEvents.apply(this,arguments)},remove:function(){return this.stopListening(),this.$overlay.remove(),i.View.prototype.remove.call(this),this}},{calculateCenterPosition:function(t){t=t||{};var e=t.outerRect,i=t.innerRect,s=t.scrollCorrection;if(s||(s={width:0,height:0}),e&&i){var r=Math.max(0,s.width+e.width/2-i.width/2),n=Math.max(0,s.height+e.height/2-i.height/2);if(o.isNaN(r)||o.isNaN(n))throw new TypeError("Can't calculate position. Make sure that you pass dimension as integer values");return{left:r,top:n}}throw new Error("Illegal arguments")},fitInProvidedCoordinates:function(t){t=t||{};var e=t.coordinates,i=t.outerRect,o=t.elemRect,s=e.topPoint||0,r=e.leftPoint||0,n=e.top-s*o.height,l=e.left-r*o.width,h=i.height-e.top,a=i.width-e.left;return h<o.height&&(n=e.top-o.height,n=n<0?i.height/2-o.height/2:n),a<o.width&&(l=e.left-o.width,l=l<0?i.width/2-o.width/2:l),{top:n,left:l}}});return h.prototype=o.extend({get title(){return this.props.title},set title(t){if(!o.isString(t))throw new TypeError("'Title' should be string");this.props.title=t,this.$el.find(".jr-jDialogTitle").text(this.props.title)},get modal(){return this.props.modal},set modal(t){if(!o.isBoolean(t))throw new TypeError("'Modal' should be boolean");this.props.modal=t}},h.prototype),h});
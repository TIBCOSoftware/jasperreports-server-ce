define(["require","exports","module","backbone","jquery","underscore","text!./template/dateTimePopupContainer.htm","logger","jquery-ui/widgets/datepicker","jquery-ui/widgets/timepicker"],function(e,t,i){"use strict";function r(e){var t="datetimepicker";return e.dateFormat&&e.timeFormat?t:(e.dateFormat?t="datepicker":e.timeFormat&&(t="timepicker"),t)}function p(e,t){var i=e;return"datetimepicker"==t||"datepicker"==t?i=h.defaults(e,d):"timepicker"==t&&(i=h.defaults(e,l)),i}function s(e,t){var i=e.beforeShow;return e.beforeShow=function(){o.apply(this,arguments),t||n.apply(this,arguments),i&&i.apply(this,arguments)},e}function n(e,t){var i=a(e).offset().left,r=parseFloat(t.dpDiv.css("width").replace("px","")),p=i+e.offsetWidth+r<a(window).width();t.dpDiv.css({marginLeft:p?e.offsetWidth+"px":0})}function o(e,t){var i,r=t.dpDiv,p=r.parent();p&&p.is("body")&&(i=r.detach(),r=a(k),r.append(i),a("body").append(r))}var c=e("backbone"),a=e("jquery"),h=e("underscore"),k=e("text!./template/dateTimePopupContainer.htm"),d={stepHour:1,stepMinute:1,stepSecond:1,showSecond:!0,changeMonth:!0,changeYear:!0,showButtonPanel:!0,onChangeMonthYear:null,constrainInput:!1},l={showSecond:!0,constrainInput:!1},u=e("logger").register(i);return e("jquery-ui/widgets/datepicker"),e("jquery-ui/widgets/timepicker"),a.timepicker.log=function(e){u.warn(e)},c.View.extend({constructor:function(e){this.pickerOptions=h.clone(e),this.pickerOptions.hasOwnProperty("dateFormat")&&!h.isString(this.pickerOptions.dateFormat)&&delete this.pickerOptions.dateFormat,this.pickerOptions.hasOwnProperty("timeFormat")&&!h.isString(this.pickerOptions.timeFormat)&&delete this.pickerOptions.timeFormat,this.inline=!!this.pickerOptions.el||!1,this.skipMoving=this.pickerOptions.skipMoving||!1,delete this.pickerOptions.el,delete this.pickerOptions.skipMoving,this.pickerType=r(this.pickerOptions),this.pickerOptions=p(this.pickerOptions,this.pickerType),this.pickerOptions=s(this.pickerOptions,this.skipMoving),this.log=e.log?e.log:u,c.View.apply(this,arguments)},initialize:function(){var e=this;this.$el[this.pickerType](this.pickerOptions),this._callPickerAction=function(t){e.$el[e.pickerType](t)}},getDate:function(){return"timepicker"!==this.pickerType?this.$el[this.pickerType].getDate():this.$el[this.pickerType].getTime()},setDate:function(e){if(!e)return this;try{h.isString(e)&&("datetimepicker"===this.pickerType?e=a.datepicker.parseDateTime(this.pickerOptions.dateFormat,this.pickerOptions.timeFormat,e):"datepicker"===this.pickerType&&(e=a.datepicker.parseDate(this.pickerOptions.dateFormat,e))),"datepicker"===this.pickerType?this.$el[this.pickerType]("setDate",e):"timepicker"===this.pickerType?this.$el[this.pickerType]("setTime",e):"datetimepicker"===this.pickerType&&(this.$el[this.pickerType]("setTime",e),this.$el[this.pickerType]("setDate",e))}catch(e){this.log.debug(e)}return this},show:function(){return this._callPickerAction("show"),this},hide:function(){return this._callPickerAction("hide"),this},remove:function(){this._callPickerAction("destroy"),this.inline?(this.$el.empty().off(),this.stopListening()):c.View.prototype.remove.apply(this,arguments)}},{setDefaults:function(e){a.datepicker.regional[e.locale]=e.date,a.datepicker.setDefaults(e.date),a.timepicker.setDefaults(e.time)},Helpers:{fixPopupPositionAndStyling:s,movePickerRelativelyToTriggerIcon:n,stylePopupContainer:o,discoverPickerType:r,provideDefaultPickerOptions:p}})});
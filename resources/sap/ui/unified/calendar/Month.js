/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','sap/ui/core/date/UniversalDate','sap/ui/unified/library'],function(q,C,L,I,D,a,U,l){"use strict";var M=C.extend("sap.ui.unified.calendar.Month",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false},firstDayOfWeek:{type:"int",group:"Appearance",defaultValue:-1},nonWorkingDays:{type:"int[]",group:"Appearance",defaultValue:null},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{},focus:{parameters:{date:{type:"object"},otherMonth:{type:"boolean"},restoreOldDate:{type:"boolean"}}}}}});M.prototype.init=function(){var s=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",s);this.setProperty("secondaryCalendarType",s);this._oFormatYyyymmdd=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyyMMdd",calendarType:sap.ui.core.CalendarType.Gregorian});this._oFormatLong=sap.ui.core.format.DateFormat.getInstance({style:"long",calendarType:s});this._mouseMoveProxy=q.proxy(this._handleMouseMove,this);this._iColumns=7;};M.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}if(this._sInvalidateMonth){q.sap.clearDelayedCall(this._sInvalidateMonth);}};M.prototype.onAfterRendering=function(){_.call(this);n.call(this);};M.prototype.onsapfocusleave=function(E){if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){if(this._bMouseMove){this._unbindMousemove(true);h.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;m.call(this);}if(this._bMousedownChange){this._bMousedownChange=false;m.call(this);}}};M.prototype.invalidate=function(O){if(!this._bDateRangeChanged&&(!O||!(O instanceof sap.ui.unified.DateRange))){C.prototype.invalidate.apply(this,arguments);}else if(this.getDomRef()&&!this._sInvalidateMonth){if(this._bInvalidateSync){o.call(this);}else{this._sInvalidateMonth=q.sap.delayedCall(0,this,o,[this]);}}};M.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var r=this.removeAllAggregation("selectedDates");return r;};M.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("selectedDates");return i;};M.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var r=this.removeAllAggregation("specialDates");return r;};M.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("specialDates");return i;};M.prototype.setDate=function(i){e.call(this,i,false);return this;};M.prototype._setDate=function(i){var p=a._createLocalDate(i);this.setProperty("date",p,true);this._oUTCDate=i;};M.prototype._getDate=function(){if(!this._oUTCDate){this._oUTCDate=a._createUniversalUTCDate(new Date(),this.getPrimaryCalendarType());}return this._oUTCDate;};M.prototype.displayDate=function(i){e.call(this,i,true);return this;};M.prototype.setPrimaryCalendarType=function(s){this.setProperty("primaryCalendarType",s);this._oFormatLong=sap.ui.core.format.DateFormat.getInstance({style:"long",calendarType:s});if(this._oUTCDate){this._oUTCDate=U.getInstance(this._oUTCDate.getJSDate(),s);}return this;};M.prototype._newUniversalDate=function(i){var J;if((i instanceof U)){J=new Date(i.getJSDate().getTime());}else{J=new Date(i.getTime());}return U.getInstance(J,this.getPrimaryCalendarType());};M.prototype.setSecondaryCalendarType=function(s){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",s);this.invalidate();this._oFormatSecondaryLong=sap.ui.core.format.DateFormat.getInstance({style:"long",calendarType:s});return this;};M.prototype._getSecondaryCalendarType=function(){var s;if(this._bSecondaryCalendarTypeSet){s=this.getSecondaryCalendarType();var p=this.getPrimaryCalendarType();if(s==p){s=undefined;}}return s;};M.prototype._getLocale=function(){var p=this.getParent();if(p&&p.getLocale){return p.getLocale();}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};M.prototype._getLocaleData=function(){var p=this.getParent();if(p&&p._getLocaleData){return p._getLocaleData();}else if(!this._oLocaleData){var s=this._getLocale();var i=new sap.ui.core.Locale(s);this._oLocaleData=L.getInstance(i);}return this._oLocaleData;};M.prototype._getFormatLong=function(){var s=this._getLocale();if(this._oFormatLong.oLocale.toString()!=s){var i=new sap.ui.core.Locale(s);this._oFormatLong=sap.ui.core.format.DateFormat.getInstance({style:"long",calendarType:this.getPrimaryCalendarType()},i);if(this._oFormatSecondaryLong){this._oFormatSecondaryLong=sap.ui.core.format.DateFormat.getInstance({style:"long",calendarType:this._getSecondaryCalendarType()},i);}}return this._oFormatLong;};M.prototype.getIntervalSelection=function(){var p=this.getParent();if(p&&p.getIntervalSelection){return p.getIntervalSelection();}else{return this.getProperty("intervalSelection");}};M.prototype.getSingleSelection=function(){var p=this.getParent();if(p&&p.getSingleSelection){return p.getSingleSelection();}else{return this.getProperty("singleSelection");}};M.prototype.getSelectedDates=function(){var p=this.getParent();if(p&&p.getSelectedDates){return p.getSelectedDates();}else{return this.getAggregation("selectedDates",[]);}};M.prototype.getSpecialDates=function(){var p=this.getParent();if(p&&p.getSpecialDates){return p.getSpecialDates();}else{return this.getAggregation("specialDates",[]);}};M.prototype._getShowHeader=function(){var p=this.getParent();if(p&&p._getShowMonthHeader){return p._getShowMonthHeader();}else{return this.getProperty("showHeader");}};M.prototype.getAriaLabelledBy=function(){var p=this.getParent();if(p&&p.getAriaLabelledBy){return p.getAriaLabelledBy();}else{return this.getAssociation("ariaLabelledBy",[]);}};M.prototype._getFirstDayOfWeek=function(){var p=this.getParent();var F=0;if(p&&p.getFirstDayOfWeek){F=p.getFirstDayOfWeek();}else{F=this.getProperty("firstDayOfWeek");}if(F<0||F>6){var i=this._getLocaleData();F=i.getFirstDayOfWeek();}return F;};M.prototype._getNonWorkingDays=function(){var p=this.getParent();var N;if(p&&p.getNonWorkingDays){N=p.getNonWorkingDays();}else{N=this.getProperty("nonWorkingDays");}if(N&&!q.isArray(N)){N=[];}return N;};M.prototype._checkDateSelected=function(p){if(!(p instanceof U)){throw new Error("Date must be a UniversalDate object "+this);}var s=0;var S=this.getSelectedDates();var t=p.getTime();for(var i=0;i<S.length;i++){var r=this.getPrimaryCalendarType();var R=S[i];var u=R.getStartDate();var v=0;if(u){u=a._createUniversalUTCDate(u,r);v=u.getTime();}var E=R.getEndDate();var w=0;if(E){E=a._createUniversalUTCDate(E,r);w=E.getTime();}if(t==v&&!E){s=1;break;}else if(t==v&&E){s=2;if(E&&t==w){s=5;}break;}else if(E&&t==w){s=3;break;}else if(E&&t>v&&t<w){s=4;break;}if(this.getSingleSelection()){break;}}return s;};M.prototype._getDateType=function(p){if(!(p instanceof U)){throw new Error("Date must be a UniversalDate object "+this);}var t;var s=this.getSpecialDates();var T=p.getTime();for(var i=0;i<s.length;i++){var r=this.getPrimaryCalendarType();var R=s[i];var S=R.getStartDate();var u=0;if(S){S=a._createUniversalUTCDate(S,r);u=S.getTime();}var E=R.getEndDate();var v=0;if(E){E=a._createUniversalUTCDate(E,r);v=E.getTime();}if((T==u&&!E)||(T>=u&&T<=v)){t={type:R.getType(),tooltip:R.getTooltip_AsString()};break;}}return t;};M.prototype._handleMouseMove=function(E){if(!this.$().is(":visible")){this._unbindMousemove(true);}var t=q(E.target);if(t.hasClass("sapUiCalItemText")){t=t.parent();}if(this._sLastTargetId&&this._sLastTargetId==t.attr("id")){return;}this._sLastTargetId=t.attr("id");if(t.hasClass("sapUiCalItem")){var O=this._getDate();if(!q.sap.containsOrEquals(this.getDomRef(),E.target)){var s=this.getSelectedDates();if(s.length>0&&this.getSingleSelection()){var S=s[0].getStartDate();if(S){S=a._createUniversalUTCDate(S,this.getPrimaryCalendarType());}var i=this._newUniversalDate(this._oFormatYyyymmdd.parse(t.attr("data-sap-day"),true));if(i.getTime()>=S.getTime()){j.call(this,S,i);}else{j.call(this,i,S);}}}else{var F=this._newUniversalDate(this._oFormatYyyymmdd.parse(t.attr("data-sap-day"),true));if(F.getTime()!=O.getTime()){if(t.hasClass("sapUiCalItemOtherMonth")){this.fireFocus({date:a._createLocalDate(F),otherMonth:true});}else{this._setDate(F);h.call(this,F,true);this._bMoveChange=true;}}}}};M.prototype.onmouseup=function(E){if(this._bMouseMove){this._unbindMousemove(true);var F=this._getDate();var p=this._oItemNavigation.getItemDomRefs();for(var i=0;i<p.length;i++){var $=q(p[i]);if(!$.hasClass("sapUiCalItemOtherMonth")){if($.attr("data-sap-day")==this._oFormatYyyymmdd.format(F.getJSDate(),true)){$.focus();break;}}}if(this._bMoveChange){var t=q(E.target);if(t.hasClass("sapUiCalItemNum")){t=t.parent();}if(t.hasClass("sapUiCalItem")){F=this._newUniversalDate(this._oFormatYyyymmdd.parse(t.attr("data-sap-day"),true));}h.call(this,F);this._bMoveChange=false;this._bMousedownChange=false;m.call(this);}}if(this._bMousedownChange){this._bMousedownChange=false;m.call(this);}};M.prototype.onsapselect=function(E){h.call(this,this._getDate());m.call(this);E.stopPropagation();E.preventDefault();};M.prototype.onsapselectmodifiers=function(E){this.onsapselect(E);};M.prototype.onsappageupmodifiers=function(E){var F=this._newUniversalDate(this._getDate());var y=F.getUTCFullYear();if(E.metaKey||E.ctrlKey){F.setUTCFullYear(y-10);}else{F.setUTCFullYear(y-1);}this.fireFocus({date:a._createLocalDate(F),otherMonth:true});E.preventDefault();};M.prototype.onsappagedownmodifiers=function(E){var F=this._newUniversalDate(this._getDate());var y=F.getUTCFullYear();if(E.metaKey||E.ctrlKey){F.setUTCFullYear(y+10);}else{F.setUTCFullYear(y+1);}this.fireFocus({date:a._createLocalDate(F),otherMonth:true});E.preventDefault();};M.prototype._updateSelection=function(){var s=this.getSelectedDates();if(s.length>0&&this.getSingleSelection()){var i=this.getPrimaryCalendarType();var S=s[0].getStartDate();if(S){S=a._createUniversalUTCDate(S,i);}var E=s[0].getEndDate();if(E){E=a._createUniversalUTCDate(E,i);}j.call(this,S,E);}};M.prototype._bindMousemove=function(F){q(window.document).bind('mousemove',this._mouseMoveProxy);this._bMouseMove=true;if(F){this.fireEvent("_bindMousemove");}};M.prototype._unbindMousemove=function(F){q(window.document).unbind('mousemove',this._mouseMoveProxy);this._bMouseMove=undefined;this._sLastTargetId=undefined;if(F){this.fireEvent("_unbindMousemove");}};M.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return;}this._bNamesLengthChecked=undefined;this._bLongWeekDays=undefined;var w=this.$().find(".sapUiCalWH");var p=this._getLocaleData();var s=this._getFirstWeekDay();var r=p.getDaysStandAlone("abbreviated",this.getPrimaryCalendarType());for(var i=0;i<w.length;i++){var W=w[i];q(W).text(r[(i+s)%7]);}n.call(this);};M.prototype._handleBorderReached=function(i){var E=i.getParameter("event");var p=0;var O=this._getDate();var F=this._newUniversalDate(O);if(E.type){switch(E.type){case"sapnext":case"sapnextmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_DOWN){F.setUTCDate(F.getUTCDate()+7);}else{F.setUTCDate(F.getUTCDate()+1);}break;case"sapprevious":case"sappreviousmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_UP){F.setUTCDate(F.getUTCDate()-7);}else{F.setUTCDate(F.getUTCDate()-1);}break;case"sappagedown":p=F.getUTCMonth()+1;F.setUTCMonth(p);if(p%12!=F.getUTCMonth()){while(p!=F.getUTCMonth()){F.setUTCDate(F.getUTCDate()-1);}}break;case"sappageup":p=F.getUTCMonth()-1;F.setUTCMonth(p);if(p<0){p=11;}if(p!=F.getUTCMonth()){while(p!=F.getUTCMonth()){F.setUTCDate(F.getUTCDate()-1);}}break;default:break;}this.fireFocus({date:a._createLocalDate(F),otherMonth:true});}};M.prototype.checkDateFocusable=function(i){if(!(i instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}var p=this._getDate();var u=a._createUniversalUTCDate(i,this.getPrimaryCalendarType());if(u.getUTCFullYear()==p.getUTCFullYear()&&u.getUTCMonth()==p.getUTCMonth()){return true;}else{return false;}};M.prototype._renderHeader=function(){if(this._getShowHeader()){var i=this._getDate();var p=this._getLocaleData();var r=p.getMonthsStandAlone("wide",this.getPrimaryCalendarType());this.$("Head").text(r[i.getUTCMonth()]);}};M.prototype._getFirstWeekDay=function(){return this._getFirstDayOfWeek();};function _(){var p=this._getDate();var y=this._oFormatYyyymmdd.format(p.getJSDate(),true);var r=0;var R=this.$("days").get(0);var s=this.$("days").find(".sapUiCalItem");for(var i=0;i<s.length;i++){var $=q(s[i]);if($.attr("data-sap-day")===y){r=i;break;}}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,b,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,c,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,this._handleBorderReached,this);this.addDelegate(this._oItemNavigation);if(this._iColumns>1){this._oItemNavigation.setHomeEndColumnMode(true,true);}this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(this._iColumns,true);}this._oItemNavigation.setRootDomRef(R);this._oItemNavigation.setItemDomRefs(s);this._oItemNavigation.setFocusedIndex(r);this._oItemNavigation.setPageSize(s.length);}function b(p){var r=p.getParameter("index");var E=p.getParameter("event");if(!E){return;}var O=this._getDate();var F=this._newUniversalDate(O);var s=false;var t=true;var u=this._oItemNavigation.getItemDomRefs();var i=0;var $=q(u[r]);var v;if($.hasClass("sapUiCalItemOtherMonth")){if(E.type=="saphomemodifiers"&&(E.metaKey||E.ctrlKey)){F.setUTCDate(1);f.call(this,F);}else if(E.type=="sapendmodifiers"&&(E.metaKey||E.ctrlKey)){for(i=u.length-1;i>0;i--){v=q(u[i]);if(!v.hasClass("sapUiCalItemOtherMonth")){F=this._newUniversalDate(this._oFormatYyyymmdd.parse(v.attr("data-sap-day"),true));break;}}f.call(this,F);}else{s=true;F=this._newUniversalDate(this._oFormatYyyymmdd.parse($.attr("data-sap-day"),true));if(!F){F=this._newUniversalDate(O);}f.call(this,O);if(E.type=="mousedown"||(this._sTouchstartYyyyMMdd&&E.type=="focusin"&&this._sTouchstartYyyyMMdd==$.attr("data-sap-day"))){t=false;this.fireFocus({date:a._createLocalDate(O),otherMonth:false,restoreOldDate:true});}if(E.originalEvent&&E.originalEvent.type=="touchstart"){this._sTouchstartYyyyMMdd=$.attr("data-sap-day");}else{this._sTouchstartYyyyMMdd=undefined;}}}else{if(q(E.target).hasClass("sapUiCalWeekNum")){f.call(this,F);}else{F=this._newUniversalDate(this._oFormatYyyymmdd.parse($.attr("data-sap-day"),true));this._setDate(F);}this._sTouchstartYyyyMMdd=undefined;}if(E.type=="mousedown"&&this.getIntervalSelection()){this._sLastTargetId=$.attr("id");}if(t){this.fireFocus({date:a._createLocalDate(F),otherMonth:s});}if(E.type=="mousedown"){d.call(this,E,F,r);}}function c(i){var p=i.getParameter("index");var E=i.getParameter("event");if(!E){return;}if(E.type=="mousedown"){var F=this._getDate();if(this.getIntervalSelection()){var r=this._oItemNavigation.getItemDomRefs();this._sLastTargetId=r[p].id;}d.call(this,E,F,p);}}function d(E,F,i){if(E.button){return;}h.call(this,F);this._bMousedownChange=true;if(this._bMouseMove){this._unbindMousemove(true);this._bMoveChange=false;}else if(this.getIntervalSelection()&&this.$().is(":visible")){this._bindMousemove(true);}E.preventDefault();E.setMark("cancelAutoClose");}function e(i,N){if(!(i instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}var y=i.getFullYear();if(y<1||y>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}var F=true;if(!q.sap.equal(this.getDate(),i)){var u=a._createUniversalUTCDate(i,this.getPrimaryCalendarType());F=this.checkDateFocusable(i);this.setProperty("date",i,true);this._oUTCDate=u;}if(this.getDomRef()){if(F){f.call(this,this._oUTCDate,true,N);}else{g.call(this,N);}}}function f(p,N,r){if(!N){this.setDate(a._createLocalDate(new Date(p.getTime())));}var y=this._oFormatYyyymmdd.format(p.getJSDate(),true);var s=this._oItemNavigation.getItemDomRefs();var $;for(var i=0;i<s.length;i++){$=q(s[i]);if($.attr("data-sap-day")==y){if(document.activeElement!=s[i]){if(r){this._oItemNavigation.setFocusedIndex(i);}else{this._oItemNavigation.focusItem(i);}}break;}}}function g(N){var p=this.getRenderer().getStartDate(this);var $=this.$("days");var r;var s;var i=0;var t=0;if(this._sLastTargetId){r=this._oItemNavigation.getItemDomRefs();for(i=0;i<r.length;i++){s=q(r[i]);if(s.attr("id")==this._sLastTargetId){t=i;break;}}}if($.length>0){var R=sap.ui.getCore().createRenderManager();this.getRenderer().renderDays(R,this,p);R.flush($[0]);R.destroy();}this._renderHeader();this.fireEvent("_renderMonth",{days:$.find(".sapUiCalItem").length});_.call(this);if(!N){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());}if(this._sLastTargetId){r=this._oItemNavigation.getItemDomRefs();if(t<=r.length-1){s=q(r[t]);this._sLastTargetId=s.attr("id");}}}function h(p,r){var s=this.getSelectedDates();var t;var u=this._oItemNavigation.getItemDomRefs();var $;var y;var i=0;var P=this.getParent();var A=this;var S;var v=this.getPrimaryCalendarType();if(P&&P.getSelectedDates){A=P;}if(this.getSingleSelection()){if(s.length>0){t=s[0];S=t.getStartDate();if(S){S=a._createUniversalUTCDate(S,v);}}else{t=new sap.ui.unified.DateRange();A.addAggregation("selectedDates",t,true);}if(this.getIntervalSelection()&&(!t.getEndDate()||r)&&S){var E;if(p.getTime()<S.getTime()){E=S;S=p;if(!r){t.setProperty("startDate",a._createLocalDate(new Date(S.getTime())),true);t.setProperty("endDate",a._createLocalDate(new Date(E.getTime())),true);}}else if(p.getTime()>=S.getTime()){E=p;if(!r){t.setProperty("endDate",a._createLocalDate(new Date(E.getTime())),true);}}j.call(this,S,E);}else{j.call(this,p);t.setProperty("startDate",a._createLocalDate(new Date(p.getTime())),true);t.setProperty("endDate",undefined,true);}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection");}else{var w=this._checkDateSelected(p);if(w>0){for(i=0;i<s.length;i++){S=s[i].getStartDate();if(S&&p.getTime()==a._createUniversalUTCDate(S,v).getTime()){A.removeAggregation("selectedDates",i,true);break;}}}else{t=new sap.ui.unified.DateRange({startDate:a._createLocalDate(new Date(p.getTime()))});A.addAggregation("selectedDates",t,true);}y=this._oFormatYyyymmdd.format(p.getJSDate(),true);for(i=0;i<u.length;i++){$=q(u[i]);if($.attr("data-sap-day")==y){if(w>0){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}else{$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}}}}}}function j(s,E){var p=this._oItemNavigation.getItemDomRefs();var $;var i=0;var S=false;var r=false;if(!E){var y=this._oFormatYyyymmdd.format(s.getJSDate(),true);for(i=0;i<p.length;i++){$=q(p[i]);S=false;r=false;if($.attr("data-sap-day")==y){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");S=true;}else if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}k.call(this,$,S,r);}}else{var t;for(i=0;i<p.length;i++){$=q(p[i]);S=false;r=false;t=this._newUniversalDate(this._oFormatYyyymmdd.parse($.attr("data-sap-day"),true));if(t.getTime()==s.getTime()){$.addClass("sapUiCalItemSelStart");S=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");if(E&&t.getTime()==E.getTime()){$.addClass("sapUiCalItemSelEnd");r=true;}$.removeClass("sapUiCalItemSelBetween");}else if(E&&t.getTime()>s.getTime()&&t.getTime()<E.getTime()){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.addClass("sapUiCalItemSelBetween");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelEnd");}else if(E&&t.getTime()==E.getTime()){$.addClass("sapUiCalItemSelEnd");r=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelBetween");}else{if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}}k.call(this,$,S,r);}}}function k($,s,E){if(!this.getIntervalSelection()){return;}var p="";var r=[];var t=this.getId();var u=false;p=$.attr("aria-describedby");if(p){r=p.split(" ");}var S=-1;var v=-1;for(var i=0;i<r.length;i++){var w=r[i];if(w==(t+"-Start")){S=i;}if(w==(t+"-End")){v=i;}}if(S>=0&&!s){r.splice(S,1);u=true;if(v>S){v--;}}if(v>=0&&!E){r.splice(v,1);u=true;}if(S<0&&s){r.push(t+"-Start");u=true;}if(v<0&&E){r.push(t+"-End");u=true;}if(u){p=r.join(" ");$.attr("aria-describedby",p);}}function m(){if(this._bMouseMove){this._unbindMousemove(true);}this.fireSelect();}function n(){if(!this._bNamesLengthChecked){var w;var W=this.$().find(".sapUiCalWH");var t=false;var i=0;for(i=0;i<W.length;i++){w=W[i];if(Math.abs(w.clientWidth-w.scrollWidth)>1){t=true;break;}}if(t){this._bLongWeekDays=false;var p=this._getLocaleData();var s=this._getFirstWeekDay();var r=p.getDaysStandAlone("narrow",this.getPrimaryCalendarType());for(i=0;i<W.length;i++){w=W[i];q(w).text(r[(i+s)%7]);}}else{this._bLongWeekDays=true;}this._bNamesLengthChecked=true;}}function o(){this._sInvalidateMonth=undefined;g.call(this,this._bNoFocus);this._bDateRangeChanged=undefined;this._bNoFocus=undefined;}return M;},true);

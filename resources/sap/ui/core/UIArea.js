/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','./Element','./RenderManager','jquery.sap.act','jquery.sap.ui','jquery.sap.keycodes','jquery.sap.trace'],function(q,M,E,R){"use strict";var r=q.sap.log.getLogger("sap.ui.Rendering",((window["sap-ui-config"]&&window["sap-ui-config"]["xx-debugRendering"])||/sap-ui-xx-debug(R|-r)endering=(true|x|X)/.test(document.location.search))?q.sap.log.Level.DEBUG:Math.min(q.sap.log.Level.INFO,q.sap.log.getLevel())),d=function(c){return c;},D=q.noop,f=q.noop;if(r.isLoggable()){d=function(c){var l;try{throw new Error();}catch(e){l=e.stack||e.stacktrace||(e.sourceURL?e.sourceURL+":"+e.line:null);l=l?l.split(/\n\s*/g).slice(2):undefined;}return{obj:c,location:l};};D=function(t,c){var C=sap.ui.getCore(),m={},n,o;for(n in c){o=C.byId(n);m[n]={type:o?o.getMetadata().getName():(c[n].obj===t?"UIArea":"(no such control)"),location:c[n].location,reason:c[n].reason};}r.debug("  UIArea '"+t.getId()+"', pending updates: "+JSON.stringify(m,null,"\t"));};f=function(b,A){var n;for(n in A){if(b[n]!=null){if(b[n].obj!==A[n].obj){A[n].reason="replaced during rendering";}else{A[n].reason="invalidated again during rendering";}}else{A[n].reason="invalidated during rendering";}}};}var U=M.extend("sap.ui.core.UIArea",{constructor:function(c,o){if(arguments.length===0){return;}M.apply(this);this.oCore=c;this.bLocked=false;this.bInitial=true;this.aContentToRemove=[];this.bNeedsRerendering=false;if(o!=null){this.setRootNode(o);this.bNeedsRerendering=this.bNeedsRerendering&&!q.sap.domById(o.id+"-Init");}this.mInvalidatedControls={};if(!this.bNeedsRerendering){this.bRenderSelf=false;}else{this.oCore.addInvalidatedUIArea(this);}},metadata:{publicMethods:["setRootNode","getRootNode","setRootControl","getRootControl","lock","unlock","isLocked"],aggregations:{content:{name:"content",type:"sap.ui.core.Control",multiple:true,singularName:"content"},dependents:{name:"dependents",type:"sap.ui.core.Control",multiple:true}}}});U.prototype.isInvalidateSuppressed=function(){return this.iSuppressInvalidate>0;};U.prototype.getId=function(){return this.oRootNode?this.oRootNode.id:null;};U.prototype.getUIArea=function(){return this;};U.prototype.setRootNode=function(o){if(this.oRootNode===o){return;}if(this.oRootNode){this._ondetach();}this.oRootNode=o;if(this.getContent().length>0){this.invalidate();}if(this.oRootNode){this._onattach();}};U.prototype.getRootNode=function(){return this.oRootNode;};U.prototype.setRootControl=function(o){this.removeAllContent();this.addContent(o);};U.prototype.getRootControl=function(i){var c=this.getContent();if(c.length>0){if(i>=0&&i<c.length){return c[i];}return c[0];}return null;};U.prototype._addRemovedContent=function(o){if(this.oRootNode&&o){this.aContentToRemove.push(o);}};U.prototype.addContent=function(c,_){this.addAggregation("content",c,_);if(_!==true){this.invalidate();}return this;};U.prototype.removeContent=function(c,_){var C=this.removeAggregation("content",c,_);if(!_){var o;if(C&&C.getDomRef){o=C.getDomRef();}this._addRemovedContent(o);}return C;};U.prototype.removeAllContent=function(){var c=this.removeAllAggregation("content");for(var i=0;i<c.length;i++){var o;var C=c[i];if(C&&C.getDomRef){o=C.getDomRef();}this._addRemovedContent(o);}return c;};U.prototype.destroyContent=function(){var c=this.getContent();for(var i=0;i<c.length;i++){var o;var C=c[i];if(C&&C.getDomRef){o=C.getDomRef();}this._addRemovedContent(o);}this.destroyAggregation("content");return this;};U.prototype.lock=function(){this.bLocked=true;};U.prototype.unlock=function(){if(this.bLocked&&this.bNeedsRerendering){this.oCore.addInvalidatedUIArea(this);}this.bLocked=false;};U.prototype.isLocked=function(){return this.bLocked;};U.prototype.getBindingContext=function(){return null;};U.prototype.getEventingParent=function(){return this.oCore._getEventProvider();};U.prototype.isActive=function(){return q.sap.domById(this.getId())!=null;};U.prototype.invalidate=function(){this.addInvalidatedControl(this);};U.prototype.addInvalidatedControl=function(c){if(this.bRenderSelf){return;}if(!this.bNeedsRerendering){this.oCore.addInvalidatedUIArea(this);}var i=c.getId();if(c===this){this.bRenderSelf=true;this.bNeedsRerendering=true;this.mInvalidatedControls={};this.mInvalidatedControls[i]=d(this);return;}if(this.mInvalidatedControls[i]){return;}if(!this.bRenderSelf){this.mInvalidatedControls[i]=d(c);this.bNeedsRerendering=true;}};U.prototype.rerender=function(b){var t=this;function c(){t.bRenderSelf=false;t.aContentToRemove=[];t.mInvalidatedControls={};t.bNeedsRerendering=false;}function g(){try{return document.activeElement;}catch(v){}}if(b){this.bNeedsRerendering=true;}if(this.bLocked||!this.bNeedsRerendering){return false;}var h=this.bRenderSelf,C=this.aContentToRemove,I=this.mInvalidatedControls,u=false;c();q.sap.measure.pause("renderPendingUIUpdates");q.sap.measure.start(this.getId()+"---rerender","Rerendering of "+this.getMetadata().getName());D(this,I);if(h){if(this.oRootNode){r.debug("Full Rendering of UIArea '"+this.getId()+"'");R.preserveContent(this.oRootNode,false,this.bInitial);this.bInitial=false;var j=function(v,w){var l=v.length;var x;for(var i=0;i<l;i++){x=w?v[i].getDomRef():v[i];if(x&&!R.isPreservedContent(x)&&t.oRootNode===x.parentNode){q(x).remove();}}return l;};var F=g();var s=this.oCore.oFocusHandler.getControlFocusInfo();j(C);var k=this.getContent();var l=j(k,true);var o=g();for(var i=0;i<l;i++){if(k[i]&&k[i].getParent()===this){this.oCore.oRenderManager.render(k[i],this.oRootNode,true);}}u=true;if(F&&F!=o&&o===g()){try{this.oCore.oFocusHandler.restoreFocus(s);}catch(e){q.sap.log.warning("Problems while restoring the focus after full UIArea rendering: "+e,null,this);}}}else{r.debug("Full Rendering of UIArea '"+this.getId()+"' postponed, no root node");}}else{var m=function(v){for(;;){if(v.getMetadata&&v.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){break;}v=v.getParent();if(!v||v===t){return false;}if(I.hasOwnProperty(v.getId())){return true;}}};for(var n in I){var p=this.oCore.byId(n);if(p&&!m(p)){p.rerender();u=true;}}}f(I,this.mInvalidatedControls);q.sap.measure.end(this.getId()+"---rerender");q.sap.measure.resume("renderPendingUIUpdates");return u;};U.prototype._onControlRendered=function(c){var i=c.getId();if(this.mInvalidatedControls[i]){delete this.mInvalidatedControls[i];}};U.rerenderControl=function(c){var o=null;if(c){o=c.getDomRef();if(!o||R.isPreservedContent(o)){o=q.sap.domById(sap.ui.core.RenderPrefixes.Invisible+c.getId());}}var p=o&&o.parentNode;if(p){var u=c.getUIArea();var b=u?u.oCore.oRenderManager:sap.ui.getCore().createRenderManager();r.debug("Rerender Control '"+c.getId()+"'"+(u?"":" (using a temp. RenderManager)"));R.preserveContent(o,true,false);b.render(c,p);}else{var u=c.getUIArea();u&&u._onControlRendered(c);r.warning("Couldn't rerender '"+c.getId()+"', as its DOM location couldn't be determined");}};var a=/^(mousedown|mouseup|click|keydown|keyup|keypress|touchstart|touchend|tap)$/;U.prototype._handleEvent=function(e){var o=null,I;o=q(e.target).control(0);q.sap.act.refresh();if(o===null){return;}if(e.isMarked("delayedMouseEvent")){return;}if(e.isMarked("handledByUIArea")){e.setMark("firstUIArea",false);return;}e.setMarked("firstUIArea");e.srcControl=o;if(e.type==="contextmenu"&&e.shiftKey&&e.altKey&&!!(e.metaKey||e.ctrlKey)){q.sap.log.info("Suppressed forwarding the contextmenu event as control event because CTRL+SHIFT+ALT is pressed!");return;}this.oCore._handleControlEvent(e,this.getId());if(this.bLocked||this.oCore.isLocked()){return;}if(q.sap.interaction.getActive()){I=e.type.match(a);if(I){q.sap.interaction.notifyEventStart(e);}}var b=[];if(e.getPseudoTypes){b=e.getPseudoTypes();}b.push(e.type);var g=false;while(o&&o instanceof E&&o.isActive()&&!e.isPropagationStopped()){for(var i=0,c=b.length;i<c;i++){var t=b[i];e.type=t;e.currentTarget=o.getDomRef();o._handleEvent(e);if(e.isImmediatePropagationStopped()){break;}}if(!g){g=this._handleGroupChange(e,o);}if(e.isPropagationStopped()){break;}if(o.bStopEventBubbling){break;}var h=o.getDomRef();if(!h){break;}h=h.parentNode;o=null;if(e.isMarked("fromMouseout")&&q.sap.containsOrEquals(h,e.relatedTarget)){break;}while(h&&h!==this.getRootNode()){if(h.id){o=q(h).control(0);if(o){break;}}h=h.parentNode;}}if(I){q.sap.interaction.notifyEventEnd(e);}e.currentTarget=this.getRootNode();(e.originalEvent||e)._sapui_handledByUIArea=true;if(e.isPropagationStopped()){q.sap.log.debug("'"+e.type+"' propagation has been stopped");}var n=e.type;if(n!="mousemove"&&n!="mouseover"&&n!="scroll"&&n!="mouseout"){var j=q(e.target).control(0);if(j){q.sap.log.debug("Event fired: '"+e.type+"' on "+j,"","sap.ui.core.UIArea");}else{q.sap.log.debug("Event fired: '"+e.type+"'","","sap.ui.core.UIArea");}}};U.prototype._onattach=function(){var o=this.getRootNode();if(o==null){return;}q(o).attr("data-sap-ui-area",o.id).bind(q.sap.ControlEvents.join(" "),q.proxy(this._handleEvent,this));};U.prototype._ondetach=function(){var o=this.getRootNode();if(o==null){return;}q(o).removeAttr("data-sap-ui-area").unbind();};U.prototype.clone=function(){throw new Error("UIArea can't be cloned");};U.prototype._handleGroupChange=function(e,o){var k=U._oFieldGroupValidationKey;if(e.type==="focusin"){if(U._iFieldGroupDelayTimer){q.sap.clearDelayedCall(U._iFieldGroupDelayTimer);U._iFieldGroupDelayTimer=null;}U._iFieldGroupDelayTimer=q.sap.delayedCall(0,this,this.setFieldGroupControl,[o]);return true;}else if(this.getFieldGroupControl()&&e.type==="keyup"&&e.keyCode===k.keyCode&&e.shiftKey===k.shiftKey&&e.altKey===k.altKey&&e.ctrlKey===k.ctrlKey){if(U._iFieldGroupTriggerDelay){q.sap.clearDelayedCall(U._iFieldGroupTriggerDelay);}var c=this.getFieldGroupControl(),C=(c?c._getFieldGroupIds():[]);if(C.length>0){c.triggerValidateFieldGroup(C);}return true;}return false;};U.prototype.setFieldGroupControl=function(e){function b(e,h){var p=e.getParent();if(p){if(h(p)){return p;}else{return b(p,h);}}return null;}var c=this.getFieldGroupControl();if(e!=c){var C=null;if(e instanceof sap.ui.core.Control){C=e;}else{C=b(e,function(e){return e instanceof sap.ui.core.Control;});}var g=(c?c._getFieldGroupIds():[]),n=(C?C._getFieldGroupIds():[]),t=[];for(var i=0;i<g.length;i++){var s=g[i];if(n.indexOf(s)===-1){t.push(s);}}if(t.length>0){c.triggerValidateFieldGroup(t);}U._oFieldGroupControl=C;}return this;};U.prototype.getFieldGroupControl=function(){if(U._oFieldGroupControl&&!U._oFieldGroupControl.bIsDestroyed){return U._oFieldGroupControl;}return null;};U._oFieldGroupControl=null;U._iFieldGroupDelayTimer=null;U._oFieldGroupValidationKey={keyCode:q.sap.KeyCodes.ENTER,shiftKey:false,altKey:false,ctrlKey:false};U._oRenderLog=r;return U;});

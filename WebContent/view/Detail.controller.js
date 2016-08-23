jQuery.sap.require("lego.ui5.demo.Utils.UIHelper");
sap.ui.controller("lego.ui5.demo.view.Detail", {
	onInit: function(){
		lego.ui5.demo.Utils.UIHelper.setView2(this);
	}
});
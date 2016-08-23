sap.ui.controller("lego.ui5.demo.view.Master", {
   onInit: function() {
   		var modelURL = "http://<host>:<port>/<service_end_point>/Airlines?$format=json";
   		var omodel = new sap.ui.model.json.JSONModel(sUrl);
		this.getView().byId('masterList').setModel(omodel);
   },   
   onItemPress: function(oEvent){
		// To get the selected Airline ID
		var oItemSelect = oEvent.getParameter("listItem");
		var Context = oItemSelect.getBindingContext();
		var carrid = Context.getProperty("Carrid");
			
		// Get the Flights from the selected Airline, and set the model to the details page
		var sUrl = "http://<host>:<port>/<service_end_point>/Airlines(" + carrid + ")/ToFlights?$format=json";
		var omodel = new sap.ui.model.json.JSONModel(sUrl);
		sap.ui.getCore().byId("detailList").setModel(omodel);
   }
});
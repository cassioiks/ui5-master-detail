sap.ui.require("lego.ui5.demo.Utils.UIHelper");
sap.ui.controller("lego.ui5.demo.view.Master", {
   serviceEndPoint : "/model",
   onInit: function() {
   		var modelURL = this.serviceEndPoint;
   		var omodel = new sap.ui.model.odata.v2.ODataModel(modelURL);
		this.getView().setModel(omodel);
   },   
   onItemPress: function(oEvent){
		// To get the selected Airline ID
		var oItemSelect = oEvent.getParameter("listItem");
		var Context = oItemSelect.getBindingContext();
		// var carrid = Context.getProperty("Carrid");
		
		var view2 = lego.ui5.demo.Utils.UIHelper.getView2().getView();	
		var detailTable = view2.byId("detailsTable");

		var oTemplate = new sap.m.ColumnListItem(  
		  {cells: [   
		          new sap.m.Text({text : "{Carrid}"}),  
		          new sap.m.Text({text : "{Connid}"}),
		          new sap.m.Text({text : "{Fldate}"}),
		          new sap.m.ObjectNumber({number : "{Price}", unit:"{Currency}"})
		          ]  
		  });   

		// var modelURL = this.serviceEndPoint+Context.sPath+"/ToFlights?$format=json";
		// var omodel = new sap.ui.model.json.JSONModel(modelURL);
		// omodel.attachRequestCompleted(function(oEvent){
		// 	var model = oEvent.getSource();
		// 	// view2.setModel('Flights',omodel);
		// 	// view2.byId("detailsTable").setModel(model);
		// });

		var model = this.getView().getModel();
		
		// view2.setBindingContext(Context);
		// view2.byId("detailsTable").setBindingContext(Context);

		var that = this;
		model.createBindingContext(Context.sPath,Context,{expand:'ToFlights'},function(context){
			that.getView().setModel(context.oModel);
			detailTable.bindItems("/AirlineSet/ToFlights",oTemplate);
		});

		
		// var omodel = this.getView().getModel();

		// view2.bindElement(oEvent.getParameter("listItem").getBindingContextPath(),{expand:'ToFlights'});


		// omodel.read(Context.sPath,{success: function(oData,response){
		// 	view2.byId("detailsTable").setModel(oData);
		// 	alert('asdasd');
		// 		}
		// });
		// Get the Flights from the selected Airline, and set the model to the details page
		// var modelURL = this.serviceEndPoint+Context+"/ToFlights?$format=json";
		// var omodel = new sap.ui.model.odata.v2.ODataModel(modelURL);
		// var omodel = new sap.ui.model.json.JSONModel(modelURL);
		// omodel.attachRequestCompleted(function(oEvent){
		// 	var model = oEvent.getSource();
		// 	// view2.setModel('Flights',omodel);
		// 	// view2.byId("detailsTable").setModel(model);
		// });
		
		// view2.setModel('Flights',omodel);
		// view2.byId("detailsTable").setModel(omodel);
		// view2.byId("detailsTable").bindData(omodel);
   }
});
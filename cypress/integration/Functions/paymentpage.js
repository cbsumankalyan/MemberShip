import paymentselector from '../Locators/PaymentpagePOM'
import payment from "../../fixtures/payment.json";

var paymentpage = {

	payment : function({name}) {
		const aliasTitle =`${name}`;
		// cy.wait(20000)
		function ccname() {
  			var text = "";
  			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  			for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}

		cy.get(paymentselector.ccname).focus().type(payment.standard.billingName).blur();
		cy.get(paymentselector.ccnumber).focus().type(payment.standard.num).blur();
		cy.get(paymentselector.creditcardmonth).focus().select(payment.standard.expDate.month).blur();
		cy.get(paymentselector.creditcardyear).focus().select(payment.standard.expDate.year).blur();
		cy.get(paymentselector.cvv).focus().type(payment.standard.cvv).blur();

		if(name == "US"){
			cy.get(paymentselector.Billingaddress1).focus().type(payment.US.address1).blur();
			cy.get(paymentselector.Billingaddress1postalcode).focus().type(payment.US.postalcode).blur();
			cy.get(paymentselector.Billingaddress1city).focus().type(payment.US.city).blur();
			cy.get(paymentselector.Billingaddress1state).select(payment.US.state).blur();
		}

		cy.get(paymentselector.Sameasbilling).then(() =>{
			cy.get(paymentselector.Sameasbilling)
			.should('be.checked')
			.click()
			.should('not.be.checked')
			.get(paymentselector.shippaddress1).should('be.visible')
			.get(paymentselector.shippaddress2).should('be.visible')
			.get(paymentselector.shipppostalcode).should('be.visible')
			.get(paymentselector.shippcity).should('be.visible')
			.get(paymentselector.shippstate).should('be.visible')
		})
		
	},

	shippingmethod : function({name}) {
		const aliasTitle =`${name}`;

		if(name == "US"){
			cy.get(paymentselector.Shippingmethods).then(($lis) => {
				expect($lis).to.have.length(4)
			})
			cy.get(paymentselector.Shippingmethods).check(['Economy', '3Days', '2Days', 'NextDay'])
		}

		cy.wait(10000)
		cy.server().route("/v5-test/addresses**").as("addressValidate")
		cy.get(paymentselector.Paymentcontinue)
		.click()
		.then(() => {
			if(name == "US"){
				cy.wait("@addressValidate").then(data => {
	                expect(data.status).to.equal(200);
	                expect(data.response.body.items).to.be.an("array");
	                expect(data.response.body.items[0].address1).to.be.a("string");
	                expect(data.response.body.items[0].city).to.be.a("string");
	                expect(data.response.body.items[0].state).to.be.a("string");
	                expect(data.response.body.items[0].zip4).to.be.a("string");
	                expect(data.response.body.items[0].zip5).to.be.a("string");
	            });
	        }    
		});
		// cy.route('POST', '/v5-test/orderterms.js').as('suman');
		cy.get(paymentselector.Usethisaddress).click()
		// cy.wait('@suman')
		// cy.get('@suman').then(function (xhr) {
  //       expect(xhr.status).to.eq(200)
  //       console.log("1", xhr.requestBody)
  //       console.log("2", xhr.responseBody)
  //       expect(xhr.method).to.eq('POST')
  //     })
	}
};
export default paymentpage
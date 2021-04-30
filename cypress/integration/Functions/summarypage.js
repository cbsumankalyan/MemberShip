import summaryselector from '../Locators/SummarypagePOM'
import packsselector from '../Locators/PackspagePOM'
import summary from "../../fixtures/summary.json";

var summarypage = {

	acceptterms : function() {
		cy.wait(20000)
		cy.get(summaryselector.termsconditions).then(($lis) => {
			expect($lis).to.have.length(2)
		})

		var enrollementsettings = [];
		var refferal = [];
		var packs = [];
		var itemcode = [];
		var orderprice = [];
		var orderpv = [];
		var accountsetup = [];
		var address = [];
		var shippingmethod =[];

		cy.get(summaryselector.enrollsettings)
			.each(($div) => {
			enrollementsettings.push($div.text());
		})

		cy.get(summaryselector.packs)
			.each(($div) => {
			packs.push($div.text());
		})

		cy.get(summaryselector.pv)
			.each(($div) => {
			orderpv.push(parseInt($div.text().split(":")[1]));
		})

		cy.get(summaryselector.price)
			.each(($div) => {
			orderprice.push(parseFloat($div.text().replace("$", "").split("|")[0]));
		})	

		cy.get(summaryselector.pv)
			.each(($div) => {
			itemcode.push(parseInt($div.text().replace("#", "").split("|")[0]));
		})

		cy.get(summaryselector.account)
			.each(($div) => {
			accountsetup.push($div.text().split(": ")[1]);
		})		

		cy.get(summaryselector.cart).click();
		cy.get(summaryselector.enroller).then(($el) => {
			const enr = ($el.text().split(": ")[1])
			refferal.push(enr);
		})

		cy.get(summaryselector.sponsor).then(($el) => {
			const enr = ($el.text().split(": ")[1])
			refferal.push(enr);
		})

		cy.get(packsselector.cartsummary).click({force: true});

		cy.get(summaryselector.billaddress)
			.each(($div) => {
			address.push($div.text().split(", "))
		})

		cy.get(summaryselector.shipping)
			.each(($div) => {
			shippingmethod.push($div.text())
		})	
		
		cy.get(summaryselector.shipaddress)
			.each(($div) => {
			address.push($div.text().split(", "))
		})
		
		cy.get(packsselector.price)
			.then(($span) => {
			orderprice.pop()
			expect('$'.concat(parseFloat($span.text().replace("$", "")))).to.eq('$'.concat(orderprice.reduce((a, b) => a + b, 0)));
		})

		cy.get(packsselector.pv)
			.then(($span) => {
			orderpv.pop()
			expect(parseInt($span.text().split(":")[1])).to.eq(orderpv.reduce((a, b) => a + b, 0));
		})

		cy.get(summaryselector.terms).click()
		cy.get(summaryselector.payment).click()
		cy.server().route('POST', '/v5-test/orders.js').as('suman');
		cy.get(summaryselector.summarycontinue).click()
		
		cy.wait('@suman')
		cy.get('@suman').then(function (xhr) {
			expect(xhr.status).to.eq(200)
			console.log("4", xhr.responseBody)
			const post = xhr.requestBody.customer
			const referral = "https://hydra.unicity.net/v5-test/customers?id.unicity="
			const item ="https://hydra.unicity.net/v5-test/items?id.unicity="

	        /* customer main adrress is shipping address
	         * the same we need to pass 
	         */
			expect(post.mainAddress.address1).to.eq(address[1][0])
			expect(post.mainAddress.city).to.eq((address[1][1]))
			expect(post.mainAddress.state).to.eq((address[1][2]))
			expect(post.mainAddress.zip).to.eq((address[1][3]))
			expect(post.mainAddress.country).to.eq((address[1][4]))

			/* first name & last name */
			expect(post.humanName.firstName).to.eq(accountsetup[1])
			expect(post.humanName.lastName).to.eq(accountsetup[7])

			/* email, preffered locale & password */
			expect(post.email).to.eq(accountsetup[9])
			expect(post.password.value).to.eq("unicity")

			/* martial status, gender & type */
			expect(post.gender).to.eq(accountsetup[3].toLowerCase())
			expect(post.maritalStatus).to.eq(accountsetup[10])
			expect(post.type).to.eq("Associate")

			/* creditcardaliases*/
			expect(post.creditcardaliases[0].billToName.firstName).to.eq(accountsetup[1])
			expect(post.creditcardaliases[0].billToName.lastName).to.eq(accountsetup[7])
			expect(post.creditcardaliases[0].billToAddress.address1).to.eq(address[0][0])
			expect(post.creditcardaliases[0].billToAddress.city).to.eq(address[0][1])
			expect(post.creditcardaliases[0].billToAddress.state).to.eq(address[0][2])
			expect(post.creditcardaliases[0].billToAddress.zip).to.eq(address[0][3])
			expect(post.creditcardaliases[0].billToAddress.country).to.eq(address[0][4])

			/* phone , birthdate & rights */
			var dob = new Date(accountsetup[2]),
	        month = '' + (dob.getMonth() + 1),
	        day = '' + dob.getDate(),
	        year = dob.getFullYear(),
	        format = [year, month, day].join('-')
			expect(post.homePhone).to.eq(accountsetup[8])
			// expect(post.birthDate).to.eq(format)
			expect(post.rights[0].holder).to.eq("Unicity")
			expect(post.rights[0].type).to.eq("SendEmails")

			/* signature */

			/* taxid */

			/* sponsor & enroller */
			expect(post.sponsor.href).to.eq(referral+refferal[1])
			expect(post.enroller.href).to.eq(referral+refferal[0])

			/* item codes & quantity*/
			itemcode.pop()
			var count = Cypress.$(itemcode).length
	        for(let i=0; i<count; i++){
	        	expect(xhr.requestBody.lines.items[i].item.href).to.eq(item+itemcode[i])
	        	expect(xhr.requestBody.lines.items[i].quantity).to.eq(1)
	        }

	        /* ship to name */
			expect(xhr.requestBody.shipToName.firstName).to.eq(accountsetup[1])
			expect(xhr.requestBody.shipToName.lastName).to.eq(accountsetup[7])

			/* shipToPhone */
			expect(xhr.requestBody.shipToPhone).to.eq(accountsetup[8])

			/* shipToEmail */
			expect(xhr.requestBody.shipToEmail).to.eq(accountsetup[9])

			/* shipToAddress*/
			expect(xhr.requestBody.shipToAddress.city).to.eq(address[1][1])
			expect(xhr.requestBody.shipToAddress.country).to.eq(address[1][4])	
			expect(xhr.requestBody.shipToAddress.state).to.eq(address[1][2])
			expect(xhr.requestBody.shipToAddress.address1).to.eq(address[1][0])
			expect(xhr.requestBody.shipToAddress.zip).to.eq(address[1][3])

			/* shippingMethod 
			expect(xhr.requestBody.shippingMethod.href).to.eq("https://hydra.unicity.net/v5-test/shippingmethods?type="+shippingmethod[0])*/

			/* transactions */
			expect(xhr.requestBody.transactions.items[0].amount).to.eq('this.terms.total')
			expect(xhr.requestBody.transactions.items[0].type).to.eq('AuthorizeAndCapture')
			expect(xhr.requestBody.transactions.items[0].method).to.eq('CreditCard')
			expect(xhr.requestBody.transactions.items[0].billToAddress.address1).to.eq(address[0][0])
			expect(xhr.requestBody.transactions.items[0].billToAddress.city).to.eq(address[0][1])
			expect(xhr.requestBody.transactions.items[0].billToAddress.state).to.eq(address[0][2])
			expect(xhr.requestBody.transactions.items[0].billToAddress.zip).to.eq(address[0][3])
			expect(xhr.requestBody.transactions.items[0].billToAddress.country).to.eq(address[0][4])

			expect(xhr.requestBody.transactions.items[1].type).to.eq('AuthorizeAndCapture')
			expect(xhr.requestBody.transactions.items[1].method).to.eq('Coupon')
			expect(xhr.requestBody.transactions.items[1].methodDetails.code).to.eq('Fre3Aut0Sh!p')
      		
      		cy.wait(20000)
			cy.get(summaryselector.orderpopup).should('be.visible')
			.then(()=>{
				
				cy.get(summaryselector.sucessmessage)
					.then(($div) => {
					expect(summary.successmessage).to.eq($div.text())
				})
				cy.get(summaryselector.ordernumber)
					.then(($div) => {
					expect(xhr.responseBody.data.id.unicity).to.eq($div.text().split(":")[1])
				})	
				cy.get(summaryselector.distributorid)
					.then(($div) => {
					expect(xhr.responseBody.data.customer.id.unicity).to.eq($div.text().split(": ")[1])
				})

				cy.get(summaryselector.finish).click()
				.window()
		        .its("location.hash")
		        .should("eq", "#/start");	
			})
      })	
	}
};

export default summarypage	
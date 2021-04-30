import accountselector from '../Locators/AccountpagePOM'
import account from "../../fixtures/account.json";
import packsselector from '../Locators/PackspagePOM'

var labels=["Sponsor ID", "First Name", "Last Name", "Email Address", "Phone", 
		"Password", "Country"
	];

var accountpage = {

	labels : function() {
		
		cy.get(accountselector.Enrollmentsettings).contains(account.enrollmentsettings)
		cy.get(accountselector.SelectLanguage).contains(account.language)
		cy.get(accountselector.Checklanguages).check(['en', 'es'])
		cy.get(accountselector.Yourenrollerid).contains(account.yourenrollerid),
		
		cy.get(accountselector.AboutYou).contains(account.aboutyou)
		cy.get(accountselector.firstname).contains(account.firstname)
		cy.get(accountselector.lastname).contains(account.lastname)
		cy.get(accountselector.birthdate).contains(account.birthdate)
		cy.get(accountselector.phone).contains(account.phone)
		cy.get(accountselector.email).contains(account.email)
		cy.get(accountselector.ssn).contains(account.ssn)
		cy.get(accountselector.gender).contains(account.gender)
		cy.get(accountselector.martialstatus).contains(account.martialstatus)
	},

	userdata : function({name}) {
		const aliasTitle =`${name}`;
		function username() {
  			var text = "";
  			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  			for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}

		function BirthDate(){
		   var startDate = new Date(1900,0,1).getTime();
		   var endDate =  new Date(2000,0,1).getTime();
		   var spaces = (endDate - startDate);
		   var timestamp = Math.round(Math.random() * spaces);
		   timestamp += startDate;
		   return new Date(timestamp);
		}

		function MMDDYYYY(date){
		    var month = BirthDate().getMonth()+1;
		    var day = BirthDate().getDate();

		    month = month < 10 ? '0' + month : month;
		    day = day < 10 ? '0' + day : day;
		    return  month +"/"+ day +"/" + String(date.getFullYear());
		}

		function Phone() {
  			var text = "";
  			var possible = "1234567890";
  			for (var i = 0; i < 11; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}

		function TaxID() {
  			var text = "";
  			var possible = "1234567890";
  			for (var i = 0; i < 9; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}

		cy.get(accountselector.noenrollersponsor).then(() =>{
			cy.get(accountselector.noenrollersponsor)
			.should('not.be.checked')
			.click()
			.should('be.checked');

			if(name == "US"){
				cy.get(accountselector.enroller).should('be.visible').type(username());	
				cy.get(accountselector.sponsor).should('be.visible').type(username());
				cy.get(accountselector.noenrollersponsor).click();
			}
		})

		cy.get(accountselector.Enroller).focus().type(account.Referral.enroller)
		cy.get(accountselector.Sponsor).focus().type(account.Referral.sponsor)

		cy.get(accountselector.FirstName).then(() =>{
			cy.get(accountselector.FirstName)
			.type(account.specialcharacter)
			.get(accountselector.ssn).click()
			.get(accountselector.Error)
			.should('be.visible')
			.get(accountselector.FirstName).clear()

			.type(account.numerics)
			.get(accountselector.ssn).click()
			.get(accountselector.Error)
			.should('be.visible')
			.get(accountselector.FirstName).clear()

			.type(username())
		});

		cy.get(accountselector.LastName).then(() => {
			cy.get(accountselector.LastName)
			.type(account.specialcharacter)
			.get(accountselector.ssn).click()
			.get(accountselector.Error)
			.should('be.visible')
			cy.get(accountselector.LastName).clear()

			.type(account.numerics)
			.get(accountselector.ssn).click()
			.get(accountselector.Error)
			.should('be.visible')
			.get(accountselector.LastName).clear()

			.type(username())
		});
		
		cy.get(accountselector.DOB).type(MMDDYYYY(BirthDate()))

		cy.get(accountselector.Phone).then(() =>{
			cy.get(accountselector.Phone)
			.type(account.specialcharacter)
			.get(accountselector.ssn).click()
			.get(accountselector.Error)
			.should('be.visible')
			.get(accountselector.Phone).clear()

			.type(account.alphabets)
			.get(accountselector.ssn).click()
			.get(accountselector.Error)
			.should('be.visible')
			.get(accountselector.Phone).clear()
			.type(Phone())
		})

		cy.get(accountselector.Email).type(username() + '@gmail.com')

		cy.get(accountselector.TaxID).then(() =>{
			cy.get(accountselector.TaxID)
			.type(account.specialcharacter)
			.get(accountselector.ssn).click()
			.get(accountselector.Error)
			.should('be.visible')
			.get(accountselector.TaxID).clear()

			.type(account.alphabets)
			.get(accountselector.ssn).click()
			.get(accountselector.Error)
			.should('be.visible')
			.get(accountselector.TaxID).clear()
			.type(TaxID())
		})

		if(name == "US"){
			cy.get(accountselector.emailcommunication)
			.should('not.be.checked')
			.click()
			.should('be.checked')
		}

		cy.get('[name="mobileNumber"]').type(Phone())

		cy.get(accountselector.Gender).then(($lis) => {
			expect($lis).to.have.length(2);
		})
		cy.get(accountselector.Gender).check(['Male', 'Female']);

		cy.get(accountselector.Martial).then(($lis) => {
			expect($lis).to.have.length(2);
		})
		cy.get(accountselector.Martial).check(['Single', 'Married']);

		cy.get(accountselector.CoApplicant).then(() => {
			cy.get(accountselector.CoApplicant)
			.type(username())
		});

		cy.get(accountselector.Password).type('unicity')
		cy.get(accountselector.Confirmpassword).type('unicity')

		cy.get(accountselector.Showpassword)
		.should('not.be.checked')
		.click()
		.should('be.checked');

		cy.server().route("/v5-test/customers.js**").as("suman")
		cy.get(accountselector.AccountContinue).click()
		.then(() => {
			cy.wait("@suman").then(xhr => {
                expect(xhr.status).to.equal(200)
                console.log("account=>",xhr)
                console.log("responsebody", xhr.body)
            });
		});

		 // cy.request({
	  //           "method": 'GET',
	  //           "url": "https://hydraqa.unicity.net/v5-test/customers.js?expand=customer,profilePicture&id.unicity=114446701",
   //      	}).then((response)=>{
   //     			console.log("account=>",response)
   //              console.log("responsebody", response.body)
   //              console.log("responsebody3", response.requestbody)
   //              console.log("responsebody4", response.responsebody)
   //              console.log("responsebody5", response.requestBody)
   //              console.log("responsebody6", response.responseBody)
   //      });
	},	

	accountfields : function() {
		cy.get(accountselector.accountsetup).contains(account.accountsetup)

		cy.get(accountselector.labels).each(($li, i, list) =>{
			expect($li.text()).to.eq(labels[i])
		})
	},

	changecountry : function() {
		cy.contains('Change').click()
		.window()
		.its("location.hash")
		.should("eq", "#/start");
		cy.wait(5000)
	},

	userfields : function() {

		var details = [];

		function username() {
  			var text = "";
  			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  			for (var i = 0; i < 6; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}

		function Phone() {
  			var text = "";
  			var possible = "1234567890";
  			for (var i = 0; i < 11; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}

		var fname = username();
		var lname = username();
		var email = username();
		var mobile = Phone();

		cy.get(accountselector.sponsor).should('be.visible').type('2')
		
		cy.get(accountselector.firstname).should('be.visible')
		.type(fname)
		.then(($div) => {
			details.push(fname)
		})
		
		cy.get(accountselector.lastname).should('be.visible')
		.type(lname)
		.then(($div) => {
			details.push(lname)
		})

		cy.get(accountselector.email).should('be.visible')
		.type(email+'@gmail.com')
		.then(($div) => {
			details.push(email+'@gmail.com')
		})

		cy.get(accountselector.phone).should('be.visible')
		.type(mobile)
		.then(($div) => {
			details.push(mobile)
		})

		cy.get(accountselector.password).should('be.visible').type('test12')
		cy.get(accountselector.countryname).should('have.value', 'United States')

		cy.get(accountselector.country).should('be.visible')
		.then(($div) => {
			expect('Country').to.eq($div.text())
		})

		cy.get(accountselector.termsandconditions).click()

		cy.get(accountselector.freemembership).should('be.visible')
		.then(($div) => {
			expect('doneFree Membership').to.eq($div.text())
		})

		cy.get(accountselector.enjoywholesalepricing).should('be.visible')
		.then(($div) => {
			expect('doneEnjoy Wholesale Pricing').to.eq($div.text())
		})

		cy.get(accountselector.earnproductcredit).should('be.visible')
		.then(($div) => {
			expect('doneEarn Product Credit').to.eq($div.text())
		})

		cy.get(accountselector.freeshippingonautorefill).should('be.visible')
		.then(($div) => {
			expect('doneFree Shipping on Auto-Refill').to.eq($div.text())
		})

		cy.get(accountselector.iagreetotheunicitymember).should('be.visible')
		.then(($div) => {
			expect('I agree to the Unicity Member Terms and Conditions').to.eq($div.text())
		})

		cy.get(accountselector.signup)
		.then(($div) => {
			expect('Sign Up').to.eq($div.text())
		})
		cy.server().route('POST', '/v5-test/customers.js').as('customer');
		cy.get(accountselector.signup).click()

		cy.wait('@customer')
		cy.get('@customer').then(function (xhr) {
			expect(xhr.status).to.eq(200)
			expect(xhr.responseBody.data.sponsor.id.unicity).to.eq(2)
			expect(xhr.responseBody.data.humanName.firstName).to.eq(details[0])
			expect(xhr.responseBody.data.humanName.lastName).to.eq(details[1])
			expect(xhr.responseBody.data.email).to.eq(details[2])
			expect(xhr.responseBody.data.homePhone).to.eq(details[3])
			expect(xhr.responseBody.data.password.value).to.eq('test12')
			expect(xhr.responseBody.data.id.unicity).length(9)
			expect(xhr.responseBody.data.mainAddress.country).to.eq('US')
		})	

	},
};

export default accountpage
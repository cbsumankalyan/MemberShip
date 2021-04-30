	import selector from '../Locators/countriesPOM'
	import lang from '../Locators/languagePOM'
	import startp from '../Locators/StartpagePOM'
	import start from "../../fixtures/start.json";
	import packsselector from '../Locators/PackspagePOM'

	var countries=["united states", "canada", "dominican republic", "germany", "switzerland", "italy", "netherlands", "france", "poland", 
		"norway", "sweden", "united kingdom", "ireland", "mexico", "colombia", "puerto rico", "australia", "austria", "denmark", "jamaica",
		"japan", "korea", "new zealand", "phillipines", "singapore", "thailand", "ukraine", "united arab emirates", "belgium", "hungary",
		"india"
	];

	var markets=["Anguilla", "Bahamas", "Barbados", "Bon Air", "Canada", 
		"Curacao", "Dominica", "Dominican Republic", "Grenada", "Guyana", 
		"Jamaica", "Trinidad And Tobago", "Turks & Caico", "United States", "Usvi"
	];

	var language=["English", "Español"];

	var market = {
		navigate : function() {
			cy.visit('/')
			cy.wait(10000)	
		},

		homepageui : function() {
			cy.get(startp.member).should('be.visible')
			.then(($div) => {
				expect(start.member).to.eq($div.text())
			})
			
			cy.get(startp.membership).should('be.visible')
			.then(($div) => {
				expect(start.memberdefnition).to.eq($div.text())
			})
		},

		countriesdropdown : function() {
			cy.get(startp.country).each(($li, i, $list) => {
			expect($li.text()).to.eq(markets[i]);
		})
		},

		selectmarket : function() {
			cy.get(startp.selectmarket).select('United States')
		},

		randomcountry : function(){
			var randomItem = markets[Math.floor(Math.random()*markets.length)];
			cy.get(startp.selectmarket).select(randomItem)
		},

		selectlanguage : function() {
			cy.get(startp.language).each(($li, i, $list) => {
				expect($li.text()).to.eq(language[i]);
			})
			cy.get(startp.selectlanguage).select('English')
		},

		signup : function() {
			cy.get(startp.signup).contains('Sign Up')
			cy.get(startp.signup).click()
		},

		loading : function() {
			cy.server()
			.route("GET", "/v5-test/countries/**").as("regions")
			.route("GET", "/v5-test/catalogs/**").as("catalogs")
			cy.wait('@catalogs')
			cy.wait('@regions')
		},

		pagetitle : function(){
			cy.title().should('eq', 'Unicity Enroll')
		},

		Countrydropdown : function(){
			cy.get(selector.countrydropdown).should('be.visible')
			cy.get(selector.countrydropdown).click()
		},

		countrylength : function(){
			expect(countries.length).to.eq(31)
		},

		countrynames : function(){
			cy.get(selector.countrynames).each(($a, i, $list) => {
				expect($a).to.contain(countries[i])
			})
		},

		defaultcountry : function(){
			cy.get(selector.defaultSelectedCountry).should(($span) => {
				const text = $span.text()
				expect(text).contain(...start.US)
			})
		},
		getHydraUrl : function(api, env){
			let baseUrl="https://hydra";
	        if (api === "LIVE" || process.env.API === "LIVE") {
	            baseUrl+="hydra";
	        }else{
	            baseUrl+="qa";
	        }
	        baseUrl+=".unicity.net/";
	        if(env === "LIVE" || process.env.ENV==="LIVE"){
	            baseUrl+="v5/"
	        }else{
	            baseUrl+="v5-test/"
	        }
	        return baseUrl;
		},

		getproductsapi : function({locale, baseUrl, name, type}){
		    const aliasTitle =`${name} ${type}`;
	           cy.request({
		            "method": 'GET',
		            "url": baseUrl + "catalogs/" + name + "%20" + type + "?expand=catalogSlides.item",
		            "headers": {
		                "Accept-Language": locale
		            }
	        	}).then((response)=>{
	            expect(response.status).to.equal(200);
	           	expect(response.isOkStatusCode).to.equal(true)
	           	expect(response.statusText).to.equal('OK')
	            expect(response).to.have.property('allRequestResponses')
	            expect(response).to.have.property('duration')
	            expect(response).to.have.property('headers')
	            expect(response).to.have.property('requestHeaders')
	            expect(response.body.alias).to.equal(aliasTitle);
	            expect(response.body.title).to.equal(aliasTitle);
	            expect(response.body.catalogSlides).to.not.be.empty;
	            expect(response.body.childCatalogs).to.not.be.empty;
	        });	
	  	},

	  	getUSregions : function({locale, baseUrl, name, type}){
	  		const aliasTitle =`${name} ${type}`;
	  		cy.request({
	            "method": 'GET',
	            "url": baseUrl + "countries/" + name + "/regions",
	            "headers": {
	                "Accept-Language": locale
	            }
	        }).then((response)=>{
	        	expect(response.status).to.equal(200);
	           	expect(response.isOkStatusCode).to.equal(true)
	           	expect(response.statusText).to.equal('OK')
	           	expect(response).to.have.property('allRequestResponses')
	           	expect(response).to.have.property('body')
	           	expect(response).to.have.property('duration')
	           	expect(response).to.have.property('headers')
	           	expect(response).to.have.property('headers')
	           	expect(response).to.have.property('requestHeaders')
	           	expect(response.body.items).to.not.be.empty;
	        });
	  	},

	  	getregions : function({locale, baseUrl, name, type}){
	  		const aliasTitle =`${name} ${type}`;
	  		    cy.request({
	            "method": 'GET',
	            "url": baseUrl + "countries.json",
	            "headers": {
	                "Accept-Language": locale
	            }
	        }).then((response)=>{
	        	expect(response.status).to.equal(200);
	           	expect(response.isOkStatusCode).to.equal(true)
	           	expect(response.statusText).to.equal('OK')
	           	expect(response).to.have.property('allRequestResponses')
	           	expect(response).to.have.property('body')
	           	expect(response).to.have.property('duration')
	           	expect(response).to.have.property('headers')
	           	expect(response).to.have.property('headers')
	           	expect(response).to.have.property('requestHeaders')
	           	expect(response.body.items).to.not.be.empty;
	        });
	  	},

		getus : function(){
			const aliasTitle =`${name}`;
			cy.get(selector.getus).click()
			cy.get(selector.spinner).should('not.exist')
			cy.get(selector.countrydropdown).click()
			cy.get(selector.defaultSelectedCountry).should(($span) => {
				const text = $span.text()
				expect(text).contain(...start.US)
			})
			cy.get('body').type('{esc}')
		},

		currency : function({name}){
			const aliasTitle =`${name}`;
			cy.get(packsselector.price).should(($div) => {
				const text = $div.text().replace(/\d.*/, "").split(".");
				if(name == "US"){
					expect(text[0]).eq("$");
				}
			})
		},

		getca : function(){
			cy.get(selector.getca).click()
			cy.get(selector.spinner).should('not.exist')
			cy.get(selector.countrydropdown).click()
			cy.get(selector.defaultSelectedCountry).should(($span) => {
				const text = $span.text()
				expect(text).contain(...start.CA)
			})
			cy.get('body').type('{esc}')
		},


		languagedropdown : function(){
			cy.get(lang.languagedropdown).click()	
		},

		languagelength : function(){
			cy.get(lang.getlanguages).should('have.length', 2)
		},

		verifylanguage : function(){
			var language = [ "ENGLISH", "ESPAÑOL"]
				cy.get(lang.getlanguages).each(($li, i, $list) => {
				expect($li).to.contain(language[i])
			})
		},

		englishlanguage : function(){
			cy.get(lang.firstlanguage).click()
			cy.get(lang.languagedropdown).should(($div) => {
				const text = $div.text()
				expect(text).contain(...start.Enlgish)
			})
		},

		usspanishlang : function(){
			cy.get(lang.languagedropdown).click()
			cy.get(lang.secondlanguage).click()
			cy.get(lang.languagedropdown).should(($div) => {
				const text = $div.text()
				expect(text).contain(...start.Spanish)
			})
		},

		frenchlang : function(){
			cy.get(lang.languagedropdown).click()
			cy.get(lang.secondlanguage).click()
			cy.get(lang.languagedropdown).should(($div) => {
				const text = $div.text()
				expect(text).contain(...start.French)
			})
		},

		ditrubutortitle : function(){
			cy.get(startp.distributortitle).should(($div) => {
				const title = $div.text()
				expect(title).contain(...start.Distributor)
			})
		},

		pctitle : function(){
			cy.get(startp.pctitle).should(($div) => {
				const title = $div.text()
				expect(title).contain(...start.PC)
			})
		},

		enrollasdistributor : function(){
			cy.get(startp.clickonenroll).click()
		}

	};

	export default market
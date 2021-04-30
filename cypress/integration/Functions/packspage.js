import packsselector from '../Locators/PackspagePOM'
import pack from "../../fixtures/pack.json";

var category=[
	"Accessories", "Anti-Aging", "Bone & Joint Health", 
    "Core Products", "Daily Health", "Digestive Health", 
    "Fitness Products", "Heart Health", "Immune System", 
    "Men's Health", "New Products", "Personal Care", 
    "Transformation Packs", "Weight Management", "Women's Health"
];

var packs = {

	labels : function() {
		cy.wait(20000);
		cy.get(packsselector.EnrollasDistributor).contains(pack.enrollasdistributor);
		cy.get(packsselector.Choosepacktype).contains(pack.choosepacktype);
	},

	selectpack : function() {
		cy.wait(2000)
		cy.get(packsselector.PacksDisplaying).should('be.visible');	
		var randompack = Math.floor(Math.random() * Math.floor(Cypress.$(packsselector.randompackselect).length));
		cy.get(packsselector.randompackselect).eq(randompack).click();
	},

	custompack : function({name}) {
		const aliasTitle =`${name}`;
		cy.wait(5000)
		var count = Cypress.$(packsselector.cart).text();
		if(count == 0) {
			if(name == "US"){
				cy.get(packsselector.customizecurrency).each(($span) => {
					expect(($span.text()).replace(/\d.*/, "")).eq("$");
				})
			}
			var custompack = Math.floor(Math.random() * Math.floor(Cypress.$(packsselector.customizepack).length));
			cy.get(packsselector.customizepack).eq(custompack).click();
		}
	},

	addadditionalpack : function({name}) {
		const aliasTitle =`${name}`;
		if(name == "US"){
			cy.get(packsselector.additionalproductcurrency).each(($span) => {
				expect(($span.text()).replace(/\d.*/, "")).eq("$");
			})
		}
		var randompack = Math.floor(Math.random() * Math.floor(Cypress.$(packsselector.randomadditionalpack).length));
		cy.get(packsselector.randomadditionalpack).eq(randompack).click();

		cy.get(packsselector.addtoinitialorder).click();
		cy.get(packsselector.closepopup).click();
		
	},

	searchproduct : function() {
		cy.get(packsselector.searchproductname).then(($a) =>{
			cy.get(packsselector.searchproduct).type($a.text());
			cy.get("#grid-items").find(packsselector.searchproductdisplay).should('be.visible');
			cy.get(packsselector.searchproduct).clear();	
		})

		cy.get(packsselector.searchproduct).type("test");
		cy.get("#grid-items").find(packsselector.searchproductdisplay).should('not.be.visible');
		cy.get(packsselector.noproductserror).should('be.visible');
		cy.get(packsselector.searchproduct).clear();
	},

	browsebycategory : function() {
		cy.get(packsselector.categoryclick).click();
		cy.get(packsselector.categoryview).find('[role="menuitem"]').each(($li, i, $list) => {
			expect($li).to.contain(category[i]);
		})
	},

	categoryselect : function() {
		var randompack = Math.floor(Math.random() * Math.floor(Cypress.$('ul li').length));
		cy.get('ul li').eq(randompack).click();
		cy.get("#grid-items").find(packsselector.searchproductdisplay).should('be.visible');
	},

	listview : function() {

		cy.get('#List').click();
		cy.get('#listitems').should('be.visible');
		cy.get('#grid-items').should('not.be.visible');
		cy.get('#Grid').click();
	},

	cartcalculation : function({name}) {
		const aliasTitle =`${name}`;
		var cartprice = [];
		var cartpv = [];
		var cart = [];
		

		cy.get(packsselector.price)
			.should(($span) => {
			cart.push(parseFloat($span.text().replace('$', '')));
		})

		cy.get(packsselector.pv)
			.should(($span) => {
			cart.push(parseInt($span.text().split(":")[1].trim()));
		})

		cy.get(packsselector.cartclick).click();
		if(name == "US"){
			cy.get(packsselector.cartprices)
				.each(($div) => {
				expect(($div.text()).replace(/\d.*/, "")).eq("$");
			})
		}
		
		cy.get(packsselector.cartprices)
		.each(($div) => {
			cartprice.push(parseFloat($div.text().trim().replace(/\ .*/,'').replace('$', '')));
		})

		cy.wrap(cartprice).then((num,) => {
			const sum = '$'.concat(cartprice.reduce((a, b) => a + b, 0));
			cy.get(packsselector.subtotal).should(($span) => { 
				expect(sum).to.eq('$'.concat(parseFloat($span.text().replace('$', ''))));
				expect(sum).to.eq('$'.concat(cart[0]));
			})
		})

		cy.get(packsselector.cartpv)
		.each(($div) => {
			cartpv.push(parseInt($div.text().split(":")[1]));
		})

		cy.wrap(cartpv).then((num,) => {
			const sum = cartpv.reduce((a, b) => a + b, 0);
			cy.get(packsselector.totalpv).should(($span) => {
				expect(sum).to.eq((parseInt($span.text())));
				expect(sum).to.eq(cart[1]);
			})
		})

		cy.get(packsselector.cartsummary).click();
		cy.get(packsselector.Packspagecontinue).click();
	}
};

export default packs	
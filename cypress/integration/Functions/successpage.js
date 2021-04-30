import successpage from '../Locators/SuccessPagePOM'

var success = {

	accountcreated : function () {
		
		cy.get(successpage.congratulations).should('be.visible')
		.then(($div) => {
			expect('Congratulations').to.eq($div.text())
		})
		cy.get(successpage.memberid).should('be.visible')
		cy.get(successpage.welcomenote).should('be.visible')
		.then(($div) => {
			expect('Welcome to Unicity! We’re glad you’re here.By becoming a Unicity Member, you will receive wholesale pricing on purchases. Get started by taking advantage of your pricing benefit today.').to.eq($div.text())
		})
		cy.get(successpage.shopnow).should('be.visible')
		.then(($div) => {
			expect('Shop Now').to.eq($div.text())
		})
		cy.get(successpage.logintooffice).should('be.visible')
		.then(($div) => {
			expect('Login to Office? Click Here').to.eq($div.text())
		})	
		cy.get(successpage.signupanotherperson).should('be.visible')
		.then(($div) => {
			expect('Signing up another person?  Click Here').to.eq($div.text())
		})
		cy.get(successpage.facebook).should('be.visible')
		cy.get(successpage.twitter).should('be.visible')
		cy.get(successpage.instagram).should('be.visible')

		cy.get(successpage.signupanother).click()
		.window()
		.its("location.hash")
		.should("eq", "#/start");
		cy.wait(5000)
	},
};

export default success
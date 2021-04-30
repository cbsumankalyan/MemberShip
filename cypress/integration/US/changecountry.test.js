import market from '../Functions/startpage'
import packs from '../Functions/packspage'
import account from '../Functions/accountpage'
import payment from '../Functions/paymentpage'
import summary from '../Functions/summarypage'
import success from '../Functions/successpage'


describe('Change Country', () => {
				
	context('Home Page', () => {

		it('Navigating to Application', () => {
			market.navigate()
		})

		it('HomePage UI Design', () => {
			market.homepageui()
		})

		it('Checking Markets', () => {
			market.countriesdropdown()
		})

		it('Select Market', () => {
			market.randomcountry()
		})

		it('Select language', () => {
			market.selectlanguage()
		})

		it('SignUP', () => {
			market.signup()
		})
	})

	context('Change Country', ()=> {

		it('Changing Country', ()=> {
			account.changecountry()
		})

		it('Select Market', () => {
			market.selectmarket()
		})

		it('Select language', () => {
			market.selectlanguage()
		})

		it('SignUP', () => {
			market.signup()
		})

	})

	context('Account Setup', ()=> {

		it('User Data', ()=> {
			account.accountfields()
		})

		it('User Fields', ()=> {
			account.userfields()
		})

	})

	context('Membership Created', ()=> {

		it('Membership', ()=> {
			success.accountcreated()
		})
	})

	context('Return To HomePage', ()=> {

		it('HomePage', ()=> {
			market.homepageui()
			market.countriesdropdown()
			market.selectmarket()
			market.selectlanguage()
		})
	})
})
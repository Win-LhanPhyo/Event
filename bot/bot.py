from skpy import Skype

slogin = Skype("email", "password")

contact = slogin.contacts["live:.cid.1ed9002627da4bb3"]
contact.chat.sendMsg('Testing')

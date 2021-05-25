import { checkUrl } from './js/urlChecker'
import { retrieveAnalysis } from './js/analysisHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import $ from 'jquery';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import smoothscroll from 'smoothscroll-polyfill';

library.add(faTwitter, faLinkedin, faFacebook)

dom.watch()
smoothscroll.polyfill();

export {
    checkUrl
}
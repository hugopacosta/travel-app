import $ from 'jquery';
import M from 'materialize-css';
import 'jquery-validation';
import { retrieveTravelData } from './js/travelInfoHandler'
import './styles/base.scss'
import './styles/form.scss'
import './styles/header.scss'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
import { faCity } from '@fortawesome/free-solid-svg-icons/faCity'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import 'materialize-css/dist/css/materialize.min.css';
import smoothscroll from 'smoothscroll-polyfill';

library.add(faTwitter, faLinkedin, faFacebook, faCalendarDay, faCity, faPaperPlane, faEllipsisV, faTimes)

dom.watch()
smoothscroll.polyfill();

export {
    retrieveTravelData
}
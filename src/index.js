import './style/index.css';

import Api from './js/api/Api';
import Head from './js/components/Head';
import Enter from './js/components/Enter';
import Reg from './js/components/Reg';
import Validate from './js/components/Validate';
import Popup from './js/components/Popup';



(function() {
  const IP = 'http://localhost:3000/';
  const SERVER = 'https://api.vespucci.tk/'
  const api = new Api(SERVER);
  const head = new Head(document.querySelector('.header'));
  const validate = new Validate();

  api.getMyData(data => {
    if (data.message === 'Congratulate') {
      head.ifLogin(data.data.name)
    } else {
      head.ifUnauthorized();
    }
  })

  new Popup(document.querySelector('.popup-success'));
  new Enter(document.querySelector('.popup-enter'), validate, api, head);
  new Reg(document.querySelector('.popup-reg'), validate, api);



}());
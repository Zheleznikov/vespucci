import './style/index.css';
import Popup from './js/components/Popup';
import Api from './js/api/Api';
import Form from './js/components/Form';

(function() {
  const IP = 'localhost:3000'
  new Popup(document.querySelector('.popup'));
  const api = new Api();
  new Form(document.querySelector('.popup'));


}());
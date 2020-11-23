
import React, {Component} from 'react';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      id: '',
      nameInput: '',
      addressInput: '',
      emailInput:  '',
      phoneNumberInput: '',
      passwordInput: '',
      
      msgAlertNameInput:'',
      msgAlertAddressInput:'',
      msgAlertEmailInput:'',
      msgAlertPhoneNumberInput:'',
      msgAlertPasswordInput:'',
      msgAlertRePasswordInput:'',
      msgAlertName: false,
      msgAlertAddress: false,
      msgAlertEmail: false,
      msgAlertPhoneNumber: false,
      msgAlertPassword: 0,
      msgAlertRePassword: false,
      users : []

    }
  }
 
  checkForm() {
    return ((this.state.msgAlertName) && (this.state.msgAlertAddress) && (this.state.msgAlertEmail) && (this.state.msgAlertPhoneNumber) && (this.state.msgAlertPassword === 1 || this.state.msgAlertPassword === 2) &&  (this.state.msgAlertRePassword))
  }
  //radom id
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + '-' +this.s4();
  }

  
  onChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        id: this.generateID(),
        [name] : value
      });
  }
  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.indexFocus);
    const checkForm = this.checkForm();
    if(checkForm) {
      const users = this.state.users;
      console.log('submit');
      console.log(this.state);
      const user = {
        id : this.state.id,
        name : this.state.nameInput,
        address : this.state.addressInput,
        email : this.state.emailInput,
        phoneNumber : this.state.phoneNumberInput,
        password : this.state.passwordInput
      }
      users.push(user)
      this.setState({
        users: users
      });
      localStorage.setItem('users', JSON.stringify(this.state.users))
      alert('Đăng ký thành công')
    } else {
     
      
      alert('form không hợp lệ, hãy kiểm tra lại')
      
    }
    
  }
  onBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch(name) {
      case 'nameInput': {
        
        if(value.trim() === '') {
          this.setState({
            msgAlertNameInput: 'Hãy nhập tên của bạn',
            msgAlertName: false,
          })
        } 
        if(value.trim().length <= 10 && value.trim().length > 0) {
          this.setState({
            msgAlertNameInput: 'Hãy nhập tên đầy đủ của bạn',
            msgAlertName: false,
          })
        } 
        if(value.trim().length > 10){
          this.setState({
            msgAlertNameInput: 'Tên của bạn rất hay!',
            msgAlertName: true,
          })
        }
        
        break;
      }
      case 'addressInput': {
        
        if(value.trim() === '') {
          this.setState({
            msgAlertAddressInput: 'Hãy nhập địa chỉ của bạn',
            msgAlertAddress: false,
          })
        } else {
          this.setState({
            msgAlertAddressInput: 'Địa chỉ nhập có chuẩn không vậy? -_-',
            msgAlertAddress: true,
          })
        }
        break;
      }
      case 'emailInput': {
        
        const testEmail  = this.validateEmail(value);
        
        if(testEmail) {
          this.setState({
            msgAlertEmailInput: 'Email hợp lệ!',
            msgAlertEmail: true,
          }) 
        } else {
          this.setState({
            msgAlertEmailInput: 'Email không hợp lệ!',
            msgAlertEmail: false,
          })
        }
        if(value.trim() === '') {
          this.setState({
            msgAlertEmailInput: 'Hãy nhập Email của bạn',
            msgAlertEmail: false,
          })
        }
        break;

      }
      case 'phoneNumberInput': {
      
        // sdt phai co 10  so
       
        const testPhoneNumber = this.validatePhoneNumber(value.trim());
       
        if(testPhoneNumber) {
          this.setState({
            msgAlertPhoneNumberInput: 'Số điên thoại hợp lệ!',
            msgAlertPhoneNumber: true,
          }) 
        } else {
          this.setState({
            msgAlertPhoneNumberInput: 'Số điên thoại không hợp lệ!',
            msgAlertPhoneNumber: false,
          }) 
        }
        if(value.trim() === '') {
          this.setState({
            msgAlertPhoneNumberInput: 'Hãy nhập số điện thoại của bạn',
            msgAlertPhoneNumber: false,
          })
        }
        break;

      }
      case 'passwordInput': {
        
        if(value.trim() === '') {
          this.setState({
            msgAlertPasswordInput: 'Hãy nhập mật khẩu!',
            msgAlertPassword: 0,
          })
        }
        if(value.trim().length > 0 && value.trim().length < 8) {
          this.setState({
            msgAlertPasswordInput: 'Mật khẩu phải có ít nhất 8 kí tự!',
            msgAlertPassword: 0,
          })
        }
         if(value.trim().length >= 8 && value.trim().length <= 15) {
          this.setState({
            msgAlertPasswordInput: 'Mật khẩu có độ bảo mật trung bình',
            msgAlertPassword: 1,
          })
        }
        if(value.trim().length > 15 ) {
          this.setState({
            msgAlertPasswordInput: 'Mật khẩu có độ bảo mật cao',
            msgAlertPassword: 2,
          })
        }


        break;

      }
      case 'rePasswordInput': {
      
        if(this.state.msgAlertPassword !== 0) {
          if(value === this.state.passwordInput) {
            this.setState({
              msgAlertRePasswordInput: 'Mật khẩu nhập lại trùng khớp',
              msgAlertRePassword: true,
            })
          } else {
            this.setState({
              msgAlertRePasswordInput: 'Mật khẩu nhập lại không đúng',
              msgAlertRePassword: false,
            })
          }
        }
        break;

      }
      default: {
        console.log('??');
      }
    
    }
    
  }
  onFocus = (e) => {
    //focus hide msg alert
    const name = e.target.name;
    const alertName = 'msgAlert' + name.charAt(0).toUpperCase()  + name.slice(1); // in hoa chu cai dau cua name
    this.setState({
      [alertName]: ''
    })
  }
  validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
  }
  validatePhoneNumber(phoneNumber) {
    const re = /^\d{10}$/;

    return re.test(phoneNumber);
  }



  

  render() {
    return (
      <div className="container">
      <div className="head-form">
        <h1>CuongF</h1>
        <p>Đăng ký để học ReactJS</p>
      </div>
      <form onSubmit = {this.onSubmit}>

        <div className="form-group"> 
          <label htmlFor="nameInput">Tên đầy đủ:</label>
          <input 
            type="text" 
            className="form-control" 
            id="nameInput" name="nameInput" placeholder="Hãy nhập tên" 
            onChange = {this.onChange}
            onBlur = {this.onBlur}
            onFocus = {this.onFocus}
            />
          <small
          className={classNames("form-text", "text-muted", {'msg-alert': !this.state.msgAlertName},{'msg-success': this.state.msgAlertName} )}
          >
            {this.state.msgAlertNameInput}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="addressInput">Địa chỉ:</label>
          <input 
            type="text" 
            className="form-control" 
            id="addressInput" 
            name="addressInput" 
            placeholder="Hãy nhập địa chỉ" 
            onChange = {this.onChange}
            onBlur = {this.onBlur}
            onFocus = {this.onFocus}
          />
          <small 
            className={classNames("form-text", "text-muted", {'msg-alert': !this.state.msgAlertAddress},{'msg-success': this.state.msgAlertAddress} )}
          >
            {this.state.msgAlertAddressInput}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="emailInput">Email:</label>
          <input 
            type="text" 
            className="form-control" 
            id="emailInput" 
            name="emailInput" 
            placeholder="Hãy nhập email" 
            onChange = {this.onChange}
            onBlur = {this.onBlur}
            onFocus = {this.onFocus}
            />
          <small  
            className={classNames("form-text", "text-muted", {'msg-alert': !this.state.msgAlertEmail},{'msg-success': this.state.msgAlertEmail} )}  
          >
            {this.state.msgAlertEmailInput}
            </small>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumberInput">Số điện thoại:</label>
          <input 
            type="tel" 
            className="form-control" id="phoneNumberInput" 
            name="phoneNumberInput" 
            placeholder="Hãy nhập số điện thoại" 
            onChange = {this.onChange}
            onBlur = {this.onBlur}
            onFocus = {this.onFocus}
            />
          <small  
            className={classNames("form-text", "text-muted", {'msg-alert': !this.state.msgAlertPhoneNumber},{'msg-success': this.state.msgAlertPhoneNumber} )}
          >
            {this.state.msgAlertPhoneNumberInput}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="passwordInput">Mật khẩu:</label>
          <input 
            type="password" 
            className="form-control" 
            id="passwordInput" 
            name="passwordInput" 
            placeholder="Hãy nhập mật khẩu" 
            onChange = {this.onChange}
            onBlur = {this.onBlur}
            onFocus = {this.onFocus}
            />
            <small
              className={classNames("form-text","text-muted", {'msg-alert': (this.state.msgAlertPassword === 0)},{'msg-success':(this.state.msgAlertPassword === 2)}, {'msg-warning': (this.state.msgAlertPassword === 1)})}
            >
              {this.state.msgAlertPasswordInput}
            </small>
        </div>

        <div className="form-group">
          <label htmlFor="rePasswordInput">Nhập lại mật khẩu:</label>
          <input 
            type="password" 
            className="form-control" 
            id="rePasswordInput" 
            name="rePasswordInput" 
            placeholder="Hãy nhập lại mật khẩu" 
            onChange = {this.onChange}
            onBlur = {this.onBlur}
            onFocus = {this.onFocus}
            disabled = {(this.state.msgAlertPassword === 0)}
            />
            <small
              className={classNames("form-text", "text-muted", {'msg-alert': !this.state.msgAlertRePassword},{'msg-success': this.state.msgAlertRePassword} )}
            >
              {this.state.msgAlertRePasswordInput}
            </small>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block mt-4"
          onClick = {this.onSubmit}
        >Đăng ký</button>

      </form>
    </div>
    )
  }
}

export default App;

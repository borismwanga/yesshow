import './principale.scss';
import logo from '../assets/logo.png';

export default function Principale() {
  return (
  <div>
    <div className="box">
      <img src={logo} alt="Logo" width="100" height="100"/>
      <h1>YESHOW</h1>
      <div className="input-group">
        <input required type="text" name="text" autoComplete="off" className="input" />
        <label className="user-label">Find restaurant</label>
      </div>
    </div>

    <div className="footer">
    <ul>
      <li><a href="#">About us</a></li>
      <li id="footer-li-center"><a href="#">Work with us</a></li>
      <li><a href="#">Contact us</a></li>
    </ul>
    </div>
</div>
    );
  }

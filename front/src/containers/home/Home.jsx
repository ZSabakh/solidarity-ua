import "./home.css";
import UA from "../../resources/images/Flag_of_Ukraine.svg";
import GE from "../../resources/images/Flag_of_Georgia.svg";
import EN from "../../resources/images/Flag_of_the_United_Kingdom.svg";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div id="app" class="home">
        <div class="lang_container">
          <div>
            <a href="#">
              <img src={UA} /> UA
            </a>
          </div>
          <div>
            <a href="#">
              <img src={GE} /> GE
            </a>
          </div>
          <div>
            <a href="#">
              <img src={EN} /> EN
            </a>
          </div>
        </div>
        <div class="home_greeting">
          <h1>Portal for ukraine 🇺🇦</h1>
          <span>Dummy text at this moment. It will be cool later!</span>
          <div class="home_auth">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
        <div class="partners_list">
          <div>
            <a href="https://tbcpay.ge/" target="_blank">
              <img src="https://wandio.com/media/1210/tbcpay.svg" />
            </a>
          </div>
          <div>
            <a href="https://area.ge/" target="_blank">
              <img src="https://wandio.com/media/1189/area-logo-white.svg" />
            </a>
          </div>
          <div>
            <a href="https://bankofgeorgia.ge/" target="_blank">
              <img src="https://wandio.com/media/1276/saqartvelos-banki.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
